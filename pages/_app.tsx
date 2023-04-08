import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { createEmotionCache } from '../src/config';
import { LayoutComponent } from '../src/components/Layout/Layout';
import { Copyright, Loading } from '../src/components';
import { GreenTheme } from '../src/config/MUI/theme';
import { store } from '../src/redux';
import { ThemeContext } from '../src/context/theme-provider';
import { ReduxPersistWrapper } from '../src/redux/reduxPersist/wrapper';
import { ThemeProviderWrapper } from '../src/context/wrapperProvider';

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
              <Copyright />
            </LayoutComponent>
          </ReduxPersistWrapper>
        </ThemeProviderWrapper>
      </CacheProvider>
    </Provider>
  );
}
