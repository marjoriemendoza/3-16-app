import { Button, Card, Chip, Select, Switch } from "@heroui/react";
import { Type, Contrast, Moon, RotateCcw, User, Users } from "lucide-react";
import { useStore } from "../store.jsx";
import { AGE_GROUPS } from "../data/phases.js";

export default function Settings({ onReset }) {
  const { profile, setProfile, settings, setSettings, progress, badges } = useStore();

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <h1 className="text-3xl font-black text-faith-900">Ajustes</h1>
      <p className="mt-1 text-lg text-slate-600">
        Configura el perfil y la accesibilidad para que la aplicación sea cómoda a cualquier edad.
      </p>

      <Card className="mt-6 gap-4 p-6">
        <h2 className="flex items-center gap-2 text-xl font-black text-faith-900">
          <User size={22} /> Mi perfil
        </h2>
        <label className="block">
          <span className="mb-1 block font-bold text-slate-700">Nombre (opcional)</span>
          <input
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg focus:border-faith-500 focus:outline-none"
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
            placeholder="Ej: Ana"
          />
        </label>

        <div>
          <p className="mb-2 flex items-center gap-2 font-bold text-slate-700">
            <Users size={18} /> Grupo de edad
          </p>
          <p className="mb-3 text-sm text-slate-500">
            La base doctrinal es la misma para todos; cambia el vocabulario, los ejemplos y la profundidad.
          </p>
          <div className="grid gap-3">
            {AGE_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setProfile({ ageGroup: g.id })}
                className={`game-option rounded-2xl border-2 px-4 py-4 text-left ${
                  profile.ageGroup === g.id
                    ? "border-faith-500 bg-faith-50"
                    : "border-slate-200 bg-white hover:border-faith-500"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-lg font-black text-faith-900">{g.label}</span>
                  <span className="text-sm font-bold text-slate-500">{g.ages}</span>
                </span>
                <span className="mt-1 block text-slate-600">{g.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="mt-6 gap-5 p-6">
        <h2 className="flex items-center gap-2 text-xl font-black text-faith-900">
          <Type size={22} /> Accesibilidad
        </h2>

        <div>
          <p className="mb-2 font-bold text-slate-700">Tamaño del texto</p>
          <div className="flex flex-wrap items-center gap-2">
            {[0.9, 1, 1.15, 1.3, 1.5].map((s) => (
              <Button
                key={s}
                variant={settings.fontScale === s ? "primary" : "outline"}
                onClick={() => setSettings({ fontScale: s })}
              >
                {s === 0.9 ? "Pequeño" : s === 1 ? "Normal" : s === 1.15 ? "Grande" : s === 1.3 ? "Muy grande" : "Enorme"}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 font-bold text-slate-700">
            <Contrast size={20} /> Contraste alto
          </span>
          <Switch isSelected={settings.highContrast} onChange={(v) => setSettings({ highContrast: v })}>
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              Contraste alto
            </Switch.Content>
          </Switch>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <span className="flex items-center gap-2 font-bold text-slate-700">
            <Moon size={20} /> Modo oscuro
          </span>
          <Switch isSelected={settings.dark} onChange={(v) => setSettings({ dark: v })}>
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              Modo oscuro
            </Switch.Content>
          </Switch>
        </div>

        <p className="text-sm text-slate-500">
          La aplicación respeta también la configuración de movimiento reducido de tu dispositivo.
        </p>
      </Card>

      <Card className="mt-6 gap-4 p-6">
        <h2 className="text-xl font-black text-faith-900">Mis datos</h2>
        <div className="flex flex-wrap gap-2">
          <Chip color="primary" variant="soft">
            {progress.points} puntos
          </Chip>
          <Chip color="warning" variant="soft">
            {badges.length} insignias
          </Chip>
          <Chip variant="soft">
            {Object.values(progress.lessons).filter((l) => l.done).length} lecciones completadas
          </Chip>
        </div>
        <p className="text-slate-600">
          Tu progreso, tus evaluaciones y tus logros se guardan en la base de datos de la iglesia. Las preferencias
          de accesibilidad y el nombre visible se guardan en este dispositivo.
        </p>
        <Button variant="danger" onClick={onReset}>
          <RotateCcw size={18} /> Borrar preferencias locales
        </Button>
      </Card>
    </div>
  );
}
