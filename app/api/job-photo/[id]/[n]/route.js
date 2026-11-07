import { redis, redisConf } from '../../../../lib/kc';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { id, n } = params;
  if (!/^[a-f0-9]{16}$/.test(id) || !/^\d{1,2}$/.test(n) || !redisConf()) return new Response('Not found', { status: 404 });
  try {
    const b64 = (await redis([['GET', 'jobphoto:' + id + ':' + n]]))[0];
    if (!b64) return new Response('Not found', { status: 404 });
    return new Response(Buffer.from(b64, 'base64'), { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400, s-maxage=86400' } });
  } catch (e) { return new Response('Error', { status: 500 }); }
}
