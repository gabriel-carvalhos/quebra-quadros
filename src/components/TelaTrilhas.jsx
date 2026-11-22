/** Tela inicial: o jogador escolhe a trilha que quer seguir. */
export default function TelaTrilhas({ trilhas, aoEscolher }) {
  return (
    <>
      <h1 className="my-3 text-2xl font-bold">Quebra-Quadros</h1>
      <p className="opacity-80">Escolha uma trilha para começar.</p>

      {trilhas.length === 0 && <p className="mt-6 text-center opacity-70">Nenhuma trilha disponível ainda.</p>}

      <div className="mt-4 grid gap-3">
        {trilhas.map((t) => (
          <button
            key={t.id}
            onClick={() => aoEscolher(t)}
            className="flex min-h-20 w-full cursor-pointer items-center gap-4 rounded-xl border border-slate-300 bg-white p-4 text-left hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="text-4xl" aria-hidden="true">{t.emoji ?? "📚"}</span>
            <span>
              <b className="block text-lg">{t.titulo}</b>
              {t.descricao && <span className="block text-sm opacity-70">{t.descricao}</span>}
              <small className="mt-1 block opacity-60">
                {t.itens.length} {t.itens.length === 1 ? "item" : "itens"}
              </small>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}