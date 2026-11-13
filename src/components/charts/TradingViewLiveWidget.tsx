'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewLiveWidgetProps {
  symbol: string;
  interval?: string;
  theme?: 'dark' | 'light';
  height?: number;
  locale?: 'id' | 'en';
}

function normalizeTradingViewSymbol(raw: string): string {
  const clean = (raw || 'OANDA:XAUUSD').trim().toUpperCase();
  const map: Record<string, string> = {
    XAUUSD: 'OANDA:XAUUSD',
    XAUUSDC: 'OANDA:XAUUSD',
    XAGUSD: 'OANDA:XAGUSD',
    XAGUSDC: 'OANDA:XAGUSD',
    EURUSD: 'FX:EURUSD',
    EURUSDC: 'FX:EURUSD',
    GBPUSD: 'FX:GBPUSD',
    GBPUSDC: 'FX:GBPUSD',
    USDJPY: 'FX:USDJPY',
    USDJPYC: 'FX:USDJPY',
    GBPJPY: 'FX:GBPJPY',
    GBPJPYC: 'FX:GBPJPY',
    AUDUSD: 'FX:AUDUSD',
    USDCAD: 'FX:USDCAD',
    USTEC: 'OANDA:NAS100USD',
    USTECC: 'OANDA:NAS100USD',
    NAS100: 'OANDA:NAS100USD',
    'NASDAQ:NDX': 'OANDA:NAS100USD',
    'USTEC / NAS100': 'OANDA:NAS100USD',
    US30: 'OANDA:US30USD',
    US30C: 'OANDA:US30USD',
    'DJ:DJI': 'OANDA:US30USD',
    'US30 / DJ30': 'OANDA:US30USD',
    SPX500: 'OANDA:SPX500USD',
    BTCUSDT: 'BINANCE:BTCUSDT',
    BTCUSD: 'BINANCE:BTCUSDT',
    'BITSTAMP:BTCUSD': 'BINANCE:BTCUSDT',
    ETHUSDT: 'BINANCE:ETHUSDT',
    ETHUSD: 'BINANCE:ETHUSDT',
    'BITSTAMP:ETHUSD': 'BINANCE:ETHUSDT',
    SOLUSDT: 'BINANCE:SOLUSDT',
    SOLUSD: 'BINANCE:SOLUSDT',
    PAXGUSDT: 'BINANCE:PAXGUSDT',
  };
  return map[clean] ?? (clean.includes(':') ? clean : `OANDA:${clean}`);
}

export function TradingViewLiveWidget({
  symbol,
  interval = '15',
  theme = 'dark',
  height = 600,
  locale = 'id',
}: TradingViewLiveWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resolvedSymbol = normalizeTradingViewSymbol(symbol);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.width = '100%';
    widgetContainer.style.height = `${height}px`;
    container.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.text = JSON.stringify({
      autosize: false,
      width: '100%',
      height,
      symbol: resolvedSymbol,
      interval,
      timezone: 'Asia/Jakarta',
      theme,
      style: '1',
      locale: locale === 'id' ? 'id' : 'en',
      allow_symbol_change: true,
      calendar: false,
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      withdateranges: true,
      support_host: 'https://www.tradingview.com',
    });

    container.appendChild(script);

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [resolvedSymbol, interval, theme, height, locale]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container w-full rounded-xl overflow-hidden border border-[#D6A937]/35 bg-[#131722]"
      style={{ height: `${height}px`, minHeight: `${height}px`, width: '100%' }}
    />
  );
}
