/** Embaralha a lista e garante que ela nunca volte igual à original. */
export function embaralhar(lista) {
  const a = [...lista];
  do {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } while (a.length > 1 && a.every((v, i) => v === lista[i]));
  return a;
}
