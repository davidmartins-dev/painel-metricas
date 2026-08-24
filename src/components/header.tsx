export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-8 shadow-sm">
      <div className="font-black text-xl tracking-tight text-slate-900">
        GRUPO <span className="text-indigo-600">DTC</span>
      </div>
      <div className="ml-auto text-sm font-medium text-slate-500">
        Painel Gerencial
      </div>
    </header>
  );
}
