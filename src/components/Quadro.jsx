import { urlImagem } from "../lib/imagens";

/** Um quadro da tirinha (imagem; se não houver, mostra o texto). */
export default function Quadro({ quadro, selecionado = false, arrastavel = false, className = "", ...rest }) {
  const src = quadro.imagem && urlImagem(quadro.imagem);
  return (
    <div
      className={[
        "min-w-28 flex-1 select-none rounded-lg border border-slate-300 bg-white p-1.5 text-sm",
        "dark:border-slate-700 dark:bg-slate-800",
        arrastavel ? "cursor-grab touch-none" : "cursor-default",
        selecionado ? "ring-4 ring-indigo-500" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {src ? (
        <img src={src} alt={quadro.texto || ""} draggable={false} className="pointer-events-none block w-full rounded-md" />
      ) : (
        <span>{quadro.texto}</span>
      )}
    </div>
  );
}
