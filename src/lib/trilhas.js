// Carrega automaticamente todos os arquivos de src/trilhas/*.json.
// A ordem na tela de seleção segue a ordem alfabética do nome do arquivo
// (use prefixos: 01-..., 02-...).
const arquivos = import.meta.glob("../trilhas/*.json", { eager: true, import: "default" });

/**
 * Padroniza cada item:
 * - tirinha: usa "quadros" (lista) e o jogador precisa ordená-los;
 * - charge/meme: basta "imagem" (e "texto"), vira uma lista com 1 quadro e não tem ordenação.
 */
const normalizarItem = (item) => ({
  ...item,
  tipo: item.tipo ?? "tirinha",
  quadros: item.quadros ?? [{ imagem: item.imagem, texto: item.texto }],
});

export const trilhas = Object.entries(arquivos)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, trilha]) => ({
    ...trilha,
    // "tirinhas" continua aceito para arquivos criados antes dos novos tipos
    itens: (trilha.itens ?? trilha.tirinhas ?? []).map(normalizarItem),
  }));