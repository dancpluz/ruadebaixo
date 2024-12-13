'use client';

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { useUser } from '@/app/Context';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function Pix() {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { loading, pix, paymentStatus } = useUser((state) => state);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value);
      setIsCopied(true);
      toast({
        title: "Copiado",
        description: "O código pix foi copiado para sua área de transferência",
      });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 items-center">
      <div className="aspect-square text-center size-48 border">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : pix.encodedImage === '' ? (
          paymentStatus === 'RECEIVED' || paymentStatus === 'CONFIRMED' ? (
            <span className="flex h-full w-full justify-center items-center uppercase">
              Pagamento confirmado!
            </span>
          ) : (
            <span className="flex h-full w-full justify-center items-center uppercase">
              Gere o pix
            </span>
          )
        ) : (
          <Image
            src={`data:image/png;base64,${pix.encodedImage}`}
            className="h-full w-full"
            alt="PIX QR CODE"
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="flex gap-2 w-full items-center">
        <Input
          ref={inputRef}
          type="text"
          value={pix.payload}
          readOnly
          onClick={handleClick}
          className="uppercase grow cursor-text"
        />
        <Button
          type="button"
          onClick={handleCopy}
          className="px-3"
          variant="outline"
          aria-label="Copy to clipboard"
        >
          <Copy className="size-4" />
        </Button>
      </div>
    </div>
  );
}
