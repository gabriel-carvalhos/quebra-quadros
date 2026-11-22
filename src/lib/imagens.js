// Todas as imagens de src/assets/tirinhas/ (Vite). O JSON guarda só o nome do arquivo.
const arquivos = import.meta.glob("../assets/tirinhas/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export const urlImagem = (nome) => arquivos[`../assets/tirinhas/${nome}`];