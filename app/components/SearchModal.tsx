"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchCoin = {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
};

export default function CoinSearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchCoin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetcher<{ coins: SearchCoin[] }>("/search", {
          query,
        });

        setResults(data.coins.slice(0, 6));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-[280px]">
      {/* Input with icon */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
        />
        <Input
          placeholder="Search coins..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Dropdown */}
      {(loading || results.length > 0) && (
        <ul className="absolute z-50 mt-2 w-full rounded-md border bg-background shadow">
          {loading && (
            <li className="px-3 py-2 text-sm opacity-60">
              Searching…
            </li>
          )}

          {!loading &&
            results.map((coin) => (
              <li
                key={coin.id}
                onClick={() => {
                  router.push(`/coins/${coin.id}`);
                  setQuery("");
                  setResults([]);
                }}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-muted"
              >
                <Image
                  src={coin.thumb}
                  alt={coin.name}
                  width={18}
                  height={18}
                />
                <span>{coin.name}</span>
                <span className="ml-auto text-xs opacity-60">
                  {coin.symbol.toUpperCase()}
                </span>
              </li>
            ))}

          {!loading && query && results.length === 0 && (
            <li className="px-3 py-2 text-sm opacity-60">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
