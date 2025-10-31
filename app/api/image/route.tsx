// app/api/image/route.tsx
// (Bu dosya SADECE resmi oluşturur)

import React from 'react';
import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { createPublicClient, http, formatGwei } from 'viem';
import { mainnet, base } from 'viem/chains';

// Viem istemcilerini .env dosyasındaki URL'ler ile oluştur
const ethClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ETH_RPC_URL),
});

const baseClient = createPublicClient({
  chain: base,
  transport: http(process.env.BASE_RPC_URL),
});

// Gas ücretlerini çeken asenkron fonksiyon
async function getGasPrices() {
  try {
    const [ethGas, baseGas] = await Promise.all([
      ethClient.getGasPrice(),
      baseClient.getGasPrice(),
    ]);

    // GWEI formatına çevir
    return {
      eth: formatGwei(ethGas),
      base: formatGwei(baseGas),
    };
  } catch (error) {
    console.error('Error fetching gas prices:', error);
    return { eth: 'N/A', base: 'N/A' };
  }
}

// Bu endpoint'e bir GET isteği geldiğinde bu çalışır
export async function GET(req: NextRequest): Promise<Response> {
  const { eth, base } = await getGasPrices();

  // Dinamik olarak o anki resmi oluştur
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0D1117',
          color: '#C9D1D9',
          fontFamily: '"Arial", sans-serif',
          fontSize: 48,
          border: '2px solid #30363D',
          borderRadius: 16,
        }}
      >
        <div style={{ display: 'flex', color: '#58A6FF', marginBottom: 20 }}>
          /onchain-lab Gas Tracker (Faz 1)
        </div>

        <div style={{ display: 'flex', marginBottom: 15 }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
            width={50}
            height={50}
            style={{ marginRight: 20 }}
          />
          Ethereum: {eth !== 'N/A' ? `${parseFloat(eth).toFixed(2)} Gwei` : 'N/A'}
        </div>

        <div style={{ display: 'flex' }}>
          <img
            src="https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.svg"
            width={50}
            height={50}
            style={{ marginRight: 20 }}
          />
          Base: {base !== 'N/A' ? `${parseFloat(base).toFixed(2)} Gwei` : 'N/A'}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
