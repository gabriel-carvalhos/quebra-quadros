import { useMemo, useState } from "react";
import { TIPOS } from "../lib/tipos";
import EtapaOrdem from "./EtapaOrdem";
import EtapaPergunta from "./EtapaPergunta";
import TelaParabens from "./TelaParabens";
import TelaFim from "./TelaFim";

// etapas: 1 = ordenar (só tirinhas) | 2 = perguntas | 3 = parabéns | 4 = fim da trilha
const etapaInicial = (item) => (item.quadros.length > 1 ? 1 : 2); // charge/meme pulam a ordenação

export default function Jogo({ trilha, aoSair }) {
  const { itens } = trilha;
  const total = itens.length;
  const [indice, setIndice] = useState(0);
  const [rodada, setRodada] = useState(0); // força reiniciar as etapas ao trocar de item
  const [etapa, setEtapa] = useState(() => etapaInicial(itens[0]));

  const item = itens[indice];
  const tipo = TIPOS[item.tipo] ?? TIPOS.tirinha;
  const ehUltimo = indice === total - 1;
  // cada quadro recebe como id a sua posição correta (0, 1, 2...)
  const quadros = useMemo(() => item.quadros.map((q, i) => ({ ...q, id: i })), [item]);

  const avancar = () => {
    if (ehUltimo) return setEtapa(4);
    setIndice(indice + 1);
    setRodada((r) => r + 1);
    setEtapa(etapaInicial(itens[indice + 1]));
  };

  const reiniciar = () => {
    setIndice(0);
    setRodada((r) => r + 1);
    setEtapa(etapaInicial(itens[0]));
  };

  return (
    <>
      {etapa < 4 && (
        <header className="my-3">
          <button onClick={aoSair} className="min-h-11 cursor-pointer text-sm underline opacity-70">
            ← Trilhas
          </button>
          <p className="text-sm opacity-60">{trilha.titulo} · {indice + 1} de {total}</p>
          <h1 className="text-xl font-bold">{tipo.emoji} {item.titulo}</h1>
          {item.credito && <p className="mt-0.5 text-xs opacity-60">Crédito: {item.credito}</p>}
        </header>
      )}

      {etapa === 1 && <EtapaOrdem key={rodada} quadros={quadros} aoAcertar={() => setEtapa(2)} />}
      {etapa === 2 && (
        <EtapaPergunta
          key={rodada}
          quadros={quadros}
          perguntas={item.perguntas}
          aoProxima={() => setEtapa(3)}
        />
      )}
      {etapa === 3 && <TelaParabens titulo={item.titulo} tipo={tipo} ultimo={ehUltimo} aoContinuar={avancar} />}
      {etapa === 4 && <TelaFim trilha={trilha} aoReiniciar={reiniciar} aoEscolherTrilha={aoSair} />}
    </>
  );
}