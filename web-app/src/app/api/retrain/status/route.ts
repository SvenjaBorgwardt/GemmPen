import { NextRequest, NextResponse } from 'next/server';

const KAGGLE_API = 'https://www.kaggle.com/api/v1';

export async function GET(request: NextRequest) {
  try {
    const username = process.env.KAGGLE_USERNAME;
    const key = process.env.KAGGLE_KEY;

    if (!username || !key) {
      return NextResponse.json(
        { status: 'idle', message: 'Kaggle credentials not configured' },
      );
    }

    const kernelSlug = request.nextUrl.searchParams.get('kernel') ?? `${username}/gemmpen-dpo-training`;
    const encoded = Buffer.from(`${username}:${key}`).toString('base64');

    const res = await fetch(`${KAGGLE_API}/kernels/status?userName=${username}&kernelSlug=${kernelSlug.split('/').pop()}`, {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ status: 'idle', message: 'Could not fetch kernel status' });
    }

    const data = await res.json();

    // Kaggle status values: "queued", "running", "complete", "error", "cancelAcknowledged"
    let mappedStatus: 'idle' | 'running' | 'complete' | 'error' = 'idle';
    switch (data.status) {
      case 'queued':
      case 'running':
        mappedStatus = 'running';
        break;
      case 'complete':
        mappedStatus = 'complete';
        break;
      case 'error':
      case 'cancelAcknowledged':
        mappedStatus = 'error';
        break;
      default:
        mappedStatus = 'idle';
    }

    return NextResponse.json({
      status: mappedStatus,
      kaggleStatus: data.status,
      failureMessage: data.failureMessage ?? null,
    });
  } catch {
    return NextResponse.json({ status: 'idle', message: 'Status check failed' });
  }
}
