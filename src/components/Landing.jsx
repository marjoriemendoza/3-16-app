import { Button, Card } from "@heroui/react";
import { BookOpen, Compass, Users, ShieldCheck, Sparkles, ArrowRight, Heart } from "lucide-react";
import { useStore, phaseProgress } from "../store.jsx";
import { VERSE } from "../data/phases.js";
import { Icon } from "./Icon.jsx";

export default function Landing({ go }) {
  const { phases, progress, profile } = useStore();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <section className="pt-10 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-faith-50 px-4 py-1.5 text-sm font-extrabold text-faith-700">
          <Sparkles size={16} /> Ministerio Juan 3:16 · Iglesia bautista · El Salvador
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight text-faith-900 sm:text-5xl">
          Conoce la Biblia. Comprende el evangelio. <span className="text-gold-700">Vívelo y compártelo.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
          Una ruta de formación bíblica interactiva para niños, adolescentes y adultos: lecciones breves, juegos,
          progreso visible y acompañamiento de instructores.
        </p>

        <Card className="mx-auto mt-8 max-w-3xl gap-3 border-2 border-gold-300 bg-gradient-to-br from-white to-gold-100 p-6 text-left">
          <p className="text-2xl font-bold italic leading-snug text-faith-900">“{VERSE.text}”</p>
          <p className="text-lg font-extrabold text-gold-700">— {VERSE.ref}</p>
          <p className="text-sm text-slate-500">{VERSE.translation}</p>
        </Card>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" variant="primary" onClick={() => go("map")}>
            <Compass size={20} /> {profile.name ? `Continuar mi ruta, ${profile.name}` : "Comenzar mi ruta"}
          </Button>
          <Button size="lg" variant="outline" onClick={() => go("progress")}>
            Ver mi progreso
          </Button>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Tu avance se guarda en tu cuenta y te acompaña en cualquier dispositivo. No reemplaza la enseñanza presencial ni la iglesia.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-3xl font-black text-faith-900">Tres fases, un camino</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-lg text-slate-600">
          CONOCER → COMPRENDER Y VIVIR → ENSEÑAR Y ACOMPAÑAR
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {phases.map((phase, i) => {
            const p = phaseProgress(progress, phase);
            return (
              <Card key={phase.id} className="card-soft gap-3 p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-faith-600 text-white">
                    <Icon name={phase.modules[0]?.icon} size={24} />
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-extrabold text-slate-600">
                    Paso {i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-black text-faith-900">{phase.name}</h3>
                <p className="text-lg font-bold text-gold-700">{phase.slogan}</p>
                <p className="text-slate-600">{phase.tagline}</p>
                <p className="text-sm font-semibold text-slate-500">
                  {p.done} de {p.total} lecciones completadas
                </p>
                <Button variant="secondary" fullWidth onClick={() => go("map")}>
                  Ver módulos <ArrowRight size={18} />
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: <BookOpen size={26} />,
            title: "Lecciones con la Biblia",
            text: "Cada lección parte de un pasaje bíblico real, con explicación clara y referencias.",
          },
          {
            icon: <Sparkles size={26} />,
            title: "Juegos que enseñan",
            text: "Verdadero o falso, ordenar, parejas, memoria, completar frases y mucho más.",
          },
          {
            icon: <Users size={26} />,
            title: "Acompañamiento humano",
            text: "Instructores que guían, corrigen con amor y caminan contigo en la fe.",
          },
        ].map((f) => (
          <Card key={f.title} className="gap-3 p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
              {f.icon}
            </span>
            <h3 className="text-xl font-black text-faith-900">{f.title}</h3>
            <p className="text-slate-600">{f.text}</p>
          </Card>
        ))}
      </section>

      <section className="mt-16">
        <Card className="gap-4 bg-gradient-to-br from-faith-900 to-faith-600 p-8 text-center text-white">
          <Heart className="mx-auto text-gold-300" size={36} />
          <h2 className="text-3xl font-black">El evangelio en una frase</h2>
          <p className="mx-auto max-w-2xl text-xl">
            Dios amó al mundo de tal manera que dio a su Hijo, para que todo aquel que en él cree no se pierda, mas
            tenga vida eterna.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="tertiary" onClick={() => go("map")}>
              Empezar la Fase 1 <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      </section>

      <section className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500">
        <span className="inline-flex items-center gap-2 font-bold">
          <ShieldCheck size={20} /> Datos en la cuenta de tu iglesia
        </span>
        <span className="inline-flex items-center gap-2 font-bold">
          <Users size={20} /> Pensado de niños a ancianos
        </span>
        <span className="inline-flex items-center gap-2 font-bold">
          <BookOpen size={20} /> Contenido sujeto a aprobación pastoral
        </span>
      </section>
    </div>
  );
}
