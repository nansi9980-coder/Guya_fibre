import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = {
  width: 192,
  height: 192,
}

export default async function Icon() {
  try {
    const iconPath = path.join(process.cwd(), 'public', 'site-icon.png')
    const logoBuffer = await readFile(iconPath)
    const logoBase64 = logoBuffer.toString('base64')

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
            padding: '16px',
          }}
        >
          <img
            src={`data:image/png;base64,${logoBase64}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
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
    // Fallback texte si le fichier est introuvable
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
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
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