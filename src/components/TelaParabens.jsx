import Botao from "./Botao";

/** Exibida ao concluir um item (tirinha, charge ou meme). */
export default function TelaParabens({ titulo, tipo, ultimo, aoContinuar }) {
  return (
    <section className="mt-8 flex flex-col items-center rounded-2xl border border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
      <span className="animate-bounce text-6xl" aria-hidden="true">🎉</span>
      <h2 className="mt-4 text-2xl font-bold">Parabéns!</h2>
      <p className="mt-2 opacity-80">
        Você concluiu {tipo.artigo} {tipo.rotulo.toLowerCase()} “{titulo}”.
      </p>
      <Botao onClick={aoContinuar}>{ultimo ? "Finalizar" : "Continuar"}</Botao>
    </section>
  );
}