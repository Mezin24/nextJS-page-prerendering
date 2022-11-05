import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of interestimg events' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
