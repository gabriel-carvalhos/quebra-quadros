import { useState } from "react";
import { embaralhar } from "../lib/embaralhar";
import Quadro from "./Quadro";
import Mensagem from "./Mensagem";
import Botao from "./Botao";

/** Uma pergunta de múltipla escolha. Reinicia sozinha quando a `key` muda. */
function Pergunta({ pergunta, ultima, aoAvancar }) {
  const [resposta, setResposta] = useState(null);
  // as opções são embaralhadas, a menos que a pergunta peça "ordemFixa": true
  const [opcoes] = useState(() => (pergunta.ordemFixa ? pergunta.opcoes : embaralhar(pergunta.opcoes)));
  const acertou = resposta === pergunta.correta;

  return (
    <>
      <p className="mt-3 font-medium">{pergunta.enunciado}</p>

      <div className="mt-3 grid gap-2">
        {opcoes.map((o) => (
          <Botao
            key={o}
            variante={resposta === o ? (o === pergunta.correta ? "certo" : "erro") : "opcao"}
            disabled={acertou}
            onClick={() => setResposta(o)}
          >
            {o}
          </Botao>
        ))}
      </div>

      {resposta && !acertou && <Mensagem tipo="ruim">❌ Não foi esse. Tente outra opção.</Mensagem>}
      {acertou && (
        <>
          <Mensagem tipo="bom">✅ Correto! {pergunta.explicacao}</Mensagem>
          <Botao onClick={aoAvancar}>{ultima ? "Concluir" : "Próxima pergunta"}</Botao>
        </>
      )}
    </>
  );
}

/** Perguntas do item (tirinha, charge ou meme), uma de cada vez. */
export default function EtapaPergunta({ quadros, perguntas, aoProxima }) {
  const [n, setN] = useState(0);
  const ultima = n === perguntas.length - 1;
  const unico = quadros.length === 1; // charge/meme: imagem única, centralizada

  return (
    <>
      <div className={`flex gap-1.5 overflow-x-auto ${unico ? "justify-center" : ""}`}>
        {quadros.map((q, i) => <Quadro key={i} quadro={q} className={unico ? "max-w-md" : ""} />)}
      </div>

      {perguntas.length > 1 && (
        <p className="mt-3 text-sm opacity-60">Pergunta {n + 1} de {perguntas.length}</p>
      )}

      <Pergunta
        key={n}
        pergunta={perguntas[n]}
        ultima={ultima}
        aoAvancar={() => (ultima ? aoProxima() : setN(n + 1))}
      />
    </>
  );
}