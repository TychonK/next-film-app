import '@/styles/globals.css'
import '@/styles/card.css'

import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
