import Botao from "./Botao";

/** Exibida quando acabam as tirinhas da trilha. */
export default function TelaFim({ trilha, aoReiniciar, aoEscolherTrilha }) {
  const total = trilha.itens.length;
  return (
    <section className="mt-8 flex flex-col items-center rounded-2xl border border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
      <span className="text-6xl" aria-hidden="true">🏆</span>
      <h2 className="mt-4 text-2xl font-bold">Fim da trilha!</h2>
      <p className="mt-2 opacity-80">
        Você concluiu {total === 1 ? "o único item" : `os ${total} itens`} da trilha “{trilha.titulo}”.
      </p>
      <Botao onClick={aoEscolherTrilha}>Escolher outra trilha</Botao>
      <Botao variante="opcao" className="mt-2 w-full" onClick={aoReiniciar}>Jogar esta trilha novamente</Botao>
    </section>
  );
}