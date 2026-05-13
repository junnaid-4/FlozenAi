import { ImageResponse } from 'next/og';
// Use the edge runtime for dynamic OG generation
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.has('title')
      ? searchParams.get('title')
      : 'Automate your business with FlozenAI';
    
    const subtitle = searchParams.has('subtitle')
      ? searchParams.get('subtitle')
      : 'n8n Automations & Courses for Pakistani Freelancers';

    // The ImageResponse allows generating a dynamic image using JSX
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#111318', // var(--color-void)
            backgroundImage: 'radial-gradient(circle at 50% -20%, #00E5A020, transparent 50%)',
            border: '2px solid #232833',
            fontFamily: 'sans-serif', // In production, provide a font file ArrayBuffer here
            padding: '40px 80px',
            textAlign: 'center',
          }}
        >
          {/* FlozenAI Logo Mock */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0057FF', // var(--color-logo-blue)
              color: 'white',
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              padding: '10px 30px',
              borderRadius: '20px',
              marginBottom: 40,
            }}
          >
            FlozenAI.
          </div>
          
          <div
            style={{
              fontSize: 64,
              fontStyle: 'normal',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: 20,
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              fontSize: 32,
              fontStyle: 'normal',
              color: '#8A92A6', // var(--color-text-secondary)
              marginTop: 10,
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {subtitle}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('OG Image Generation Error:', e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
