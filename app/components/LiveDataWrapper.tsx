"use client";

import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useCoinGeckoPolling } from "@/hooks/useCoinGeckoPolling";
import CandlestickChart from "./CandlestickChart";
import DataTable from "./DataTable";
import CoinHeader from "./CoinHeader";

/* ================================
   Types (adjust imports if needed)
================================ */

type LiveDataProps = {
  coinId: string;
  coin: CoinDetailsData;
  coinOHLCData: OHLCData[];
  tickers: CoinTicker[];
};

/* ================================
   Component
================================ */

const LiveDataWrapper = ({
  coinId,
  coin,
  coinOHLCData,
  tickers,
}: LiveDataProps) => {
  // 🔁 "Live" price via polling (FREE)
  const livePrice = useCoinGeckoPolling(coinId, 15000);

  /* ================================
     Exchange Listings (FREE)
  ================================ */

  const exchangeColumns: DataTableColumn<CoinTicker>[] = [
    {
      header: "Exchange",
      cell: (t) => (
        <div className="flex items-center gap-2">
          {t.market.logo && (
            <img
              src={t.market.logo}
              alt={t.market.name}
              width={20}
              height={20}
            />
          )}
          <span>{t.market.name}</span>
        </div>
      ),
    },
    {
      header: "Pair",
      cell: (t) => `${t.base}/${t.target}`,
    },
    {
      header: "Price",
      cell: (t) => formatCurrency(t.last),
    },
    {
      header: "Volume",
      cell: (t) => formatCurrency(t.volume),
    },
    {
      header: "Type",
      cell: (t) =>
        t.market.identifier?.toLowerCase().includes("dex") ? "DEX" : "CEX",
    },
  ];

  return (
    <section id="live-data-wrapper">
      {/* =============================
          Coin Header
      ============================== */}
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={livePrice?.usd ?? coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          livePrice?.usd_24h_change ??
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />

      <Separator className="divider" />

      {/* =============================
          Candlestick Chart
      ============================== */}
      <div className="trend">
        <CandlestickChart
          coinId={coinId}
          data={coinOHLCData}
          mode="historical"
          initialPeriod="daily"
        >
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>

      <Separator className="divider" />

      {/* =============================
          Exchange Listings (FREE)
      ============================== */}
      <div className="exchanges">
        <h4>Exchange Listings</h4>

        <DataTable
          columns={exchangeColumns}
          data={tickers}
          rowKey={(t) => t.trade_url ?? `${t.market.identifier}-${t.base}`}
          tableClassName="exchange-table"
        />
      </div>
    </section>
  );
};

export default LiveDataWrapper;
