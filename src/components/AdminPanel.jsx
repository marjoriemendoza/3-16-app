import { useState } from "react";
import { Button, Card, Chip, Input, Select, TextArea } from "@heroui/react";
import { Plus, Trash2, Pencil, History, Layers } from "lucide-react";
import { useStore, allLessons } from "../store.jsx";

const STATUSES = ["borrador", "en revisión", "aprobado", "publicado"];

const statusColor = {
  borrador: "default",
  "en revisión": "warning",
  aprobado: "primary",
  publicado: "success",
};

export default function AdminPanel() {
  const {
    phases,
    content,
    setLessonStatus,
    addCustomLesson,
    updateCustomLesson,
    deleteCustomLesson,
  } = useStore();
  const [tab, setTab] = useState("contenido");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [filter, setFilter] = useState("todos");

  const lessons = allLessons(phases);
  const statusOf = (id) => content.status[id] || "aprobado";
  const filtered = lessons.filter((l) => filter === "todos" || statusOf(l.id) === filter);

  function emptyForm() {
    return {
      moduleId: phases[0]?.modules[0]?.id ?? "",
      title: "",
      objective: "",
      passageRef: "",
      passageText: "",
      explanation: "",
    };
  }

  const startCreate = () => {
    setForm(emptyForm());
    setCreating(true);
    setEditing(null);
  };

  const startEdit = (c) => {
    setEditing(c);
    setCreating(true);
    setForm({
      moduleId: c.moduleId,
      title: c.lesson.title,
      objective: c.lesson.objective,
      passageRef: c.lesson.passage?.ref || "",
      passageText: c.lesson.passage?.text || "",
      explanation: c.lesson.explanation?.adults || "",
    });
  };

  const save = () => {
    const lesson = {
      id: `custom-${Date.now()}`,
      title: form.title || "Lección sin título",
      objective: form.objective || "Por definir",
      activation: {
        kids: "Pregunta inicial para niños.",
        teens: "Pregunta inicial para adolescentes.",
        adults: form.activationAdults || "Pregunta inicial para adultos.",
      },
      passage: { ref: form.passageRef || "Por definir", text: form.passageText || "Texto pendiente." },
      explanation: {
        kids: form.explanation,
        teens: form.explanation,
        adults: form.explanation,
      },
      activities: [
        {
          type: "tf",
          title: "Verdadero o falso",
          items: [{ text: form.title || "Idea de la lección", answer: true }],
        },
      ],
      reflection: {
        kids: "¿Qué aprendiste hoy?",
        teens: "¿Cómo aplicas esta idea esta semana?",
        adults: "¿Qué cambio concreto produce en ti esta enseñanza?",
      },
      evaluation: [
        {
          q: form.title || "Pregunta de evaluación",
          options: ["Opción correcta", "Opción incorrecta"],
          answer: 0,
          why: "Explicación pendiente de revisión doctrinal.",
        },
      ],
    };

    if (editing) {
      updateCustomLesson(editing.id, {
        moduleId: form.moduleId,
        lesson: { ...editing.lesson, ...lesson, id: editing.lesson.id },
      });
    } else {
      addCustomLesson(form.moduleId, lesson);
    }
    setCreating(false);
    setEditing(null);
  };

  const moduleOptions = phases.flatMap((p) =>
    p.modules.map((m) => ({ key: m.id, label: `${p.name} · ${m.title}` }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      <h1 className="text-3xl font-black text-faith-900">Administración de contenido</h1>
      <p className="mt-1 text-lg text-slate-600">
        Flujo de revisión: borrador → en revisión → aprobado → publicado. La aprobación doctrinal depende de los
        responsables de la iglesia, no del sistema.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {[
          { id: "contenido", label: "Contenido base" },
          { id: "nuevo", label: "Crear lección" },
          { id: "borradores", label: "Borradores míos" },
          { id: "historial", label: "Historial" },
        ].map((t) => (
          <Button
            key={t.id}
            variant={tab === t.id ? "primary" : "outline"}
            onClick={() => {
              setTab(t.id);
              if (t.id === "nuevo") startCreate();
            }}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {tab === "contenido" && (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-600">Filtrar por estado:</span>
            <Button size="sm" variant={filter === "todos" ? "primary" : "ghost"} onClick={() => setFilter("todos")}>
              Todos
            </Button>
            {STATUSES.map((s) => (
              <Button key={s} size="sm" variant={filter === s ? "primary" : "ghost"} onClick={() => setFilter(s)}>
                {s}
              </Button>
            ))}
          </div>
          <div className="grid gap-3">
            {filtered.map((l) => (
              <Card key={l.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-52 flex-1">
                  <p className="font-black text-faith-900">{l.title}</p>
                  <p className="text-sm text-slate-500">
                    {l.phaseId} · {l.moduleId} · {l.id}
                  </p>
                </div>
                <Chip color={statusColor[statusOf(l.id)]} variant="soft">
                  {statusOf(l.id)}
                </Chip>
                <Select
                  aria-label={`Estado de ${l.title}`}
                  selectedKey={statusOf(l.id)}
                  onSelectionChange={(key) => setLessonStatus(l.id, String(key))}
                >
                  <Select.Trigger className="w-44">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover>
                    {STATUSES.map((s) => (
                      <Select.Option key={s} id={s}>
                        {s}
                      </Select.Option>
                    ))}
                  </Select.Popover>
                </Select>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Card className="p-8 text-center text-slate-500">No hay lecciones con ese estado.</Card>
            )}
          </div>
        </div>
      )}

      {creating && (tab === "nuevo" || editing) && (
        <Card className="mt-6 gap-4 p-6">
          <h2 className="text-xl font-black text-faith-900">{editing ? "Editar lección propia" : "Crear nueva lección"}</h2>
          <Select
            aria-label="Módulo"
            selectedKey={form.moduleId}
            onSelectionChange={(key) => setForm({ ...form, moduleId: String(key) })}
          >
            <Select.Trigger className="w-full">
              <Select.Value />
            </Select.Trigger>
            <Select.Popover>
              {moduleOptions.map((m) => (
                <Select.Option key={m.key} id={m.key}>
                  {m.label}
                </Select.Option>
              ))}
            </Select.Popover>
          </Select>
          <Input
            aria-label="Título de la lección"
            placeholder="Título de la lección, ej: La oración de los discípulos"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            fullWidth
          />
          <Input
            aria-label="Objetivo de aprendizaje"
            placeholder="Objetivo: El alumno será capaz de..."
            value={form.objective}
            onChange={(e) => setForm({ ...form, objective: e.target.value })}
            fullWidth
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              aria-label="Referencia bíblica"
              placeholder="Referencia bíblica, ej: Mateo 6:9-13"
              value={form.passageRef}
              onChange={(e) => setForm({ ...form, passageRef: e.target.value })}
              fullWidth
            />
            <Input
              aria-label="Explicación para adultos"
              placeholder="Explicación (edad adults): idea central"
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              fullWidth
            />
          </div>
          <TextArea
            aria-label="Texto del pasaje bíblico"
            placeholder="Texto del pasaje bíblico"
            value={form.passageText}
            onChange={(e) => setForm({ ...form, passageText: e.target.value })}
            rows={3}
            fullWidth
          />
          <div className="flex gap-3">
            <Button variant="primary" onClick={save}>
              Guardar como borrador
            </Button>
            <Button variant="ghost" onClick={() => setCreating(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {tab === "borradores" && (
        <div className="mt-6 grid gap-3">
          {content.customLessons.length === 0 && (
            <Card className="p-8 text-center">
              <Layers className="mx-auto text-slate-300" size={40} />
              <p className="mt-2 font-bold text-slate-500">
                No has creado lecciones propias. Usa «Crear lección» para comenzar el flujo de revisión.
              </p>
            </Card>
          )}
          {content.customLessons.map((c) => (
            <Card key={c.id} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-52 flex-1">
                <p className="font-black text-faith-900">{c.lesson.title}</p>
                <p className="text-sm text-slate-500">Módulo: {c.moduleId}</p>
              </div>
              <Chip color={statusColor[c.status]} variant="soft">
                {c.status}
              </Chip>
              <Select
                aria-label="Cambiar estado"
                selectedKey={c.status}
                onSelectionChange={(key) => updateCustomLesson(c.id, { status: String(key) })}
              >
                <Select.Trigger className="w-44">
                  <Select.Value />
                </Select.Trigger>
                <Select.Popover>
                  {STATUSES.map((s) => (
                    <Select.Option key={s} id={s}>
                      {s}
                    </Select.Option>
                  ))}
                </Select.Popover>
              </Select>
              <Button size="sm" variant="ghost" isIconOnly onClick={() => startEdit(c)} aria-label="Editar">
                <Pencil size={18} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                isIconOnly
                className="text-red-600"
                onClick={() => deleteCustomLesson(c.id)}
                aria-label="Eliminar"
              >
                <Trash2 size={18} />
              </Button>
            </Card>
          ))}
        </div>
      )}

      {tab === "historial" && (
        <div className="mt-6 grid gap-3">
          <Card className="flex items-center gap-2 p-5">
            <History size={22} className="text-faith-700" />
            <h2 className="text-xl font-black text-faith-900">Historial de cambios</h2>
          </Card>
          {content.history.length === 0 ? (
            <Card className="p-8 text-center text-slate-500">Todavía no hay cambios registrados.</Card>
          ) : (
            content.history.map((h, i) => (
              <Card key={i} className="flex flex-wrap items-center gap-3 p-4">
                <Chip color={statusColor[h.status]} variant="soft">
                  {h.status}
                </Chip>
                <span className="font-bold text-slate-700">{h.lessonId}</span>
                <span className="ml-auto text-sm text-slate-500">{new Date(h.date).toLocaleString()}</span>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
