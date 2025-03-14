'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInvitesProps {
  onSearch: (term: string) => void;
}

export default function SearchInvites({ onSearch }: SearchInvitesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Atraso na busca para evitar muitas atualizações enquanto o usuário digita
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Buscar pelo nome do convidado..."
        className="pl-10 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
} 