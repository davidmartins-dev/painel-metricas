import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-8 shadow-sm">
      <div className="font-black text-xl tracking-tight text-foreground">
        GRUPO <span className="text-indigo-600">DTC</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
          Painel Gerencial
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
