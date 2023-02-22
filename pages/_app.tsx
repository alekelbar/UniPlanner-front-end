import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache, theme } from '../src/config';
import { Provider } from 'react-redux';
import { store } from '../src/redux';
import { LayoutComponent } from '../src/components/common/Layout/Layout';
import Copyright from '../src/components/common/Copyright';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function MyApp (props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
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
