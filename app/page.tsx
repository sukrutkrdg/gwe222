// app/page.tsx
// (Frame'i gösteren ana sayfa)

import { getFrameMetadata } from '@coinbase/onchainkit';

const getBaseUrl = () => {
  // Vercel'in kendi URL'sini kullanmasını sağlıyoruz
  return process.env.VERCEL_URL
    ? `https{process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

export async function generateMetadata() {
  const baseUrl = getBaseUrl();
  
  // Resim olarak /api/image endpoint'ini göster
  // Cache'i kırmak için 'Date.now()' ekliyoruz
  const imageUrl = `${baseUrl}/api/image?t=${Date.now()}`;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: '🔄 Yenile',
        action: 'post_redirect', // En basit yenileme yöntemi
      },
    ],
    image: { src: imageUrl, aspectRatio: '1.91:1' },
    // Yenile'ye basınca /api/image'ı tekrar çağır
    postUrl: `${baseUrl}/api/image`, 
  });

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
    <div>
      <h1>/onchain-lab Gas Tracker Frame</h1>
      <p>Bu uygulamayı Farcaster'da paylaşın.</p>
    </div>
  );
}