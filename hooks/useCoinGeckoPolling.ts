import { useEffect, useState } from "react";
import { fetcher } from "@/lib/coingecko.actions";

type PriceData = {
  usd: number;
  usd_24h_change: number;
};
type SimplePriceResponse = {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
};


export function useCoinGeckoPolling(
  coinId: string,
  intervalMs = 15000
) {
  const [price, setPrice] = useState<PriceData | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    async function fetchPrice() {
      try {
        const data = await fetcher<SimplePriceResponse>(`/simple/price`, {
          ids: coinId,
          vs_currencies: "usd",
          include_24hr_change: "true",
        });

        setPrice(data[coinId]); // ✅ Now TS knows coinId exists in SimplePriceResponse
      } catch (err) {
        console.error("Error fetching coin price:", err);
      }
    }

    fetchPrice();
    timer = setInterval(fetchPrice, intervalMs);

    return () => clearInterval(timer);
  }, [coinId, intervalMs]);

  return price;
}
