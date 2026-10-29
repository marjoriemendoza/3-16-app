import { Button, Card, Chip, ProgressBar, ProgressCircle } from "@heroui/react";
import { Flame, Target, Trophy, Compass, BookOpen } from "lucide-react";
import { useStore, phaseProgress, moduleProgress } from "../store.jsx";
import { MISSIONS } from "../data/phases.js";
import { Icon } from "./Icon.jsx";

export default function ProgressView({ go }) {
  const { phases, progress, badges, badgesCatalog } = useStore();

  const totalLessons = phases.reduce(
    (acc, p) => acc + p.modules.reduce((a, m) => a + m.lessons.length, 0),
    0
  );
  const doneLessons = Object.values(progress.lessons).filter((l) => l.done).length;
  const overall = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      <h1 className="text-3xl font-black text-faith-900">Mi progreso</h1>
      <p className="mt-1 text-lg text-slate-600">
        Tus puntos reconocen práctica y constancia, no tu valor como persona ni tu madurez espiritual.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="items-center gap-2 p-5 text-center">
          <ProgressCircle value={overall} maxValue={100} aria-label="Avance total" size="lg" color="accent">
            <span className="text-lg font-black text-faith-900">{overall}%</span>
          </ProgressCircle>
          <p className="font-extrabold text-slate-700">Avance total</p>
          <p className="text-sm text-slate-500">
            {doneLessons} de {totalLessons} lecciones
          </p>
        </Card>
        <Card className="items-center gap-2 p-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
            <Trophy size={28} />
          </span>
          <p className="text-3xl font-black text-faith-900">{progress.points}</p>
          <p className="font-extrabold text-slate-700">Puntos</p>
        </Card>
        <Card className="items-center gap-2 p-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Flame size={28} />
          </span>
          <p className="text-3xl font-black text-faith-900">{progress.streak}</p>
          <p className="font-extrabold text-slate-700">Días seguidos</p>
        </Card>
        <Card className="items-center gap-2 p-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Target size={28} />
          </span>
          <p className="text-3xl font-black text-faith-900">{badges.length}</p>
          <p className="font-extrabold text-slate-700">Insignias</p>
        </Card>
      </div>

      <h2 className="mt-10 text-2xl font-black text-faith-900">Misiones</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {MISSIONS.map((m) => {
          const phase = phases.find((p) => p.code === m.phase);
          let completed = false;
          if (m.module && phase) {
            const mod = phase.modules.find((x) => x.code === m.module);
            completed = mod ? moduleProgress(progress, mod).percent === 100 : false;
          } else if (m.count && phase) {
            completed = phaseProgress(progress, phase).done >= m.count;
          } else if (phase) {
            completed = phaseProgress(progress, phase).percent === 100;
          }
          return (
            <Card key={m.id} className={`gap-2 p-5 ${completed ? "border-2 border-emerald-400" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-black text-faith-900">{m.title}</h3>
                <Chip color={completed ? "success" : "default"} variant="soft">
                  {completed ? "Completada" : `+${m.xp} XP`}
                </Chip>
              </div>
              <p className="text-slate-600">{m.desc}</p>
            </Card>
          );
        })}
      </div>

      <h2 className="mt-10 text-2xl font-black text-faith-900">Avance por fase y módulo</h2>
      <div className="mt-4 grid gap-4">
        {phases.map((phase) => {
          const pp = phaseProgress(progress, phase);
          return (
            <Card key={phase.id} className="gap-3 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-xl font-black text-faith-900">
                  <Compass size={20} /> {phase.name}
                </h3>
                <Chip color="primary" variant="soft">
                  {pp.percent}%
                </Chip>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {phase.modules.map((mod) => {
                  const mp = moduleProgress(progress, mod);
                  return (
                    <div key={mod.id} className="rounded-2xl bg-slate-50 p-3">
                      <p className="flex items-center gap-2 font-bold text-slate-700">
                        <Icon name={mod.icon} size={18} /> {mod.title}
                      </p>
                      <ProgressBar value={mp.percent} aria-label={mod.title} className="mt-2">
                        <ProgressBar.Track>
                          <ProgressBar.Fill />
                        </ProgressBar.Track>
                      </ProgressBar>
                      <p className="mt-1 text-sm text-slate-500">
                        {mp.done}/{mp.total} lecciones
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      <h2 className="mt-10 text-2xl font-black text-faith-900">Insignias</h2>
      <p className="mt-1 text-slate-600">Reconocen hitos de aprendizaje; no son certificaciones espirituales.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badgesCatalog.map((b) => {
          const owned = badges.includes(b.id);
          return (
            <Card key={b.id} className={`gap-2 p-5 text-center ${owned ? "border-2 border-gold-300" : "opacity-60"}`}>
              <span
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
                  owned ? "bg-gold-100 text-gold-700" : "bg-slate-100 text-slate-400"
                }`}
              >
                <Icon name={b.icon} size={26} />
              </span>
              <p className="font-black text-faith-900">{b.name}</p>
              <p className="text-sm text-slate-500">{b.desc}</p>
              {owned && <Chip color="warning" variant="soft">Obtenida</Chip>}
            </Card>
          );
        })}
      </div>

      <div className="mt-10">
        <Button size="lg" variant="primary" onClick={() => go("map")}>
          <BookOpen size={18} /> Seguir aprendiendo
        </Button>
      </div>
    </div>
  );
}
