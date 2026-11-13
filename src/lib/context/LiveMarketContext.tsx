'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { MarketIntelligencePayload, ProviderStatus } from '@/lib/market/types';
import {
  DEFAULT_FALLBACK_USD_IDR,
  formatUsdToIdr as formatUsdToIdrPure,
  formatUscToIdr as formatUscToIdrPure,
} from '@/lib/currency/live-idr';

interface LiveMarketContextValue {
  data: MarketIntelligencePayload | null;
  usdIdrRate: number;
  tenUsdInIdr: number;
  usdIdrStatus: ProviderStatus;
  lastUpdatedTimestamp: string;
  lastUpdatedWibLabel: string;
  isLoading: boolean;
  isSyncing: boolean;
  refreshNow: () => Promise<void>;
}

const LiveMarketContext = createContext<LiveMarketContextValue>({
  data: null,
  usdIdrRate: DEFAULT_FALLBACK_USD_IDR,
  tenUsdInIdr: DEFAULT_FALLBACK_USD_IDR * 10,
  usdIdrStatus: 'FALLBACK',
  lastUpdatedTimestamp: '',
  lastUpdatedWibLabel: 'Menghubungkan Feed Live...',
  isLoading: false,
  isSyncing: false,
  refreshNow: async () => {},
});

export function LiveMarketProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MarketIntelligencePayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const fetchMarketData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/market-intelligence', { cache: 'no-store' });
      if (res.ok) {
        const json = (await res.json()) as MarketIntelligencePayload;
        if (json && typeof json.usdIdrRate === 'number') {
          setData(json);
        }
      }
    } catch {
      // Retain previous snapshot or safe fallback
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    void fetchMarketData();
    const timer = setInterval(() => {
      void fetchMarketData();
    }, 30000);
    return () => clearInterval(timer);
  }, [fetchMarketData]);

  const usdIdrRate = data?.usdIdrRate ?? DEFAULT_FALLBACK_USD_IDR;
  const tenUsdInIdr = data?.tenUsdInIdr ?? Math.round(usdIdrRate * 10);

  return (
    <LiveMarketContext.Provider
      value={{
        data,
        usdIdrRate,
        tenUsdInIdr,
        usdIdrStatus: data?.usdIdrStatus ?? 'FALLBACK',
        lastUpdatedTimestamp: data?.lastUpdatedTimestamp ?? '',
        lastUpdatedWibLabel: data?.lastUpdatedWibLabel ?? 'Syncing WIB...',
        isLoading,
        isSyncing,
        refreshNow: fetchMarketData,
      }}
    >
      {children}
    </LiveMarketContext.Provider>
  );
}

export function useLiveMarket(): LiveMarketContextValue {
  return useContext(LiveMarketContext);
}

export function useLiveCurrency() {
  const { usdIdrRate, tenUsdInIdr, usdIdrStatus, data, isSyncing, refreshNow } = useLiveMarket();

  return useMemo(
    () => ({
      usdIdrRate,
      tenUsdInIdr,
      rpPerUsc: usdIdrRate / 100,
      usdIdrStatus,
      usdIdrSource: data?.usdIdrSource ?? 'open.er-api.com',
      isSyncing,
      refreshNow,
      formatUsdToIdr: (usdAmount: number) => formatUsdToIdrPure(usdAmount, usdIdrRate),
      formatUscToIdr: (uscAmount: number) => formatUscToIdrPure(uscAmount, usdIdrRate),
    }),
    [usdIdrRate, tenUsdInIdr, usdIdrStatus, data?.usdIdrSource, isSyncing, refreshNow]
  );
}
