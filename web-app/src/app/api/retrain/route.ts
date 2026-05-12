import { NextRequest, NextResponse } from 'next/server';

const KAGGLE_API = 'https://www.kaggle.com/api/v1';

function kaggleHeaders(): HeadersInit {
  const username = process.env.KAGGLE_USERNAME;
  const key = process.env.KAGGLE_KEY;
  if (!username || !key) {
    throw new Error('KAGGLE_USERNAME and KAGGLE_KEY must be set');
  }
  const encoded = Buffer.from(`${username}:${key}`).toString('base64');
  return {
    Authorization: `Basic ${encoded}`,
    'Content-Type': 'application/json',
  };
}

async function ensureDataset(username: string, jsonlContent: string) {
  const slug = 'gemmpen-dpo';
  const datasetSlug = `${username}/${slug}`;

  // Convert JSONL to base64 for the Kaggle API
  const fileContent = Buffer.from(jsonlContent).toString('base64');

  // Try to create or update the dataset
  // First, check if it exists by attempting metadata fetch
  const checkRes = await fetch(`${KAGGLE_API}/datasets/${datasetSlug}`, {
    headers: kaggleHeaders(),
  });

  if (checkRes.ok) {
    // Dataset exists -- create a new version
    const updateRes = await fetch(`${KAGGLE_API}/datasets/${datasetSlug}/create/version`, {
      method: 'POST',
      headers: kaggleHeaders(),
      body: JSON.stringify({
        versionNotes: `DPO pairs updated ${new Date().toISOString().slice(0, 10)}`,
        files: [
          {
            fileName: 'dpo-pairs.jsonl',
            contentBase64: fileContent,
          },
        ],
        deleteOldVersions: false,
      }),
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`Failed to update dataset: ${err}`);
    }
    return datasetSlug;
  }

  // Dataset does not exist -- create it
  const createRes = await fetch(`${KAGGLE_API}/datasets/create/new`, {
    method: 'POST',
    headers: kaggleHeaders(),
    body: JSON.stringify({
      title: 'GemmPen DPO Training Pairs',
      slug,
      ownerSlug: username,
      licenseName: 'CC0-1.0',
      isPrivate: true,
      files: [
        {
          fileName: 'dpo-pairs.jsonl',
          contentBase64: fileContent,
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Failed to create dataset: ${err}`);
  }

  return datasetSlug;
}

async function pushNotebook(username: string) {
  const kernelSlug = `${username}/gemmpen-dpo-training`;

  const res = await fetch(`${KAGGLE_API}/kernels/push`, {
    method: 'POST',
    headers: kaggleHeaders(),
    body: JSON.stringify({
      slug: kernelSlug,
      newTitle: 'GemmPen DPO Training',
      text: '', // empty -- uses the existing notebook code
      language: 'python',
      kernelType: 'notebook',
      isPrivate: true,
      enableGpu: true,
      enableTpu: false,
      enableInternet: true,
      datasetDataSources: [`${username}/gemmpen-dpo`],
      competitionDataSources: [],
      kernelDataSources: [],
      categoryIds: [],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to push notebook: ${err}`);
  }

  const data = await res.json();
  return { kernelSlug, versionNumber: data.versionNumber ?? 1 };
}

export async function POST(request: NextRequest) {
  try {
    const username = process.env.KAGGLE_USERNAME;
    if (!username) {
      return NextResponse.json(
        { error: 'Kaggle credentials not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { jsonlContent } = body as { jsonlContent: string };

    if (!jsonlContent || jsonlContent.trim().length === 0) {
      return NextResponse.json(
        { error: 'No training data provided' },
        { status: 400 }
      );
    }

    // Step 1: Upload dataset
    const datasetSlug = await ensureDataset(username, jsonlContent);

    // Step 2: Trigger notebook
    const { kernelSlug, versionNumber } = await pushNotebook(username);

    return NextResponse.json({
      status: 'running',
      datasetSlug,
      kernelSlug,
      versionNumber,
      message: 'Training started successfully',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
