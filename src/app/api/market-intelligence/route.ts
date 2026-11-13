import { NextRequest, NextResponse } from 'next/server';
import { buildFreshMarketIntelligencePayload } from '@/lib/market/fetchers';
import type { MarketIntelligencePayload } from '@/lib/market/types';

export const dynamic = 'force-dynamic';

const CACHE_TTL_MS = 15000;
let cachedPayload: MarketIntelligencePayload | null = null;
let cachedAtMs = 0;
let inflightPromise: Promise<MarketIntelligencePayload> | null = null;

async function getOrRefreshPayload(): Promise<MarketIntelligencePayload> {
  const now = Date.now();
  if (cachedPayload && now - cachedAtMs < CACHE_TTL_MS) {
    return cachedPayload;
  }

  if (inflightPromise) {
    return inflightPromise;
  }

  inflightPromise = buildFreshMarketIntelligencePayload()
    .then((fresh) => {
      // Preserve last valid COT/Calendar if a single transient refresh returned empty
      const merged: MarketIntelligencePayload = {
        ...fresh,
        cotReports:
          fresh.cotReports.length > 0 ? fresh.cotReports : cachedPayload?.cotReports ?? [],
        cotStatus:
          fresh.cotReports.length > 0
            ? fresh.cotStatus
            : cachedPayload?.cotReports?.length
              ? cachedPayload.cotStatus
              : fresh.cotStatus,
        calendarEvents:
          fresh.calendarEvents.length > 0
            ? fresh.calendarEvents
            : cachedPayload?.calendarEvents ?? [],
        calendarStatus:
          fresh.calendarEvents.length > 0
            ? fresh.calendarStatus
            : cachedPayload?.calendarEvents?.length
              ? cachedPayload.calendarStatus
              : fresh.calendarStatus,
        headlines:
          fresh.headlines.length > 0 ? fresh.headlines : cachedPayload?.headlines ?? [],
        fearAndGreed: fresh.fearAndGreed ?? cachedPayload?.fearAndGreed ?? null,
        futuresPositioning:
          fresh.futuresPositioning.length > 0
            ? fresh.futuresPositioning
            : cachedPayload?.futuresPositioning ?? [],
      };
      cachedPayload = merged;
      cachedAtMs = Date.now();
      return merged;
    })
    .catch((err) => {
      if (cachedPayload) return cachedPayload;
      throw err;
    })
    .finally(() => {
      inflightPromise = null;
    });

  return inflightPromise;
}

export async function GET(request: NextRequest) {
  try {
    const section = request.nextUrl.searchParams.get('section');
    const payload = await getOrRefreshPayload();

    if (section === 'cot') {
      return NextResponse.json({
        cotReports: payload.cotReports,
        cotStatus: payload.cotStatus,
        lastUpdatedWibLabel: payload.lastUpdatedWibLabel,
      });
    }
    if (section === 'calendar') {
      return NextResponse.json({
        calendarEvents: payload.calendarEvents,
        calendarStatus: payload.calendarStatus,
        headlines: payload.headlines,
        lastUpdatedWibLabel: payload.lastUpdatedWibLabel,
      });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: 'Unable to fetch market intelligence snapshot' },
      { status: 500 }
    );
  }
}
