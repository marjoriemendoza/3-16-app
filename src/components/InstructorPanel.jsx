import { useState } from "react";
import { Button, Card, Chip, ProgressBar } from "@heroui/react";
import { Users, BookOpen, MessageCircle, ShieldAlert, CheckCircle2, ClipboardList } from "lucide-react";
import { useStore, phaseProgress, moduleProgress } from "../store.jsx";
import { INSTRUCTOR_GUIDE } from "../data/phases.js";
import { Icon } from "./Icon.jsx";

const DEMO_STUDENTS = [
  { name: "María G.", age: "Niña (8)", phase: "f1", done: 3, total: 12, weak: "El pecado (módulo 3)" },
  { name: "Carlos R.", age: "Adulto (34)", phase: "f1", done: 8, total: 12, weak: "Gracia y fe (módulo 5)" },
  { name: "Sofía M.", age: "Adolescente (15)", phase: "f2", done: 2, total: 7, weak: "Trinidad (módulo 7)" },
  { name: "Don Eduardo", age: "Anciano (72)", phase: "f1", done: 11, total: 12, weak: "Sin dificultades recientes" },
];

export default function InstructorPanel() {
  const { phases, progress, profile, instructorLog } = useStore();
  const [tab, setTab] = useState("alumnos");

  const f1 = phases.find((p) => p.code === "f1");
  const myPhase = f1 ? phaseProgress(progress, f1) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      <h1 className="text-3xl font-black text-faith-900">Panel de instructores</h1>
      <p className="mt-1 text-lg text-slate-600">
        Acompaña a otros en la Fase 1: guías de lección, avance de alumnos y registro mínimo de acompañamiento.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {[
          { id: "alumnos", label: "Mis alumnos" },
          { id: "guias", label: "Guías de lección" },
          { id: "registro", label: "Registro de acompañamiento" },
          { id: "limites", label: "Límites y derivación" },
        ].map((t) => (
          <Button key={t.id} variant={tab === t.id ? "primary" : "outline"} onClick={() => setTab(t.id)}>
            {t.label}
          </Button>
        ))}
      </div>

      {tab === "alumnos" && (
        <div className="mt-6 grid gap-4">
          <Card className="gap-3 border-2 border-faith-100 p-5">
            <h2 className="flex items-center gap-2 text-xl font-black text-faith-900">
              <Users size={22} /> Tu progreso personal {profile.name && `· ${profile.name}`}
            </h2>
            {myPhase && (
              <>
                <ProgressBar value={myPhase.percent} aria-label="Tu avance en Fase 1">
                  <ProgressBar.Track>
                    <ProgressBar.Fill />
                  </ProgressBar.Track>
                </ProgressBar>
                <p className="text-slate-600">
                  Fase 1: {myPhase.done} de {myPhase.total} lecciones. Conocer bien el material que enseñarás es el
                  primer paso.
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {f1.modules.map((m) => {
                    const mp = moduleProgress(progress, m);
                    return (
                      <div key={m.id} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                        <Icon name={m.icon} size={18} />
                        <span className="flex-1 font-bold text-slate-700">{m.title}</span>
                        <span className="text-sm font-extrabold text-faith-700">
                          {mp.done}/{mp.total}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Card>

          <h2 className="mt-4 text-2xl font-black text-faith-900">Alumnos asignados (demostración)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {DEMO_STUDENTS.map((s) => {
              const pct = Math.round((s.done / s.total) * 100);
              return (
                <Card key={s.name} className="gap-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-lg font-black text-faith-900">{s.name}</p>
                      <p className="text-sm text-slate-500">{s.age}</p>
                    </div>
                    <Chip color={pct >= 70 ? "success" : pct >= 35 ? "warning" : "danger"} variant="soft">
                      {pct}%
                    </Chip>
                  </div>
                  <ProgressBar value={pct} aria-label={`Avance de ${s.name}`}>
                    <ProgressBar.Track>
                      <ProgressBar.Fill />
                    </ProgressBar.Track>
                  </ProgressBar>
                  <p className="text-slate-600">
                    <strong>Tema por reforzar:</strong> {s.weak}
                  </p>
                  <Button variant="secondary" size="sm">
                    <MessageCircle size={16} /> Solicitar conversación con un responsable
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tab === "guias" && (
        <div className="mt-6 grid gap-4">
          <Card className="gap-3 border-2 border-gold-300 bg-gradient-to-br from-white to-gold-100 p-5">
            <h2 className="flex items-center gap-2 text-xl font-black text-faith-900">
              <BookOpen size={22} /> Guía para facilitar una lección
            </h2>
            <p className="text-slate-600">
              Aplica la estructura de 8 pasos: objetivo → activación → Biblia → explicación → juego →
              retroalimentación → reflexión → evaluación.
            </p>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Antes de la clase", items: INSTRUCTOR_GUIDE.before },
              { title: "Durante la clase", items: INSTRUCTOR_GUIDE.during },
              { title: "Después de la clase", items: INSTRUCTOR_GUIDE.after },
            ].map((g) => (
              <Card key={g.title} className="gap-3 p-5">
                <h3 className="text-lg font-black text-faith-900">{g.title}</h3>
                <ul className="grid gap-2">
                  {g.items.map((it, i) => (
                    <li key={i} className="flex gap-2 text-slate-700">
                      <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-600" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <Card className="gap-3 p-5">
            <h3 className="flex items-center gap-2 text-lg font-black text-faith-900">
              <ClipboardList size={20} /> Actividades sugeridas para sesión presencial
            </h3>
            <ul className="grid gap-2 text-slate-700">
              <li>• Dramatizar el relato de activación con los niños.</li>
              <li>• Leer el pasaje en voz alta alternando versículos entre participantes.</li>
              <li>• Usar el juego de la lección en equipos cooperativos, sin castigos por fallar.</li>
              <li>• Terminar con la pregunta de reflexión y oración conjunta.</li>
            </ul>
          </Card>
        </div>
      )}

      {tab === "registro" && (
        <div className="mt-6 grid gap-4">
          <Card className="gap-3 p-5">
            <h2 className="text-xl font-black text-faith-900">Registro mínimo de acompañamiento</h2>
            <p className="text-slate-600">
              Solo se registra lo necesario para acompañar, conforme a políticas de privacidad. Evita datos sensibles
              innecesarios.
            </p>
          </Card>
          {instructorLog.length === 0 ? (
            <Card className="gap-2 p-8 text-center">
              <ClipboardList className="mx-auto text-slate-300" size={40} />
              <p className="font-bold text-slate-500">
                Aún no hay registros. Completa las lecciones prácticas de la Fase 3 para generar tu primer registro.
              </p>
            </Card>
          ) : (
            <div className="grid gap-3">
              {instructorLog.map((log, i) => (
                <Card key={i} className="gap-2 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip color="primary" variant="soft">
                      {log.lessonId}
                    </Chip>
                    <span className="text-sm text-slate-500">{new Date(log.date).toLocaleString()}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-slate-700">{log.text}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "limites" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="gap-3 border-2 border-red-200 p-5">
            <h2 className="flex items-center gap-2 text-xl font-black text-red-800">
              <ShieldAlert size={22} /> Reconoce tus límites
            </h2>
            <ul className="grid gap-2 text-slate-700">
              <li>• Deriva dudas doctrinales profundas al responsable doctrinal designado.</li>
              <li>• Deriva situaciones pastorales sensibles al pastor o responsable pastoral.</li>
              <li>• Reporta cualquier señal de riesgo para menores al responsable de protección.</li>
              <li>• No prometas confidencialidad absoluta cuando haya riesgo: actúa con transparencia protectora.</li>
            </ul>
          </Card>
          <Card className="gap-3 p-5">
            <h2 className="text-xl font-black text-faith-900">Acuerdo de la iglesia</h2>
            <p className="text-slate-700">
              La autorización para enseñar es decisión de la iglesia, no de un algoritmo. La plataforma prepara y
              registra, pero la comunidad de fe confirma.
            </p>
            <p className="mt-2 rounded-xl bg-faith-50 p-3 text-slate-700">
              «Procura presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que maneja bien la
              palabra de verdad.» — 2 Timoteo 2:15
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
