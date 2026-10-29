import { useMemo, useState } from "react";
import { Button, Card } from "@heroui/react";
import { Check, X, RotateCcw, ArrowUp, ArrowDown, Link2 } from "lucide-react";

function shuffle(arr, seed = Date.now()) {
  const a = [...arr];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FeedbackBox({ ok, text, onContinue, continueLabel = "Continuar" }) {
  return (
    <div
      className={`mt-4 rounded-2xl p-4 ${ok ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"}`}
      role="status"
    >
      <p className="flex items-start gap-2 font-semibold">
        {ok ? <Check className="mt-0.5 shrink-0" size={20} /> : <X className="mt-0.5 shrink-0" size={20} />}
        {ok ? "¡Correcto!" : "Casi. Vamos a revisar:"}
      </p>
      <p className="mt-1 text-[1.05rem] leading-relaxed">{text}</p>
      {onContinue && (
        <Button className="mt-3" variant="primary" onClick={onContinue}>
          {continueLabel}
        </Button>
      )}
    </div>
  );
}

export function ChoiceGame({ activity, onComplete }) {
  const [picked, setPicked] = useState(null);
  const done = picked !== null;
  const ok = picked === activity.answer;

  return (
    <Card className="p-5">
      <h3 className="text-lg font-extrabold">{activity.title}</h3>
      <p className="mt-2 text-lg">{activity.prompt}</p>
      <div className="mt-4 grid gap-3">
        {activity.options.map((opt, i) => {
          const selected = picked === i;
          const show = done && (i === activity.answer || selected);
          return (
            <button
              key={i}
              disabled={done}
              onClick={() => setPicked(i)}
              className={`game-option flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-lg font-semibold ${
                show && i === activity.answer
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                  : show
                    ? "border-red-400 bg-red-50 text-red-900"
                    : "border-slate-200 bg-white hover:border-faith-500 hover:bg-faith-50"
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {done && (
        <FeedbackBox
          ok={ok}
          text={activity.feedback || (ok ? "Muy bien, entendiste la idea." : "Revisa la explicación de la lección e inténtalo de nuevo en el repaso.")}
          onContinue={() => onComplete(ok ? 1 : 0, 1)}
        />
      )}
    </Card>
  );
}

export function TfGame({ activity, onComplete }) {
  const [answers, setAnswers] = useState({});
  const items = activity.items;
  const allDone = Object.keys(answers).length === items.length;
  const correct = items.filter((it, i) => answers[i] === it.answer).length;

  const answer = (i, val) => setAnswers((a) => ({ ...a, [i]: val }));

  return (
    <Card className="p-5">
      <h3 className="text-lg font-extrabold">{activity.title}</h3>
      <div className="mt-4 grid gap-4">
        {items.map((it, i) => {
          const given = answers[i];
          const answered = given !== undefined;
          return (
            <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-4">
              <p className="text-lg font-semibold">{it.text}</p>
              {it.ref && <p className="mt-1 text-sm text-slate-500">Referencia: {it.ref}</p>}
              <div className="mt-3 flex gap-3">
                <Button
                  size="lg"
                  variant={given === true ? "primary" : "outline"}
                  isDisabled={answered}
                  onClick={() => answer(i, true)}
                >
                  Verdadero
                </Button>
                <Button
                  size="lg"
                  variant={given === false ? "primary" : "outline"}
                  isDisabled={answered}
                  onClick={() => answer(i, false)}
                >
                  Falso
                </Button>
              </div>
              {answered && (
                <p
                  className={`mt-3 flex items-center gap-2 font-semibold ${given === it.answer ? "text-emerald-700" : "text-red-700"}`}
                >
                  {given === it.answer ? <Check size={18} /> : <X size={18} />}
                  {given === it.answer
                    ? "Correcto."
                    : `La respuesta correcta es: ${it.answer ? "Verdadero" : "Falso"}.`}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {allDone && (
        <FeedbackBox
          ok={correct === items.length}
          text={`Respondiste correctamente ${correct} de ${items.length}.`}
          onContinue={() => onComplete(correct, items.length)}
        />
      )}
    </Card>
  );
}

export function OrderGame({ activity, onComplete }) {
  const [items, setItems] = useState(() => shuffle(activity.items));
  const [checked, setChecked] = useState(false);

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };

  const correctCount = items.filter((it, i) => activity.answer.indexOf(activity.items.indexOf(it)) === i).length;
  const isPerfect = items.every((it, i) => activity.answer[i] === activity.items.indexOf(it));

  return (
    <Card className="p-5">
      <h3 className="text-lg font-extrabold">{activity.title}</h3>
      <p className="mt-2 text-lg">{activity.prompt}</p>
      <p className="mt-1 text-sm text-slate-500">Usa las flechas para colocar cada elemento en su lugar.</p>
      <ul className="mt-4 grid gap-2">
        {items.map((it, i) => (
          <li
            key={it}
            className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-3 py-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-faith-100 font-extrabold text-faith-700">
              {i + 1}
            </span>
            <span className="flex-1 text-lg font-semibold">{it}</span>
            <span className="flex gap-1">
              <Button size="sm" variant="ghost" isIconOnly isDisabled={checked || i === 0} onClick={() => move(i, -1)} aria-label="Subir">
                <ArrowUp size={18} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                isIconOnly
                isDisabled={checked || i === items.length - 1}
                onClick={() => move(i, 1)}
                aria-label="Bajar"
              >
                <ArrowDown size={18} />
              </Button>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-3">
        <Button size="lg" variant="primary" isDisabled={checked} onClick={() => setChecked(true)}>
          Comprobar orden
        </Button>
        {!checked && (
          <Button size="lg" variant="ghost" isIconOnly onClick={() => setItems(shuffle(activity.items))} aria-label="Mezclar">
            <RotateCcw size={20} />
          </Button>
        )}
      </div>
      {checked && (
        <FeedbackBox
          ok={isPerfect}
          text={isPerfect ? "¡Orden perfecto! Este es el orden correcto." : `Colocaste ${correctCount} de ${items.length} en su lugar correcto. Puedes repasar y volver a intentarlo.`}
          onContinue={() => onComplete(correctCount, items.length)}
        />
      )}
    </Card>
  );
}

export function MatchGame({ activity, onComplete }) {
  const rights = useMemo(() => shuffle(activity.pairs.map((p) => p.right)), []);
  const [selLeft, setSelLeft] = useState(null);
  const [pairs, setPairs] = useState({});
  const [checked, setChecked] = useState(false);

  const pick = (left) => {
    if (checked || pairs[left]) return;
    setSelLeft(left);
  };
  const pickRight = (right) => {
    if (checked || selLeft === null) return;
    const already = Object.entries(pairs).find(([, r]) => r === right);
    if (already) return;
    setPairs({ ...pairs, [selLeft]: right });
    setSelLeft(null);
  };

  const correct = activity.pairs.filter((p) => pairs[p.left] === p.right).length;

  return (
    <Card className="p-5">
      <h3 className="flex items-center gap-2 text-lg font-extrabold">
        <Link2 size={20} /> {activity.title}
      </h3>
      <p className="mt-2 text-lg">{activity.prompt}</p>
      <p className="mt-1 text-sm text-slate-500">Toca una idea de la izquierda y luego su pareja de la derecha.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          {activity.pairs.map((p) => {
            const matched = !!pairs[p.left];
            return (
              <button
                key={p.left}
                disabled={checked || matched}
                onClick={() => pick(p.left)}
                className={`game-option rounded-2xl border-2 px-4 py-3 text-left text-lg font-semibold ${
                  matched
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                    : selLeft === p.left
                      ? "border-faith-500 bg-faith-50"
                      : "border-slate-200 bg-white hover:border-faith-500"
                }`}
              >
                {p.left}
              </button>
            );
          })}
        </div>
        <div className="grid gap-2">
          {rights.map((r) => {
            const used = Object.values(pairs).includes(r);
            return (
              <button
                key={r}
                disabled={checked || used}
                onClick={() => pickRight(r)}
                className={`game-option rounded-2xl border-2 px-4 py-3 text-left text-lg font-semibold ${
                  used ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white hover:border-faith-500"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <Button size="lg" variant="primary" isDisabled={checked || Object.keys(pairs).length < activity.pairs.length} onClick={() => setChecked(true)}>
          Comprobar parejas
        </Button>
      </div>
      {checked && (
        <FeedbackBox
          ok={correct === activity.pairs.length}
          text={`Emparejaste correctamente ${correct} de ${activity.pairs.length}.`}
          onContinue={() => onComplete(correct, activity.pairs.length)}
        />
      )}
    </Card>
  );
}

export function FillGame({ activity, onComplete }) {
  const [answers, setAnswers] = useState({});
  const allDone = Object.keys(answers).length === activity.sentences.length;
  const correct = activity.sentences.filter((s, i) => answers[i] === s.answer).length;

  return (
    <Card className="p-5">
      <h3 className="text-lg font-extrabold">{activity.title}</h3>
      <div className="mt-4 grid gap-5">
        {activity.sentences.map((s, i) => (
          <div key={i}>
            <p className="text-lg font-semibold">
              {s.text.split("______")[0]}
              <span
                className={`mx-1 inline-block min-w-28 rounded-lg border-2 px-3 py-0.5 text-center ${
                  answers[i] === undefined
                    ? "border-dashed border-slate-300 text-slate-400"
                    : answers[i] === s.answer
                      ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                      : "border-red-300 bg-red-50 text-red-800"
                }`}
              >
                {answers[i] === undefined ? "..." : s.bank[answers[i]]}
              </span>
              {s.text.split("______")[1]}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {s.bank.map((word, w) => (
                <button
                  key={w}
                  disabled={answers[i] !== undefined}
                  onClick={() => setAnswers({ ...answers, [i]: w })}
                  className="game-option rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-base font-semibold hover:border-faith-500 hover:bg-faith-50"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {allDone && (
        <FeedbackBox
          ok={correct === activity.sentences.length}
          text={`Completaste correctamente ${correct} de ${activity.sentences.length} frases.`}
          onContinue={() => onComplete(correct, activity.sentences.length)}
        />
      )}
    </Card>
  );
}

export function MemoryGame({ activity, onComplete }) {
  const cards = useMemo(() => {
    const defs = activity.pairs.map((p, i) => ({ id: `r${i}`, pair: i, text: p.right, kind: "right" }));
    const terms = activity.pairs.map((p, i) => ({ id: `l${i}`, pair: i, text: p.left, kind: "left" }));
    return shuffle([...defs, ...terms]);
  }, [activity]);

  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [failed, setFailed] = useState(0);

  const click = (card) => {
    if (open.length === 2 || open.includes(card.id) || matched.includes(card.pair)) return;
    const next = [...open, card.id];
    setOpen(next);
    if (next.length === 2) {
      const [a, b] = next.map((id) => cards.find((c) => c.id === id));
      if (a.pair === b.pair && a.kind !== b.kind) {
        const nm = [...matched, a.pair];
        setMatched(nm);
        setOpen([]);
        if (nm.length === activity.pairs.length) {
          const score = failed === 0 ? activity.pairs.length : Math.max(1, activity.pairs.length - failed);
          setTimeout(() => onComplete(score, activity.pairs.length), 600);
        }
      } else {
        setFailed((f) => f + 1);
        setTimeout(() => setOpen([]), 800);
      }
    }
  };

  const done = matched.length === activity.pairs.length;

  return (
    <Card className="p-5">
      <h3 className="text-lg font-extrabold">{activity.title}</h3>
      <p className="mt-2 text-lg">{activity.prompt}</p>
      <p className="mt-1 text-sm text-slate-500">
        Parejas encontradas: {matched.length} de {activity.pairs.length}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => {
          const isOpen = open.includes(card.id) || matched.includes(card.pair);
          return (
            <button
              key={card.id}
              onClick={() => click(card)}
              disabled={done || matched.includes(card.pair)}
              className={`game-option min-h-24 rounded-2xl border-2 px-3 py-4 text-base font-bold ${
                matched.includes(card.pair)
                  ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                  : isOpen
                    ? "border-faith-500 bg-faith-50 text-faith-900"
                    : "border-slate-200 bg-white text-transparent hover:border-faith-500"
              }`}
            >
              {isOpen ? card.text : "?"}
            </button>
          );
        })}
      </div>
      {done && (
        <FeedbackBox
          ok={failed === 0}
          text={
            failed === 0
              ? "¡Memoria perfecta! Encontraste todas las parejas sin fallos."
              : `Encontraste todas las parejas con ${failed} intento(s) extra. ¡Buen trabajo!`
          }
        />
      )}
    </Card>
  );
}

export function GameHost({ activity, onComplete }) {
  switch (activity.type) {
    case "choice":
      return <ChoiceGame activity={activity} onComplete={onComplete} />;
    case "tf":
      return <TfGame activity={activity} onComplete={onComplete} />;
    case "order":
      return <OrderGame activity={activity} onComplete={onComplete} />;
    case "match":
      return <MatchGame activity={activity} onComplete={onComplete} />;
    case "fill":
      return <FillGame activity={activity} onComplete={onComplete} />;
    case "memory":
      return <MemoryGame activity={activity} onComplete={onComplete} />;
    default:
      return <Card className="p-5">Tipo de actividad no reconocido.</Card>;
  }
}
