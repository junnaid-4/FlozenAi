import { NextResponse } from 'next/server';

// Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
  try {
    // We would do real aggregations here. E.g.:
    // const { count: userCount } = await supabase.from('User').select('*', { count: 'exact', head: true });
    // const { count: purchaseCount } = await supabase.from('Purchase').select('*', { count: 'exact', head: true });
    // const { data: sumData } = await supabase.rpc('get_time_saved_sum');
    
    // For now, we simulate the aggregation since the schema is mock
    const stats = [
      { value: 12050, suffix: '+', label: 'Hours Saved' },
      { value: 124, suffix: '', label: 'Workflows Built' },
      { value: 2150, suffix: '+', label: 'Community Members' },
      { value: 100, suffix: '%', label: 'No-Code' },
    ];

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    console.error('Stats aggregation error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
