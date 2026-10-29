import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { BookOpen, Compass, RefreshCw, LogOut } from "lucide-react";
import { StoreProvider, useStore } from "./store.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthScreen from "./components/AuthScreen.jsx";
import Landing from "./components/Landing.jsx";
import PhaseMap from "./components/PhaseMap.jsx";
import LessonView from "./components/LessonView.jsx";
import ProgressView from "./components/ProgressView.jsx";
import InstructorPanel from "./components/InstructorPanel.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import Settings from "./components/Settings.jsx";
import { AGE_GROUPS, VERSE } from "./data/phases.js";

function Splash({ label = "Cargando..." }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-faith-50 text-faith-900">
      <span className="flex h-16 w-16 animate-pulse items-center justify-center rounded-3xl bg-gradient-to-br from-faith-600 to-faith-900 text-white">
        <BookOpen size={30} />
      </span>
      <p className="text-lg font-extrabold">{label}</p>
    </div>
  );
}

function ContentError({ message }) {
  const { reloadContent, logout } = useStore();
  return (
    <div className="flex min-h-screen items-center justify-center bg-faith-50 px-4">
      <div className="w-full max-w-xl rounded-3xl border-2 border-red-200 bg-white p-8 text-center shadow">
        <h1 className="text-2xl font-black text-faith-900">No pudimos cargar el contenido</h1>
        <p className="mt-2 text-slate-600">{message}</p>
        <p className="mt-2 text-sm text-slate-500">
          Revisa que la API esté en ejecución y que el contenido esté sembrado en MySQL
          (<code>npm run seed</code>).
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={reloadContent}>
            <RefreshCw size={18} /> Reintentar
          </Button>
          <Button variant="ghost" onClick={logout}>
            <LogOut size={18} /> Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}

function Onboarding() {
  const { profile, setProfile } = useStore();
  const [name, setName] = useState("");
  const [group, setGroup] = useState("adults");
  const [open, setOpen] = useState(!profile.name);

  const start = () => {
    setProfile({ name: name.trim() || "Amigo", ageGroup: group });
    setOpen(false);
  };

  return (
    <Modal.Backdrop isOpen={open} onOpenChange={setOpen} isDismissable={false}>
      <Modal.Container size="lg" placement="center">
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading className="text-2xl font-black text-faith-900">
              Bienvenido a Juan 3:16 · Ruta de Fe
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p className="text-lg italic text-faith-700">
              “{VERSE.text}” — {VERSE.ref}
            </p>
            <p className="mt-2 text-slate-600">
              Esta ruta te ayudará a conocer la Biblia, comprender el evangelio y vivirlo. Primero, cuéntanos un poco
              de ti para adaptar las lecciones.
            </p>
            <label className="mt-4 block">
              <span className="mb-1 block font-bold text-slate-700">¿Cómo te llamas? (opcional)</span>
              <input
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg focus:border-faith-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
            </label>
            <p className="mt-4 mb-2 font-bold text-slate-700">¿Cómo quieres que te enseñemos?</p>
            <div className="grid gap-3">
              {AGE_GROUPS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGroup(g.id)}
                  className={`game-option rounded-2xl border-2 px-4 py-4 text-left ${
                    group === g.id ? "border-faith-500 bg-faith-50" : "border-slate-200 bg-white hover:border-faith-500"
                  }`}
                >
                  <span className="block text-lg font-black text-faith-900">
                    {g.label} <span className="text-sm font-bold text-slate-500">({g.ages})</span>
                  </span>
                  <span className="block text-slate-600">{g.desc}</span>
                </button>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button size="lg" variant="primary" fullWidth slot="close" onClick={start}>
              <Compass size={20} /> Comenzar mi ruta
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}

function Shell() {
  const [route, setRoute] = useState({ name: "landing", params: null });
  const { resetLocal, progress } = useStore();

  const go = (name, params = null) => {
    setRoute({ name, params });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    if (
      confirm(
        "¿Seguro que quieres borrar tus preferencias locales de este dispositivo? Tu progreso queda guardado en tu cuenta."
      )
    ) {
      resetLocal();
      go("landing");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar view={route.name} go={go} onReset={handleReset} />
      <Onboarding />
      <main>
        {route.name === "landing" && <Landing go={go} />}
        {route.name === "map" && <PhaseMap go={go} />}
        {route.name === "lesson" && <LessonView params={route.params} go={go} />}
        {route.name === "progress" && <ProgressView go={go} />}
        {route.name === "instructor" && <InstructorPanel />}
        {route.name === "admin" && <AdminPanel />}
        {route.name === "settings" && <Settings onReset={handleReset} />}
      </main>
      <footer className="border-t border-slate-200 bg-white/70 py-8 text-center text-slate-500">
        <p className="flex items-center justify-center gap-2 font-bold">
          <BookOpen size={18} /> Ministerio Juan 3:16 · Iglesia bautista · El Salvador
        </p>
        <p className="mt-1 text-sm">
          Contenidos doctrinales, traducción bíblica y políticas de protección sujetos a aprobación de los
          responsables de la iglesia. {progress.lessons && Object.keys(progress.lessons).length > 0 && `· ${progress.points} puntos`}
        </p>
      </footer>
    </div>
  );
}

function Gate() {
  const { session, phases, contentStatus } = useStore();

  if (session.status === "loading") return <Splash label="Recuperando tu sesión..." />;
  if (session.status === "anonymous") return <AuthScreen />;
  if (contentStatus.error) return <ContentError message={contentStatus.error} />;
  if (!contentStatus.ready) return <Splash label="Cargando el contenido de tu iglesia..." />;
  if (phases.length === 0) {
    return (
      <ContentError message="La base de datos no tiene fases de aprendizaje activas. Ejecuta npm run seed en la API para cargar el contenido." />
    );
  }
  return <Shell />;
}

export default function App() {
  return (
    <StoreProvider>
      <Gate />
    </StoreProvider>
  );
}
