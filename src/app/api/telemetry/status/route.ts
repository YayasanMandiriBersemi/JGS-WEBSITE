import { NextResponse } from 'next/server';
import { getDefaultTelemetrySystemState } from '@/lib/telemetry/telemetry-provider';

export async function GET() {
  const state = getDefaultTelemetrySystemState();
  return NextResponse.json(
    {
      platform: 'THE JEY GANG STRATEGIST (JGS)',
      tagline: 'Small Capital. Serious Strategy.',
      telemetryStatus: state.connectionStatus,
      isLiveVerified: state.isLiveVerified,
      statusHeadline: state.statusHeadline,
      adapterProtocol: state.adapterProtocol,
      lastHeartbeatIso: state.lastHeartbeatIso,
      checkedAt: new Date().toISOString()
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    }
  );
}
