import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import Copyright from '../src/components/common/Copyright';
import { LayoutComponent } from '../src/components/common/Layout/Layout';
import { createEmotionCache, theme } from '../src/config';
import { store } from '../src/redux';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function MyApp (props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <LayoutComponent>
            <CssBaseline />
            <Component {...pageProps} />
            <Copyright />
          </LayoutComponent>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
