import React, { Suspense } from "react";
import CoinOverview from "./components/Home/CoinOverview";
import TrendingCoins from "./components/Home/TrendingCoins";
import {
  CategoriesFallback,
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "./components/Home/fallback";
import Categories from "./components/Home/Categories";

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
