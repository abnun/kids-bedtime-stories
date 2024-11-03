'use client';

import GuteNachtGeschichtenApp from '@/components/GuteNachtGeschichtenApp';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Personalisierte Geschichten</title>
        <meta name="description" content="KI-generierte Gute-Nacht-Geschichten für Kinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <GuteNachtGeschichtenApp />
        </div>
      </main>
    </div>
  )
}
