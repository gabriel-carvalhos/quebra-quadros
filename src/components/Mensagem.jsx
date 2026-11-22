const tipos = {
  bom: "bg-green-600/15 text-green-700 dark:text-green-400",
  ruim: "bg-red-600/15 text-red-700 dark:text-red-400",
};

export default function Mensagem({ tipo, children }) {
  return <p className={`mt-3 rounded-lg px-3 py-2.5 ${tipos[tipo]}`}>{children}</p>;
}
