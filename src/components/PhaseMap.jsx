import { useState } from "react";
import { Button, Card, ProgressBar, Tabs, Chip } from "@heroui/react";
import { CheckCircle2, Circle, Lock, BookOpen, ArrowRight } from "lucide-react";
import { useStore, moduleProgress, phaseProgress } from "../store.jsx";
import { Icon } from "./Icon.jsx";

export default function PhaseMap({ go }) {
  const { phases, progress } = useStore();
  const [tab, setTab] = useState(phases[0].id);

  const phase = phases.find((p) => p.id === tab) || phases[0];
  const pp = phaseProgress(progress, phase);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      <h1 className="text-3xl font-black text-faith-900">Mi ruta de fe</h1>
      <p className="mt-1 text-lg text-slate-600">
        Elige una fase y avanza a tu ritmo. Puedes repetir cualquier lección cuando quieras.
      </p>

      <Tabs selectedKey={tab} onSelectionChange={setTab} className="mt-6">
        <Tabs.List>
          {phases.map((p) => (
            <Tabs.Tab key={p.id} id={p.id}>
              {p.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {phases.map((p) => (
          <Tabs.Panel key={p.id} id={p.id}>
            <Card className="mt-4 gap-3 border-2 border-faith-100 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <Chip color="primary" variant="soft">
                  {p.slogan}
                </Chip>
                <Chip color="warning" variant="soft">
                  {p.modules.length} módulos · {pp.total} lecciones
                </Chip>
              </div>
              <p className="text-lg text-slate-700">{p.tagline}</p>
              <p className="text-sm text-slate-500">
                <strong className="text-slate-700">Público:</strong> {p.audience}
              </p>
              <div className="mt-1">
                <ProgressBar value={pp.percent} aria-label="Avance de la fase" className="max-w-md">
                  <ProgressBar.Track>
                    <ProgressBar.Fill />
                  </ProgressBar.Track>
                </ProgressBar>
                <p className="mt-1 text-sm font-bold text-faith-700">
                  {pp.percent}% completado ({pp.done} de {pp.total})
                </p>
              </div>
              <p className="rounded-2xl bg-faith-50 p-3 text-slate-700">
                <strong>Resultado esperado:</strong> {p.result}
              </p>
            </Card>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {p.modules.map((mod) => {
                const mp = moduleProgress(progress, mod);
                return (
                  <Card key={mod.id} className="card-soft gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-faith-500 to-faith-800 text-white">
                        <Icon name={mod.icon} size={22} />
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-faith-900">{mod.title}</h3>
                        <p className="text-slate-600">{mod.summary}</p>
                      </div>
                    </div>
                    <ProgressBar value={mp.percent} aria-label={`Avance de ${mod.title}`}>
                      <ProgressBar.Track>
                        <ProgressBar.Fill />
                      </ProgressBar.Track>
                    </ProgressBar>
                    <ul className="grid gap-2">
                      {mod.lessons.map((lesson, idx) => {
                        const rec = progress.lessons[lesson.id];
                        const done = rec?.done;
                        const prevDone = idx === 0 || progress.lessons[mod.lessons[idx - 1]?.id]?.done;
                        const locked = !prevDone && !done;
                        return (
                          <li key={lesson.id}>
                            <button
                              disabled={locked}
                              onClick={() => go("lesson", { phaseId: p.id, moduleId: mod.id, lessonId: lesson.id })}
                              className={`game-option flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left ${
                                locked
                                  ? "cursor-not-allowed border-slate-100 bg-slate-50 opacity-70"
                                  : done
                                    ? "border-emerald-300 bg-emerald-50 hover:border-emerald-500"
                                    : "border-slate-200 bg-white hover:border-faith-500 hover:bg-faith-50"
                              }`}
                            >
                              {done ? (
                                <CheckCircle2 className="shrink-0 text-emerald-600" size={24} />
                              ) : locked ? (
                                <Lock className="shrink-0 text-slate-400" size={22} />
                              ) : (
                                <Circle className="shrink-0 text-faith-500" size={24} />
                              )}
                              <span className="flex-1">
                                <span className="block text-lg font-bold text-slate-800">{lesson.title}</span>
                                <span className="block text-sm text-slate-500">{lesson.objective}</span>
                              </span>
                              {rec && (
                                <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-sm font-extrabold text-faith-700">
                                  {rec.score}%
                                </span>
                              )}
                              {!locked && !done && <ArrowRight size={18} className="shrink-0 text-faith-500" />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    {mp.percent === 100 && (
                      <p className="rounded-xl bg-emerald-50 px-3 py-2 font-bold text-emerald-800">
                        ¡Módulo completado! Puedes repasar o continuar.
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
