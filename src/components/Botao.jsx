const variantes = {
  primario: "w-full mt-3 border-0 bg-indigo-600 font-semibold text-white hover:bg-indigo-500 dark:bg-indigo-500",
  opcao: "border border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700",
  certo: "border-0 bg-green-600 text-white",
  erro: "border-0 bg-red-600 text-white",
};

export default function Botao({ variante = "primario", className = "", ...props }) {
  return (
    <button
      className={`min-h-11 cursor-pointer rounded-lg px-3 py-2.5 disabled:opacity-40 ${variantes[variante]} ${className}`}
      {...props}
    />
  );
}
