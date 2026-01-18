import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'raiki - cybersecurity & web3 services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #100c08 0%, #1a1510 50%, #251c15 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="45" stroke="#70c060" strokeWidth="3" />
            <circle cx="50" cy="50" r="30" stroke="#70c060" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" fill="#70c060" />
            <line x1="50" y1="5" x2="50" y2="20" stroke="#70c060" strokeWidth="2" />
            <line x1="50" y1="80" x2="50" y2="95" stroke="#70c060" strokeWidth="2" />
            <line x1="5" y1="50" x2="20" y2="50" stroke="#70c060" strokeWidth="2" />
            <line x1="80" y1="50" x2="95" y2="50" stroke="#70c060" strokeWidth="2" />
          </svg>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#e8e0d5',
              letterSpacing: '0.1em',
            }}
          >
            raiki
          </span>
        </div>
        <span
          style={{
            fontSize: '28px',
            color: '#a09080',
            letterSpacing: '0.2em',
          }}
        >
          cybersecurity · digital experiences · web3 services
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
