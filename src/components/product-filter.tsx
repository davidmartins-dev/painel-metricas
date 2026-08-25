"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProductFilterProps {
  search: string;
  onSearchChange: (search: string) => void;
  products: { value: string; label: string }[];
}

export function ProductFilter({ search, onSearchChange, products }: ProductFilterProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = products.find((p) => p.value === search)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-55 justify-between shadow-sm font-medium"
          />
        }
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Filter className="h-4 w-4 text-indigo-600 shrink-0" />
          <span className="truncate">
            {search ? selectedLabel : "Filtrar produto..."}
          </span>
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-55 p-0">
        <Command>
          <CommandInput placeholder="Buscar produto..." />
          <CommandList>
            <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value=""
                onSelect={() => {
                  onSearchChange("");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    search === "" ? "opacity-100" : "opacity-0"
                  )}
                />
                Todos os Produtos
              </CommandItem>
              {products.map((product) => (
                <CommandItem
                  key={product.value}
                  value={product.value}
                  onSelect={(currentValue) => {
                    onSearchChange(currentValue === search ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      search === product.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {product.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
