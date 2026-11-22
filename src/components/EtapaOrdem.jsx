import { useState } from "react";
import { useArrastar } from "../hooks/useArrastar";
import { embaralhar } from "../lib/embaralhar";
import Quadro from "./Quadro";
import Espaco from "./Espaco";
import Mensagem from "./Mensagem";
import Botao from "./Botao";

/** Etapa 1: ordenar os quadros arrastando-os para os espaços. */
export default function EtapaOrdem({ quadros, aoAcertar }) {
  const [reserva] = useState(() => embaralhar(quadros.map((q) => q.id)));
  const [espacos, setEspacos] = useState(() => quadros.map(() => null));
  const [selecionado, setSelecionado] = useState(null);
  const [resultado, setResultado] = useState(null); // { erros: Set, ok: boolean }

  const naReserva = reserva.filter((id) => !espacos.includes(id));

  const colocar = (id, destino) => {
    if (!destino) return;
    setResultado(null);
    setEspacos((prev) => {
      const e = [...prev];
      const origem = e.indexOf(id);
      if (destino === "reserva") { if (origem >= 0) e[origem] = null; return e; }
      const i = +destino.slice(5);
      const ocupante = e[i];
      if (origem === i) return e;
      e[i] = id;
      if (origem >= 0) e[origem] = ocupante; // troca de lugar
      return e;
    });
  };

  const [drag, iniciarDrag] = useArrastar(colocar, (id) => setSelecionado((s) => (s === id ? null : id)));

  const colocarSelecionado = (destino) => {
    if (selecionado === null) return;
    colocar(selecionado, destino);
    setSelecionado(null);
  };

  const verificar = () => {
    const erros = new Set();
    espacos.forEach((id, i) => { if (id !== i) erros.add(i); });
    setResultado({ erros, ok: erros.size === 0 });
  };

  const cartao = (id) => (
    <Quadro
      key={id}
      quadro={quadros[id]}
      arrastavel
      selecionado={selecionado === id}
      onPointerDown={(e) => iniciarDrag(e, id)}
    />
  );

  return (
    <>
      <p className="opacity-80">Arraste (ou toque) os quadros para montar a história na ordem certa.</p>

      <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
        {espacos.map((id, i) => (
          <Espaco
            key={i}
            indice={i}
            estado={resultado ? (resultado.erros.has(i) ? "erro" : "certo") : "neutro"}
            onClick={() => colocarSelecionado(`slot-${i}`)}
          >
            {id !== null && cartao(id)}
          </Espaco>
        ))}
      </div>

      <div
        data-drop="reserva"
        onClick={() => colocarSelecionado("reserva")}
        className="mt-4 flex min-h-36 flex-wrap gap-2 rounded-xl border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
      >
        {naReserva.length === 0 && <i className="m-auto opacity-60">Todos os quadros foram colocados</i>}
        {naReserva.map(cartao)}
      </div>

      {resultado && !resultado.ok && (
        <Mensagem tipo="ruim">
          ❌ A ordem não está correta. Os quadros em vermelho estão no lugar errado ({resultado.erros.size}). Tente de novo!
        </Mensagem>
      )}
      {resultado?.ok && <Mensagem tipo="bom">✅ Ordem correta! Agora identifique o recurso.</Mensagem>}

      {resultado?.ok ? (
        <Botao onClick={aoAcertar}>Continuar</Botao>
      ) : (
        <Botao disabled={espacos.some((e) => e === null)} onClick={verificar}>Verificar ordem</Botao>
      )}

      {drag?.moveu && (
        <div
          className="pointer-events-none fixed z-50 flex w-36 -translate-x-1/2 -translate-y-1/2 opacity-90 shadow-2xl"
          style={{ left: drag.x, top: drag.y }}
        >
          <Quadro quadro={quadros[drag.id]} />
        </div>
      )}
    </>
  );
}
