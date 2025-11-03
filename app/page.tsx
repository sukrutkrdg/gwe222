// app/page.tsx


// Farcaster lansman testi
// (Frame'i gösteren ana sayfa)

const getBaseUrl = () => {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

export async function generateMetadata() {
  const baseUrl = getBaseUrl();
  const imageUrl = `${baseUrl}/api/image?t=${Date.now()}`;

  const frameMetadata = {
    buttons: [
      {
        label: '🔄 Yenile',
        action: 'post_redirect',
      },
    ],
    image: { src: imageUrl, aspectRatio: '1.91:1' },
    postUrl: `${baseUrl}/api/image`,
  };

  return {
    title: '/onchain-lab Gas Tracker',
    description: 'Farcaster Frame for tracking ETH and Base gas prices.',
    openGraph: {
      title: '/onchain-lab Gas Tracker',
      description: 'Farcaster Frame for tracking ETH and Base gas prices.',
      images: [imageUrl],
    },
    other: { ...frameMetadata },
  };
}

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: '#0D1117', // koyu arka plan
        color: '#C9D1D9', // açık yazı rengi
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 32, color: '#58A6FF' }}>/onchain-lab Gas Tracker Frame</h1>
      <p style={{ fontSize: 18, marginBottom: 24 }}>
        Bu uygulamayı Farcaster'da paylaşabilirsiniz.
      </p>
      <img
        src={`${getBaseUrl()}/api/image?t=${Date.now()}`}
        alt="Gas Tracker"
        style={{
          marginTop: 20,
          maxWidth: '90%',
          borderRadius: 12,
          border: '2px solid #30363D',
        }}
      />
    </div>
  );
}
