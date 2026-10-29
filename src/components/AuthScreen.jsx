import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { BookOpen, LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { useStore } from "../store.jsx";
import { VERSE } from "../data/phases.js";

const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export default function AuthScreen() {
  const { session, login, register, clearSessionError } = useStore();
  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const isRegister = mode === "register";

  const submit = async (event) => {
    event.preventDefault();
    setLocalError(null);
    const cleanPhone = phone.trim();
    if (!PHONE_PATTERN.test(cleanPhone)) {
      setLocalError("El teléfono debe incluir el código de país, por ejemplo +50371234567.");
      return;
    }
    if (!PASSWORD_PATTERN.test(password)) {
      setLocalError("La contraseña necesita al menos 8 caracteres, con letras y números.");
      return;
    }
    const ok = isRegister ? await register(cleanPhone, password) : await login(cleanPhone, password);
    if (ok) setPassword("");
  };

  const switchMode = (next) => {
    setMode(next);
    setLocalError(null);
    clearSessionError();
  };

  const error = localError || session.error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-faith-50 via-white to-gold-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-4 py-12 lg:flex-row lg:items-stretch">
        <section className="flex-1 self-center text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-extrabold text-faith-700 shadow-sm">
            <BookOpen size={16} /> Ministerio Juan 3:16 · Ruta de Fe
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-faith-900 sm:text-5xl">
            Tu ruta de fe, <span className="text-gold-700">guardada en tu cuenta</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Inicia sesión para ver las lecciones que publica tu iglesia y continuar tu progreso desde
            cualquier dispositivo.
          </p>
          <Card className="mt-6 gap-2 border-2 border-gold-300 bg-white/80 p-5 text-left">
            <p className="text-xl font-bold italic leading-snug text-faith-900">“{VERSE.text}”</p>
            <p className="font-extrabold text-gold-700">— {VERSE.ref}</p>
          </Card>
        </section>

        <Card className="w-full max-w-md gap-4 p-6 shadow-lg lg:self-center">
          <div className="flex gap-2">
            <Button
              fullWidth
              variant={isRegister ? "ghost" : "primary"}
              onClick={() => switchMode("login")}
              type="button"
            >
              <LogIn size={18} /> Entrar
            </Button>
            <Button
              fullWidth
              variant={isRegister ? "primary" : "ghost"}
              onClick={() => switchMode("register")}
              type="button"
            >
              <UserPlus size={18} /> Crear cuenta
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-black text-faith-900">
              {isRegister ? "Crear mi cuenta" : "Bienvenido de nuevo"}
            </h2>
            <p className="text-slate-600">
              {isRegister
                ? "Regístrate con tu número de teléfono. No necesitas correo."
                : "Usa el teléfono y la contraseña con los que te registraste."}
            </p>
          </div>

          <form className="grid gap-4" onSubmit={submit}>
            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">Teléfono</span>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+50371234567"
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg focus:border-faith-500 focus:outline-none"
                required
              />
              <span className="mt-1 block text-sm text-slate-500">
                Con código de país, sin espacios ni guiones.
              </span>
            </label>

            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">Contraseña</span>
              <input
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo 8 caracteres, con letras y números"
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg focus:border-faith-500 focus:outline-none"
                required
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-800"
              >
                {error}
              </p>
            )}

            <Button type="submit" size="lg" variant="primary" fullWidth isDisabled={session.busy}>
              {session.busy ? "Conectando..." : isRegister ? "Crear cuenta y entrar" : "Entrar"}
            </Button>
          </form>

          <p className="flex items-start gap-2 text-sm text-slate-500">
            <ShieldCheck className="mt-0.5 shrink-0" size={18} />
            Tu contraseña se guarda cifrada en el servidor. El contenido y tu progreso viven en la
            base de datos de la iglesia.
          </p>
        </Card>
      </div>
    </div>
  );
}
