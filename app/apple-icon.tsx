import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = {
  width: 180,
  height: 180,
}

export default async function AppleIcon() {
  try {
    const logoResponse = await fetch(new URL('../public/images/site-icon.png', import.meta.url))
    if (!logoResponse.ok) throw new Error('Logo fetch failed')
    
    const logoBuffer = await logoResponse.arrayBuffer()
    const logoBase64 = Buffer.from(logoBuffer).toString('base64')

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '40px',
          }}
        >
          <img
            src={`data:image/png;base64,${logoBase64}`}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '36px',
            }}
            alt="GUYA FIBRE"
          />
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    // Fallback avec GF
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRadius: '40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 20px)',
              borderRadius: '40px',
            }}
          />
          <div
            style={{
              position: 'relative',
              fontSize: '42px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            GF
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }
}
