const TOKEN_KEY = "ruta-de-fe-token";
const BASE_URL = (import.meta.env.VITE_API_URL || "/api/v1").replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Almacenamiento no disponible: la sesión queda solo en memoria.
  }
}

function errorMessage(body, status) {
  const message = body?.message;
  if (Array.isArray(message)) return message.join(" ");
  if (typeof message === "string" && message.trim()) return message;
  if (status === 401) return "Tu sesión expiró. Inicia sesión de nuevo.";
  return `La API respondió con el código ${status}.`;
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      "No se pudo conectar con la API. Verifica que el backend esté en ejecución.",
      0,
      null,
    );
  }

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }

  if (!response.ok) {
    throw new ApiError(errorMessage(data, response.status), response.status, data);
  }
  return data;
}

export const api = {
  auth: {
    register: (payload) => request("/auth/register", { method: "POST", body: payload, auth: false }),
    login: (payload) => request("/auth/login", { method: "POST", body: payload, auth: false }),
    me: () => request("/auth/me"),
  },
  content: {
    phases: () => request("/content/phases"),
    lesson: (lessonId) => request(`/content/lessons/${encodeURIComponent(lessonId)}`),
  },
  progress: {
    start: (lessonId) =>
      request(`/progress/lessons/${encodeURIComponent(lessonId)}/start`, { method: "POST" }),
    save: (lessonId, progressPercent, markCompleted = false) =>
      request(`/progress/lessons/${encodeURIComponent(lessonId)}/progress`, {
        method: "POST",
        body: { progressPercent, markCompleted },
      }),
    lesson: (lessonId) =>
      request(`/progress/lessons/${encodeURIComponent(lessonId)}`),
    course: (courseId) =>
      request(`/progress/courses/${encodeURIComponent(courseId)}`),
    all: () => request("/progress/lessons"),
    summary: () => request("/progress/summary"),
  },
  quiz: {
    start: (lessonId) =>
      request(`/quiz/attempts/lessons/${encodeURIComponent(lessonId)}`, { method: "POST" }),
    questions: (attemptId) =>
      request(`/quiz/attempts/${encodeURIComponent(attemptId)}/questions`),
    answer: (attemptId, questionId, answerOptionId) =>
      request(`/quiz/attempts/${encodeURIComponent(attemptId)}/answers`, {
        method: "POST",
        body: { questionId, answerOptionId },
      }),
    finish: (attemptId) =>
      request(`/quiz/attempts/${encodeURIComponent(attemptId)}/finish`, { method: "POST" }),
    attempts: () => request("/quiz/attempts"),
  },
  achievements: {
    catalog: () => request("/achievements"),
    mine: () => request("/achievements/mine"),
  },
};
