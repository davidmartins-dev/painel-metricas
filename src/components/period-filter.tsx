"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PeriodFilterProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

export function PeriodFilter({ period, onPeriodChange }: PeriodFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado local para armazenar a seleção antes de aplicar
  const [localPeriod, setLocalPeriod] = useState(period.startsWith("custom_") ? "custom" : period);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleApply = () => {
    if (localPeriod === "custom") {
      if (dateFrom && dateTo) {
        onPeriodChange(`custom_${dateFrom}_${dateTo}`);
      } else {
        alert("Preencha as duas datas para o período personalizado.");
        return;
      }
    } else {
      onPeriodChange(localPeriod);
    }
    setIsOpen(false);
  };

  const getLabel = () => {
    if (period.startsWith("custom_")) {
      const [, from, to] = period.split("_");
      // Formatação básica para mostrar dd/mm/yyyy se a data vier do input HTML
      const formatDate = (d: string) => d.split("-").reverse().join("/");
      return `${formatDate(from)} até ${formatDate(to)}`;
    }
    switch (period) {
      case "all": return "Todo o período";
      case "7d": return "Últimos 7 dias";
      case "30d": return "Últimos 30 dias";
      case "90d": return "Últimos 90 dias";
      case "120d": return "Últimos 120 dias";
      default: return "Todo o período";
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="outline" className="w-fit flex items-center gap-2 shadow-sm font-medium" />
        }
      >
        <Calendar className="h-4 w-4 text-indigo-600" />
        <span>{getLabel()}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Selecione o Período</AlertDialogTitle>
          <AlertDialogDescription>
            Escolha o intervalo de tempo para analisar o faturamento e volume de vendas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 py-4">
          <Button variant={localPeriod === 'all' ? 'default' : 'outline'} onClick={() => setLocalPeriod('all')} className={`justify-start ${localPeriod === 'all' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>Todo o período</Button>
          <Button variant={localPeriod === '7d' ? 'default' : 'outline'} onClick={() => setLocalPeriod('7d')} className={`justify-start ${localPeriod === '7d' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>Últimos 7 dias</Button>
          <Button variant={localPeriod === '30d' ? 'default' : 'outline'} onClick={() => setLocalPeriod('30d')} className={`justify-start ${localPeriod === '30d' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>Últimos 30 dias</Button>
          <Button variant={localPeriod === '90d' ? 'default' : 'outline'} onClick={() => setLocalPeriod('90d')} className={`justify-start ${localPeriod === '90d' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>Últimos 90 dias</Button>
          <Button variant={localPeriod === '120d' ? 'default' : 'outline'} onClick={() => setLocalPeriod('120d')} className={`justify-start ${localPeriod === '120d' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>Últimos 120 dias</Button>
          <Button variant={localPeriod === 'custom' ? 'default' : 'outline'} onClick={() => setLocalPeriod('custom')} className={`justify-start ${localPeriod === 'custom' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>Personalizado...</Button>
          
          {localPeriod === 'custom' && (
            <div className="flex gap-2 items-center mt-2 p-3 border rounded-md bg-slate-50 animate-in fade-in zoom-in-95">
              <div className="flex-1">
                <label className="text-xs text-slate-500 mb-1 block font-medium">De:</label>
                <input 
                  type="date" 
                  className="w-full border rounded-md p-1.5 text-sm outline-none focus:border-indigo-600" 
                  value={dateFrom} 
                  onChange={e => setDateFrom(e.target.value)} 
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-500 mb-1 block font-medium">Até:</label>
                <input 
                  type="date" 
                  className="w-full border rounded-md p-1.5 text-sm outline-none focus:border-indigo-600" 
                  value={dateTo} 
                  onChange={e => setDateTo(e.target.value)} 
                />
              </div>
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setLocalPeriod(period.startsWith("custom_") ? "custom" : period)}>Cancelar</AlertDialogCancel>
          <Button onClick={handleApply} className="bg-indigo-600 hover:bg-indigo-700">Aplicar Filtro</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
