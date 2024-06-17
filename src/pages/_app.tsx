import "@/styles/globals.css";
import 'react-notifications-component/dist/theme.css'
import Head from 'next/head';
import { NextPage } from 'next/types';
import type { AppProps } from 'next/app'
import PageWithLayoutType from '@/types/layout';
import { ReactNotifications } from 'react-notifications-component'


type AppLayoutProps = {
  Component: PageWithLayoutType
  pageProps: any
}

const MyApp: NextPage<AppLayoutProps> = ({ Component, pageProps }) => {

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <>
      <ReactNotifications />
      <Head>
        <title>{process.env.APP_NAME}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp;
