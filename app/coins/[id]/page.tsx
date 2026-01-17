import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import LiveDataWrapper from "@/app/components/LiveDataWrapper";
import Converter from "@/app/components/Converter";

const Page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  const coinData = await fetcher<CoinDetailsData>(`/coins/${id}`, {
    localization: false,
    tickers: false,
    market_data: true,
    sparkline: false,
  });

  const coinOHLCData = await fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
    vs_currency: "usd",
    days: 1,
  });

  const coinTickers = await fetcher<CoinTickersResponse>(
    `/coins/${id}/tickers`
  );

  const topTickers = coinTickers.tickers
    .filter((t) => t.trust_score !== "red")
    .slice(0, 10);

  return (
    <main id="coin-details-page">
      <section className="primary">
        <LiveDataWrapper
          coinId={id}
          coin={coinData}
          coinOHLCData={coinOHLCData}
          tickers={topTickers}
        />
      </section>

      <section className="secondary">
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        />

        <div className="details">
          <h4>Coin Details</h4>

          <ul className="details-grid">
            <li>
              <p>Market Cap</p>
              <p>{formatCurrency(coinData.market_data.market_cap.usd)}</p>
            </li>
            <li>
              <p>Market Cap Rank</p>
              <p>#{coinData.market_cap_rank}</p>
            </li>
            <li>
              <p>Total Volume</p>
              <p>{formatCurrency(coinData.market_data.total_volume.usd)}</p>
            </li>
            <li>
              <p>Website</p>
              {coinData.links.homepage[0] ? (
                <Link                   className="link"
  href={coinData.links.homepage[0]} target="_blank">
                  HomePage <ArrowUpRight size={16} />
                </Link>
              ) : (
                <p>-</p>
              )}
            </li>
            <li>
              <p>Explorer</p>
              {coinData.links.blockchain_site[0] ? (
                <Link                    className="link"
 href={coinData.links.blockchain_site[0]} target="_blank">
                  Explorer
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <p>-</p>
              )}
            </li>
            <li>
              <p>Community</p>
              {coinData.links.subreddit_url ? (
                <Link                   className="link"
  href={coinData.links.subreddit_url} target="_blank">
                  Subreddit
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <p>-</p>
              )}
            </li>
            <li>
              <p>Twitter</p>
              {coinData.links.twitter_screen_name ? (
                <Link
                
                  href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                  target="_blank"
                  className="link"
                >
                  @{coinData.links.twitter_screen_name}
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <p>-</p>
              )}
            </li>
            <li>
              <p>GitHub</p>
              {coinData.links.repos_url?.github?.length ? (
                <Link                    className="link"
 href={coinData.links.repos_url.github[0]} target="_blank">
                  Repository
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <p>-</p>
              )}
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Page;
