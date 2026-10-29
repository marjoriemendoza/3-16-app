import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AGE_GROUPS } from "./data/phases.js";
import { api, getToken, setToken } from "./lib/api.js";

const KEY = "ruta-de-fe-v1";

const defaultLocal = {
  profile: { name: "", ageGroup: "adults" },
  settings: { fontScale: 1, dark: false, highContrast: false },
  activity: { streak: 0, lastActive: null },
  content: { status: {}, customLessons: [], history: [] },
  instructorLog: [],
};

const BADGE_ICONS = {
  "first-step": "footprints",
  "quiz-100": "star",
};

function loadLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultLocal;
    const parsed = JSON.parse(raw);
    return {
      ...defaultLocal,
      ...parsed,
      profile: { ...defaultLocal.profile, ...(parsed.profile || {}) },
      settings: { ...defaultLocal.settings, ...(parsed.settings || {}) },
      activity: {
        ...defaultLocal.activity,
        ...(parsed.activity || {}),
        streak: parsed.activity?.streak ?? parsed.progress?.streak ?? 0,
        lastActive: parsed.activity?.lastActive ?? parsed.progress?.lastActive ?? null,
      },
      content: { ...defaultLocal.content, ...(parsed.content || {}) },
    };
  } catch {
    return defaultLocal;
  }
}

const StoreContext = createContext(null);

export function allLessons(phases) {
  return phases.flatMap((phase) =>
    phase.modules.flatMap((mod) =>
      mod.lessons.map((lesson) => ({ ...lesson, phaseId: phase.id, moduleId: mod.id }))
    )
  );
}

/** Convierte la respuesta de la API en el modelo que usan las vistas. */
function flattenPhases(rows) {
  return rows.map((phase) => ({
    ...phase,
    slogan: phase.slogan ?? "",
    tagline: phase.tagline ?? "",
    audience: phase.audience ?? "",
    result: phase.result ?? "",
    modules: phase.courses.flatMap((course) =>
      course.modules.map((mod) => ({ ...mod, courseId: course.id }))
    ),
  }));
}

function buildLearning(progressRows, attempts, achievements) {
  const lessons = {};
  for (const row of progressRows ?? []) {
    lessons[row.lessonId] = {
      done: row.status === "COMPLETED",
      percent: Number(row.progressPercent) || 0,
      score: 0,
      attempts: 0,
    };
  }
  for (const attempt of attempts ?? []) {
    if (!attempt.completedAt) continue;
    const total = Number(attempt.totalPoints) || 0;
    const percent = total > 0 ? Math.round((Number(attempt.score) / total) * 100) : 0;
    const rec = lessons[attempt.lessonId] || { done: false, percent: 0, score: 0, attempts: 0 };
    lessons[attempt.lessonId] = {
      ...rec,
      score: Math.max(rec.score, percent),
      attempts: rec.attempts + 1,
    };
  }
  const points = (achievements ?? []).reduce((sum, row) => sum + (Number(row.points) || 0), 0);
  return { lessons, points };
}

function touchStreak(activity) {
  const today = new Date().toISOString().slice(0, 10);
  if (activity.lastActive === today) return activity;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streak = activity.lastActive === yesterday ? activity.streak + 1 : 1;
  return { ...activity, streak, lastActive: today };
}

