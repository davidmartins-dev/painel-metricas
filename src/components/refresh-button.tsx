"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface RefreshButtonProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export function RefreshButton({ onRefresh, isLoading }: RefreshButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onRefresh}
      disabled={isLoading}
      title="Atualizar dados"
      className="shrink-0 shadow-sm"
    >
      <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
    </Button>
  );
}
