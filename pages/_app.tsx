import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { LayoutComponent } from '../src/components/Layout'; // No importar esto NUNCA desde components, es una dependecia circular
import { createEmotionCache } from '../src/config';
import { ThemeProviderWrapper } from '../src/context/wrapperProvider';
import { store } from '../src/redux';
import { ReduxPersistWrapper } from '../src/redux/reduxPersist/wrapper';

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
        <ThemeProviderWrapper>
          <ReduxPersistWrapper>
            <LayoutComponent>
              <CssBaseline />
              <Component {...pageProps} />
            </LayoutComponent>
          </ReduxPersistWrapper>
        </ThemeProviderWrapper>
      </CacheProvider>
    </Provider>
  );
}