export function StoreProvider({ children }) {
  const [local, setLocal] = useState(loadLocal);
  const [session, setSession] = useState({
    status: getToken() ? "loading" : "anonymous",
    user: null,
    error: null,
    busy: false,
  });
  const [phaseRows, setPhaseRows] = useState([]);
  const [learning, setLearning] = useState({ lessons: {}, points: 0 });
  const [achievements, setAchievements] = useState({ mine: [], catalog: [] });
  const [contentStatus, setContentStatus] = useState({ loading: false, error: null, ready: false });
  const epochRef = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(local));
    } catch {
      // Sin almacenamiento disponible: la preferencia dura solo la sesión.
    }
    document.documentElement.style.setProperty("--font-scale", local.settings.fontScale);
    document.documentElement.setAttribute("data-theme", local.settings.dark ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-contrast",
      local.settings.highContrast ? "high" : "normal"
    );
  }, [local]);

  useEffect(() => {
    let active = true;
    if (!getToken()) {
      setSession({ status: "anonymous", user: null, error: null, busy: false });
      return undefined;
    }
    api.auth
      .me()
      .then((user) => {
        if (active) setSession({ status: "authenticated", user, error: null, busy: false });
      })
      .catch(() => {
        setToken(null);
        if (active) setSession({ status: "anonymous", user: null, error: null, busy: false });
      });
    return () => {
      active = false;
    };
  }, []);

  const loadAll = useCallback(async () => {
    const epoch = epochRef.current;
    const [phaseResponse, progressRows, attempts, catalog, mine] = await Promise.all([
      api.content.phases(),
      api.progress.all(),
      api.quiz.attempts(),
      api.achievements.catalog(),
      api.achievements.mine(),
    ]);
    if (epoch !== epochRef.current) return;
    setPhaseRows(phaseResponse);
    setLearning(buildLearning(progressRows, attempts, mine));
    setAchievements({ mine, catalog });
  }, []);

  const refreshLearning = useCallback(async () => {
    const epoch = epochRef.current;
    const [progressRows, attempts, mine] = await Promise.all([
      api.progress.all(),
      api.quiz.attempts(),
      api.achievements.mine(),
    ]);
    if (epoch !== epochRef.current) return;
    setLearning(buildLearning(progressRows, attempts, mine));
    setAchievements((previous) => ({ ...previous, mine }));
  }, []);

  useEffect(() => {
    if (session.status !== "authenticated") {
      setPhaseRows([]);
      setLearning({ lessons: {}, points: 0 });
      setAchievements({ mine: [], catalog: [] });
      setContentStatus({ loading: false, error: null, ready: false });
      return undefined;
    }
    let active = true;
    setContentStatus({ loading: true, error: null, ready: false });
    loadAll()
      .then(() => {
        if (active) setContentStatus({ loading: false, error: null, ready: true });
      })
      .catch((error) => {
        if (active) setContentStatus({ loading: false, error: error.message, ready: false });
      });
    return () => {
      active = false;
    };
  }, [session.status, session.user?.id, loadAll]);

  const reloadContent = useCallback(async () => {
    setContentStatus({ loading: true, error: null, ready: false });
    try {
      await loadAll();
      setContentStatus({ loading: false, error: null, ready: true });
    } catch (error) {
      setContentStatus({ loading: false, error: error.message, ready: false });
    }
  }, [loadAll]);

  const login = useCallback(async (phone, password) => {
    setSession((current) => ({ ...current, busy: true, error: null }));
    try {
      epochRef.current += 1;
      const { accessToken } = await api.auth.login({ phone, password });
      setToken(accessToken);
      const user = await api.auth.me();
      setSession({ status: "authenticated", user, error: null, busy: false });
      return true;
    } catch (error) {
      setToken(null);
      setSession({ status: "anonymous", user: null, error: error.message, busy: false });
      return false;
    }
  }, []);

  const register = useCallback(async (phone, password) => {
    setSession((current) => ({ ...current, busy: true, error: null }));
    try {
      await api.auth.register({ phone, password });
      epochRef.current += 1;
      const { accessToken } = await api.auth.login({ phone, password });
      setToken(accessToken);
      const user = await api.auth.me();
      setSession({ status: "authenticated", user, error: null, busy: false });
      return true;
    } catch (error) {
      setToken(null);
      setSession({ status: "anonymous", user: null, error: error.message, busy: false });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    epochRef.current += 1;
    setToken(null);
    // El nombre visible es local: no debe quedar para la siguiente cuenta
    // que use este dispositivo. Las preferencias de accesibilidad se conservan.
    setLocal((previous) => ({ ...previous, profile: { ...previous.profile, name: "" } }));
    setSession({ status: "anonymous", user: null, error: null, busy: false });
  }, []);

  const clearSessionError = useCallback(() => {
    setSession((current) => ({ ...current, error: null }));
  }, []);

  const loadLesson = useCallback(async (lessonId) => api.content.lesson(lessonId), []);

  const startLesson = useCallback((lessonId) => api.progress.start(lessonId), []);

  const beginQuiz = useCallback((lessonId) => api.quiz.start(lessonId), []);

  const answerQuestion = useCallback(
    (attemptId, questionId, answerOptionId) => api.quiz.answer(attemptId, questionId, answerOptionId),
    []
  );

  const finishLesson = useCallback(
    async (lessonId, attemptId) => {
      const summary = await api.quiz.finish(attemptId);
      const row = await api.progress.lesson(lessonId).catch(() => null);
      const completed = row?.status === "COMPLETED";
      if (completed) {
        setLocal((previous) => ({ ...previous, activity: touchStreak(previous.activity) }));
      }
      await refreshLearning().catch(() => null);
      return { ...summary, completed };
    },
    [refreshLearning]
  );

  const markLessonCompleted = useCallback(
    async (lessonId) => {
      await api.progress.save(lessonId, 100, true);
      setLocal((previous) => ({ ...previous, activity: touchStreak(previous.activity) }));
      await refreshLearning().catch(() => null);
      return { scorePercent: 0, completed: true, achievementsGranted: [] };
    },
    [refreshLearning]
  );

  const setProfile = (profile) =>
    setLocal((previous) => ({ ...previous, profile: { ...previous.profile, ...profile } }));

  const setSettings = (settings) =>
    setLocal((previous) => ({ ...previous, settings: { ...previous.settings, ...settings } }));

  const savePractice = (lessonId, text) =>
    setLocal((previous) => ({
      ...previous,
      instructorLog: [
        ...previous.instructorLog,
        { lessonId, text, date: new Date().toISOString() },
      ],
    }));

  const setLessonStatus = (lessonId, status) =>
    setLocal((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        status: { ...previous.content.status, [lessonId]: status },
        history: [
          { lessonId, status, date: new Date().toISOString() },
          ...previous.content.history,
        ].slice(0, 50),
      },
    }));

  const addCustomLesson = (moduleId, lesson) =>
    setLocal((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        customLessons: [
          ...previous.content.customLessons,
          { id: `c-${Date.now()}`, moduleId, status: "borrador", lesson },
        ],
      },
    }));

  const updateCustomLesson = (id, patch) =>
    setLocal((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        customLessons: previous.content.customLessons.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));

  const deleteCustomLesson = (id) =>
    setLocal((previous) => ({
      ...previous,
      content: {
        ...previous.content,
        customLessons: previous.content.customLessons.filter((item) => item.id !== id),
      },
    }));

  const resetLocal = () => setLocal(defaultLocal);

  const phases = useMemo(() => {
    const customByModule = {};
    local.content.customLessons.forEach((custom) => {
      if (custom.status === "publicado") {
        customByModule[custom.moduleId] = [...(customByModule[custom.moduleId] || []), custom.lesson];
      }
    });
    return flattenPhases(phaseRows).map((phase) => ({
      ...phase,
      modules: phase.modules.map((mod) => ({
        ...mod,
        lessons: [...mod.lessons, ...(customByModule[mod.id] || [])],
      })),
    }));
  }, [phaseRows, local.content.customLessons]);

  const progress = useMemo(
    () => ({
      points: learning.points,
      streak: local.activity.streak,
      lastActive: local.activity.lastActive,
      lessons: learning.lessons,
    }),
    [learning, local.activity]
  );

  const badges = useMemo(
    () => achievements.mine.map((achievement) => achievement.code).filter(Boolean),
    [achievements.mine]
  );

  const badgesCatalog = useMemo(
    () =>
      achievements.catalog.map((achievement) => ({
        id: achievement.code,
        name: achievement.name,
        desc: achievement.description ?? "",
        icon: BADGE_ICONS[achievement.code] ?? "award",
        points: achievement.points,
      })),
    [achievements.catalog]
  );

  const value = {
    // Sesión
    session,
    login,
    register,
    logout,
    clearSessionError,
    // Contenido desde MySQL
    phases,
    contentStatus,
    reloadContent,
    loadLesson,
    // Progreso y gamificación desde MySQL
    progress,
    badges,
    badgesCatalog,
    startLesson,
    beginQuiz,
    answerQuestion,
    finishLesson,
    markLessonCompleted,
    // Preferencias locales
    profile: local.profile,
    settings: local.settings,
    content: local.content,
    instructorLog: local.instructorLog,
    ageGroups: AGE_GROUPS,
    setProfile,
    setSettings,
    savePractice,
    setLessonStatus,
    addCustomLesson,
    updateCustomLesson,
    deleteCustomLesson,
    resetLocal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore fuera de StoreProvider");
  return ctx;
}

export function moduleProgress(progress, mod) {
  const done = mod.lessons.filter((lesson) => progress.lessons[lesson.id]?.done).length;
  return {
    done,
    total: mod.lessons.length,
    percent: mod.lessons.length ? Math.round((done / mod.lessons.length) * 100) : 0,
  };
}

export function phaseProgress(progress, phase) {
  let done = 0;
  let total = 0;
  phase.modules.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      total += 1;
      if (progress.lessons[lesson.id]?.done) done += 1;
    });
  });
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}
