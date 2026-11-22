import { useState } from "react";
import { trilhas } from "./lib/trilhas";
import { validarDados } from "./lib/validarDados";
import TelaTrilhas from "./components/TelaTrilhas";
import Jogo from "./components/Jogo";

if (import.meta.env.DEV) validarDados(trilhas);

export default function App() {
  const [trilha, setTrilha] = useState(null); // null = tela de seleção

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <main className="mx-auto max-w-2xl p-3">
        {trilha ? (
          <Jogo key={trilha.id} trilha={trilha} aoSair={() => setTrilha(null)} />
        ) : (
          <TelaTrilhas trilhas={trilhas} aoEscolher={setTrilha} />
        )}
      </main>
    </div>
  );
}