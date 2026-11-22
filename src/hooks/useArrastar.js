import { useEffect, useRef, useState } from "react";

/**
 * Arrastar com mouse e toque (Pointer Events).
 * - aoSoltar(id, destino): destino vem do atributo data-drop do elemento sob o dedo.
 * - aoTocar(id): chamado quando houve só um toque, sem movimento.
 * Retorna [drag, iniciar]; drag = { id, x, y, moveu } enquanto arrasta.
 */
export function useArrastar(aoSoltar, aoTocar) {
  const [drag, setDrag] = useState(null);
  const cb = useRef({});
  cb.current = { aoSoltar, aoTocar };
  const ativo = !!drag;

  useEffect(() => {
    if (!ativo) return;
    const mover = (e) =>
      setDrag((d) => d && {
        ...d, x: e.clientX, y: e.clientY,
        moveu: d.moveu || Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 8,
      });
    const soltar = (e) =>
      setDrag((d) => {
        if (d) {
          if (!d.moveu) cb.current.aoTocar(d.id);
          else {
            const alvo = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-drop]");
            cb.current.aoSoltar(d.id, alvo?.dataset.drop);
          }
        }
        return null;
      });
    const cancelar = () => setDrag(null);

    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", cancelar);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", cancelar);
    };
  }, [ativo]);

  const iniciar = (e, id) =>
    setDrag({ id, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moveu: false });

  return [drag, iniciar];
}
