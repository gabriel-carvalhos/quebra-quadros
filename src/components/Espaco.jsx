const estados = {
  certo: "border-solid border-green-600",
  erro: "border-solid border-red-600 bg-red-500/10",
  neutro: "border-dashed border-slate-300 dark:border-slate-600",
};

/** Espaço numerado onde o quadro é solto. */
export default function Espaco({ indice, estado = "neutro", onClick, children }) {
  return (
    <div
      data-drop={`slot-${indice}`}
      onClick={onClick}
      className={`relative flex min-h-32 rounded-xl border-2 p-1 ${estados[estado]}`}
    >
      <b className="absolute left-1.5 top-0.5 text-xs opacity-50">{indice + 1}</b>
      {children}
    </div>
  );
}
