import { urlImagem } from "./imagens";
import { TIPOS } from "./tipos";

/** Avisa no console (só em desenvolvimento) sobre erros comuns ao editar as trilhas. */
export function validarDados(trilhas) {
  const ids = new Set();
  if (!trilhas.length) console.warn("[trilhas] Nenhum arquivo encontrado em src/trilhas/*.json.");

  trilhas.forEach((trilha) => {
    const nome = `[trilha "${trilha.id ?? trilha.titulo}"]`;
    if (!trilha.id) console.warn(`${nome}: falta o campo "id".`);
    if (ids.has(trilha.id)) console.warn(`${nome}: "id" repetido entre trilhas.`);
    ids.add(trilha.id);
    if (!trilha.itens.length) console.warn(`${nome}: precisa de pelo menos 1 item.`);

    trilha.itens.forEach((item) => {
      const ctx = `${nome} ${item.tipo} "${item.id ?? item.titulo}"`;
      if (!TIPOS[item.tipo]) console.warn(`${ctx}: tipo desconhecido (use ${Object.keys(TIPOS).join(", ")}).`);
      if (item.tipo === "tirinha" && item.quadros.length < 2) console.warn(`${ctx}: a tirinha precisa de pelo menos 2 quadros.`);
      if (item.tipo !== "tirinha" && item.quadros.length !== 1) console.warn(`${ctx}: deve ter uma única imagem.`);
      item.quadros.forEach((q) => {
        if (!q.imagem && !q.texto) console.warn(`${ctx}: quadro sem "imagem" nem "texto".`);
        if (q.imagem && !urlImagem(q.imagem)) console.warn(`${ctx}: imagem não encontrada em assets/tirinhas: ${q.imagem}`);
      });
      if (!item.perguntas?.length) console.warn(`${ctx}: precisa de pelo menos 1 pergunta.`);
      item.perguntas?.forEach((p, i) => {
        if (!p.opcoes || p.opcoes.length < 2) console.warn(`${ctx}, pergunta ${i + 1}: precisa de pelo menos 2 opções.`);
        if (!p.opcoes?.includes(p.correta)) console.warn(`${ctx}, pergunta ${i + 1}: "correta" deve ser igual a uma das opções.`);
      });
    });
  });
}