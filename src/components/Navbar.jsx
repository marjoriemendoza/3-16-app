import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { BookOpen, Menu, X, Settings, LogOut, User } from "lucide-react";
import { useStore } from "../store.jsx";

const LINKS = [
  { id: "map", label: "Mi ruta" },
  { id: "progress", label: "Mi progreso" },
  { id: "instructor", label: "Instructores" },
  { id: "admin", label: "Administración" },
  { id: "settings", label: "Ajustes" },
];

export default function Navbar({ view, go, onReset }) {
  const { profile, progress, logout } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button onClick={() => go("landing")} className="flex items-center gap-2 text-left" aria-label="Ir al inicio">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-faith-600 to-faith-900 text-white shadow-md">
            <BookOpen size={22} />
          </span>
          <span>
            <span className="block text-lg font-black leading-tight text-faith-900">Juan 3:16</span>
            <span className="block text-sm font-bold text-gold-700">Ruta de Fe</span>
          </span>
        </button>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Button
              key={l.id}
              variant={view === l.id ? "primary" : "ghost"}
              onClick={() => go(l.id)}
              size="md"
            >
              {l.label}
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden rounded-full bg-gold-100 px-3 py-1 text-sm font-extrabold text-gold-700 sm:inline">
            {progress.points} puntos · racha {progress.streak}
          </span>
          {profile.name && (
            <span className="hidden items-center gap-2 rounded-full bg-faith-50 px-3 py-1 text-sm font-bold text-faith-700 md:inline-flex">
              <User size={16} /> {profile.name}
            </span>
          )}
          <Button variant="ghost" isIconOnly size="md" onClick={() => go("settings")} aria-label="Ajustes">
            <Settings size={20} />
          </Button>
          <Button
            variant="ghost"
            isIconOnly
            size="md"
            onClick={logout}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </Button>
          <Button variant="ghost" isIconOnly size="md" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {open && (
        <Card className="mx-4 mb-3 gap-1 p-2 lg:hidden">
          {LINKS.map((l) => (
            <Button
              key={l.id}
              fullWidth
              variant={view === l.id ? "primary" : "ghost"}
              onClick={() => {
                go(l.id);
                setOpen(false);
              }}
            >
              {l.label}
            </Button>
          ))}
          <Button fullWidth variant="ghost" onClick={logout} className="justify-start">
            <LogOut size={18} /> Cerrar sesión
          </Button>
          <Button fullWidth variant="ghost" onClick={onReset} className="justify-start text-red-600">
            Reiniciar datos locales
          </Button>
        </Card>
      )}
    </header>
  );
}
