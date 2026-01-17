"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ConverterProps = {
  symbol: string;
  icon: string;
  priceList: Record<string, number>;
};

const Converter = ({ symbol, icon, priceList }: ConverterProps) => {
  const availableCurrencies = Object.keys(priceList);

  const [currency, setCurrency] = useState(
    availableCurrencies.includes("usd") ? "usd" : availableCurrencies[0]
  );
  const [amount, setAmount] = useState("10");

  const price = priceList[currency] ?? 0;
  const convertedPrice = (parseFloat(amount) || 0) * price;

  return (
    <div id="converter">
      <h4>{symbol.toUpperCase()} Converter</h4>

      <div className="panel">
        <div className="input-wrapper">
          <Input
            type="number"
            min="0"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
          />

          <div className="coin-info">
            <Image src={icon} alt={symbol} width={20} height={20} />
            <p>{symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="divider">
          <div className="line" />
          <Image
            src={'/converter.svg'}
            alt="converter"
            width={32}
            height={32}
            className="icon"
          />
        </div>

        <div className="output-wrapper">
          <p>{formatCurrency(convertedPrice, 2, currency, false)}</p>

          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="select-trigger">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="select-content" data-converter>
              {availableCurrencies.map((currencyCode) => (
                <SelectItem key={currencyCode} value={currencyCode}>
                  {currencyCode.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Converter;
