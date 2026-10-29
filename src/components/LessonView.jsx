import { useEffect, useState } from "react";
import { Button, Card, Chip, ProgressBar, TextArea } from "@heroui/react";
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Trophy, Lightbulb } from "lucide-react";
import { useStore } from "../store.jsx";
import { GameHost } from "./Games.jsx";

const STEPS = [
  "Objetivo",
  "Activación",
  "Biblia",
  "Explicación",
  "Juego",
  "Retroalimentación",
  "Reflexión",
  "Evaluación",
];

const PASS_PERCENT = 60;

function BackLink({ go }) {
  return (
    <button
      onClick={() => go("map")}
      className="mb-4 inline-flex items-center gap-2 font-bold text-faith-700 hover:underline"
    >
      <ArrowLeft size={18} /> Volver a mi ruta
    </button>
  );
}

export default function LessonView({ params, go }) {
  const {
    phases,
    profile,
    loadLesson,
    startLesson,
    beginQuiz,
    answerQuestion,
    finishLesson,
    markLessonCompleted,
    savePractice,
  } = useStore();

  const [step, setStep] = useState(0);
  const [gameIdx, setGameIdx] = useState(0);
  const [gameScore, setGameScore] = useState({ correct: 0, total: 0 });
  const [practiceText, setPracticeText] = useState("");
  const [detail, setDetail] = useState(null);
  const [detailError, setDetailError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizError, setQuizError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [finishing, setFinishing] = useState(false);
  const [finished, setFinished] = useState(null);

  const phase = phases.find((item) => item.id === params?.phaseId);
  const mod = phase?.modules.find((item) => item.id === params?.moduleId);
  const summary = mod?.lessons.find((item) => item.id === params?.lessonId) || mod?.lessons[0];
  const summaryId = summary?.id;

  useEffect(() => {
    let active = true;
    setDetail(null);
    setDetailError(null);
    setQuiz(null);
    setQuizError(null);
    setAnswers({});
    setFinished(null);
    setStep(0);
    setGameIdx(0);
    setGameScore({ correct: 0, total: 0 });
    setPracticeText("");

    if (!summaryId) return undefined;

    // Lecciones creadas localmente en el panel de administración: no existen
    // en MySQL, así que no se piden a la API.
    if (!/^\d+$/.test(summaryId)) {
      setDetail(summary);
      setQuiz({ attempt: null, questions: [] });
      return undefined;
    }

    loadLesson(summaryId)
      .then((loaded) => {
        if (!active) return;
        setDetail(loaded);
        startLesson(summaryId).catch(() => null);
        if (loaded.questionCount === 0) {
          setQuiz({ attempt: null, questions: [] });
          return;
        }
        beginQuiz(summaryId)
          .then((started) => {
            if (active) setQuiz(started);
          })
          .catch((error) => {
            if (active) setQuizError(error.message);
          });
      })
      .catch((error) => {
        if (active) setDetailError(error.message);
      });

    return () => {
      active = false;
    };
  }, [summaryId, loadLesson, startLesson, beginQuiz]);

  if (!summary) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-10">
        <BackLink go={go} />
        <Card className="p-8 text-center text-lg font-bold text-slate-700">Lección no encontrada.</Card>
      </div>
    );
  }

  if (detailError) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-10">
        <BackLink go={go} />
        <Card className="gap-3 border-2 border-red-200 p-8 text-center">
          <h1 className="text-xl font-black text-faith-900">No pudimos cargar la lección</h1>
          <p className="text-slate-600">{detailError}</p>
        </Card>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-10">
        <BackLink go={go} />
        <Card className="p-8 text-center text-lg font-bold text-slate-700">Cargando lección...</Card>
      </div>
    );
  }

  const lesson = detail;
  const age = profile.ageGroup || "adults";
  const games = lesson.activities || [];
  const gamesDone = gameIdx >= games.length;
  const questions = quiz?.questions || [];
  const evalTotal = questions.length;
  const answeredCount = Object.values(answers).filter((answer) => answer && !answer.pending).length;
  const evalCorrect = Object.values(answers).filter((answer) => answer?.isCorrect).length;
  const evalDone = evalTotal === 0 ? true : answeredCount === evalTotal;

  const chooseAnswer = async (index, question, option) => {
    if (answers[index] || !quiz?.attempt?.id) return;
    setAnswers((previous) => ({ ...previous, [index]: { optionId: option.id, pending: true } }));
    try {
      const result = await answerQuestion(quiz.attempt.id, question.id, option.id);
      setAnswers((previous) => ({
        ...previous,
        [index]: { optionId: option.id, isCorrect: result.isCorrect },
      }));
    } catch (error) {
      setAnswers((previous) => ({
        ...previous,
        [index]: { optionId: option.id, error: error.message },
      }));
    }
  };

  const finish = async () => {
    if (!/^\d+$/.test(lesson.id)) {
      setFinished({ percent: 0, completed: true, correct: 0, total: 0, achievements: [] });
      return;
    }
    setFinishing(true);
    setQuizError(null);
    try {
      const result =
        evalTotal === 0
          ? await markLessonCompleted(lesson.id)
          : await finishLesson(lesson.id, quiz.attempt.id);
      if (practiceText.trim()) savePractice(lesson.id, practiceText.trim());
      setFinished({
        percent: Math.round(result.scorePercent ?? 0),
        completed: result.completed !== false,
        correct: result.correctAnswers ?? evalCorrect,
        total: result.totalQuestions ?? evalTotal,
        achievements: result.achievementsGranted ?? [],
      });
    } catch (error) {
      setQuizError(error.message);
    } finally {
      setFinishing(false);
    }
  };

  const restart = async () => {
    setStep(0);
    setGameIdx(0);
    setGameScore({ correct: 0, total: 0 });
    setAnswers({});
    setFinished(null);
    setPracticeText("");
    setQuiz(null);
    setQuizError(null);
    if (!/^\d+$/.test(lesson.id) || lesson.questionCount === 0) {
      setQuiz({ attempt: null, questions: [] });
      return;
    }
    try {
      const started = await beginQuiz(lesson.id);
      setQuiz(started);
    } catch (error) {
      setQuizError(error.message);
    }
  };

  const totalSteps = STEPS.length;
  const progressPercent = finished ? 100 : Math.round((step / (totalSteps - 1)) * 100);

  if (finished) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-8">
        <Card className="gap-4 border-2 border-gold-300 bg-gradient-to-br from-white via-gold-100 to-faith-50 p-8 text-center">
          <Trophy className="mx-auto text-gold-500" size={48} />
          <h1 className="text-3xl font-black text-faith-900">
            {finished.completed ? "¡Lección completada!" : "Esta vez no alcanzó"}
          </h1>
          <p className="text-xl text-slate-700">{lesson.title}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Chip color="success" variant="soft" size="lg">
              Evaluación: {finished.percent}%
            </Chip>
            <Chip color="primary" variant="soft" size="lg">
              Actividades: {gameScore.correct}/{gameScore.total}
            </Chip>
            {finished.achievements.length > 0 && (
              <Chip color="warning" variant="soft" size="lg">
                {finished.achievements.length} logro(s) nuevo(s)
              </Chip>
            )}
          </div>
          <p className="text-slate-600">
            {!finished.completed
              ? `Necesitas al menos ${PASS_PERCENT}% en la evaluación para completar la lección. Repasa la explicación y el pasaje, y vuelve a intentarlo.`
              : finished.percent >= 80
                ? "Excelente comprensión. Puedes continuar con la siguiente lección."
                : "Lección completada. Te sugerimos repasar la explicación y el pasaje antes de avanzar."}
          </p>
          {finished.achievements.length > 0 && (
            <p className="font-bold text-gold-700">
              Logros: {finished.achievements.join(", ")}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="primary" onClick={() => go("map")}>
              Volver a mi ruta
            </Button>
            <Button size="lg" variant="outline" onClick={restart}>
              <RotateCcw size={18} /> Repetir lección
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <BackLink go={go} />

      <Card className="gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Chip color="primary" variant="soft">
            {lesson.phaseName || phase?.name}
          </Chip>
          <Chip variant="soft">{lesson.moduleTitle || mod?.title}</Chip>
        </div>
        <h1 className="text-3xl font-black text-faith-900">{lesson.title}</h1>

        <div className="flex items-center gap-3">
          <ProgressBar value={progressPercent} aria-label="Avance de la lección" className="flex-1">
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
          <span className="text-sm font-extrabold text-faith-700">
            Paso {step + 1} de {totalSteps}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STEPS.map((label, index) => (
            <span
              key={label}
              className={`step-dot rounded-full px-2.5 py-1 text-xs font-bold ${
                index === step
                  ? "bg-faith-600 text-white"
                  : index < step
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </Card>

      <div className="mt-5">
        {step === 0 && (
          <Card className="gap-3 p-6">
            <h2 className="flex items-center gap-2 text-xl font-black text-faith-900">
              <Lightbulb size={22} /> Objetivo de la lección
            </h2>
            <p className="text-xl text-slate-700">{lesson.objective}</p>
            <p className="text-slate-500">
              Al terminar, podrás explicar esta idea con tus palabras y aplicarla a tu vida.
            </p>
          </Card>
        )}

        {step === 1 && (
          <Card className="gap-3 p-6">
            <h2 className="text-xl font-black text-faith-900">Para empezar a pensar</h2>
            <p className="text-xl leading-relaxed text-slate-700">
              {lesson.activation?.[age] || lesson.activation?.adults}
            </p>
          </Card>
        )}

        {step === 2 && (
          <Card className="gap-3 border-2 border-gold-300 bg-gradient-to-br from-white to-gold-100 p-6">
            <h2 className="flex items-center gap-2 text-xl font-black text-faith-900">
              <BookOpen size={22} /> Pasaje bíblico
            </h2>
            <p className="text-2xl font-bold italic leading-snug text-faith-900">{lesson.passage?.text}</p>
            <p className="text-lg font-extrabold text-gold-700">— {lesson.passage?.ref}</p>
            <p className="text-sm text-slate-500">Léelo en tu Biblia también. Observa sus ideas principales.</p>
          </Card>
        )}

        {step === 3 && (
          <Card className="gap-3 p-6">
            <h2 className="text-xl font-black text-faith-900">La idea central</h2>
            <p className="text-xl leading-relaxed text-slate-700">
              {lesson.explanation?.[age] || lesson.explanation?.adults}
            </p>
          </Card>
        )}

        {step === 4 && !gamesDone && (
          <div>
            <p className="mb-3 text-sm font-bold text-slate-500">
              Actividad {gameIdx + 1} de {games.length}: practica lo aprendido. No pasa nada si te equivocas.
            </p>
            <GameHost
              activity={games[gameIdx]}
              onComplete={(correct, total) => {
                setGameScore((score) => ({ correct: score.correct + correct, total: score.total + total }));
                setGameIdx((index) => index + 1);
              }}
            />
          </div>
        )}

        {step === 4 && gamesDone && (
          <Card className="gap-3 p-6">
            <h2 className="flex items-center gap-2 text-xl font-black text-faith-900">
              <CheckCircle2 size={22} className="text-emerald-600" /> Actividades completadas
            </h2>
            <p className="text-lg text-slate-700">
              Sumaste {gameScore.correct} respuestas correctas de {gameScore.total}. ¿Listo para la reflexión?
            </p>
          </Card>
        )}

        {step === 5 && (
          <Card className="gap-3 p-6">
            <h2 className="text-xl font-black text-faith-900">¿Qué aprendimos?</h2>
            <p className="text-lg text-slate-700">
              Las actividades no son para ganar premios, sino para entender mejor. Si algo te confundió, revisa el
              pasaje <strong>{lesson.passage?.ref}</strong> y pide ayuda a tu instructor: eso también es aprender.
            </p>
            <ul className="grid gap-2 text-slate-700">
              {games.map((activity, index) => (
                <li key={index} className="rounded-xl bg-faith-50 px-4 py-3">
                  <strong>{activity.title}:</strong> practicaste «{activity.prompt}»
                </li>
              ))}
            </ul>
          </Card>
        )}

        {step === 6 && (
          <Card className="gap-3 p-6">
            <h2 className="text-xl font-black text-faith-900">Reflexiona</h2>
            <p className="text-xl leading-relaxed text-slate-700">
              {lesson.reflection?.[age] || lesson.reflection?.adults}
            </p>
            <p className="text-slate-500">No hay respuestas equivocadas aquí: es tiempo de pensar y conversar.</p>
            {lesson.isPractice && (
              <div className="mt-2">
                <p className="mb-2 font-bold text-faith-900">{lesson.practice?.title}</p>
                <p className="mb-2 text-slate-600">{lesson.practice?.instructions}</p>
                <TextArea
                  value={practiceText}
                  onChange={(event) => setPracticeText(event.target.value)}
                  placeholder="Escribe aquí tu práctica para presentarla a tu instructor..."
                  rows={5}
                  fullWidth
                />
              </div>
            )}
          </Card>
        )}

        {step === 7 && (
          <Card className="gap-4 p-6">
            <h2 className="text-xl font-black text-faith-900">Evaluación final</h2>
            <p className="text-slate-600">
              Responde con calma. Tu evaluación se corrige en el servidor y al terminar verás tu resultado.
            </p>

            {quizError && (
              <p className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-800">
                {quizError}
              </p>
            )}

            {!quiz && !quizError && (
              <p className="rounded-xl bg-slate-50 px-4 py-3 font-bold text-slate-600">
                Preparando la evaluación...
              </p>
            )}

            {quiz && evalTotal === 0 && (
              <p className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700">
                Esta lección no tiene preguntas. Puedes marcarla como completada al terminar.
              </p>
            )}

            {questions.map((question, index) => {
              const answer = answers[index];
              const answered = Boolean(answer && !answer.pending);
              const chosen = answer?.optionId;
              return (
                <div key={question.id} className="rounded-2xl border-2 border-slate-200 p-4">
                  <p className="text-lg font-bold text-slate-800">
                    {index + 1}. {question.questionText}
                  </p>
                  <div className="mt-3 grid gap-2">
                    {question.options.map((option) => {
                      const isChosen = chosen === option.id;
                      const state = !answered
                        ? "idle"
                        : isChosen
                          ? answer.isCorrect
                            ? "right"
                            : "wrong"
                          : "other";
                      return (
                        <button
                          key={option.id}
                          disabled={answered || answer?.pending}
                          onClick={() => chooseAnswer(index, question, option)}
                          className={`game-option rounded-2xl border-2 px-4 py-3 text-left text-lg font-semibold ${
                            state === "right"
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                              : state === "wrong"
                                ? "border-red-400 bg-red-50 text-red-900"
                                : state === "other"
                                  ? "border-slate-200 bg-slate-50 text-slate-500"
                                  : "border-slate-200 bg-white hover:border-faith-500 hover:bg-faith-50"
                          }`}
                        >
                          {option.optionText}
                        </button>
                      );
                    })}
                  </div>
                  {answer?.pending && (
                    <p className="mt-3 text-sm font-bold text-slate-500">Enviando respuesta...</p>
                  )}
                  {answered && (
                    <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-slate-700">
                      <strong>{answer.isCorrect ? "¡Correcto!" : "Casi. Vamos a revisar:"}</strong>{" "}
                      {question.explanation}
                    </p>
                  )}
                  {answer?.error && (
                    <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-800">
                      {answer.error}
                    </p>
                  )}
                </div>
              );
            })}
          </Card>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button size="lg" variant="ghost" isDisabled={step === 0} onClick={() => setStep((value) => value - 1)}>
          <ArrowLeft size={18} /> Atrás
        </Button>

        {step < totalSteps - 1 ? (
          <Button
            size="lg"
            variant="primary"
            isDisabled={step === 4 && !gamesDone}
            onClick={() => setStep((value) => value + 1)}
          >
            Siguiente <ArrowRight size={18} />
          </Button>
        ) : (
          <Button
            size="lg"
            variant="primary"
            isDisabled={!evalDone || finishing || Boolean(quizError) || (evalTotal > 0 && !quiz)}
            onClick={finish}
          >
            {finishing ? "Guardando..." : "Terminar lección"} <CheckCircle2 size={18} />
          </Button>
        )}
      </div>

      {step === 7 && !evalDone && (
        <p className="mt-2 text-right text-sm font-bold text-slate-500">
          Responde todas las preguntas para poder terminar.
        </p>
      )}
    </div>
  );
}
