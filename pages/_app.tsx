import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Copyright from '../src/components/common/Copyright';
import { LayoutComponent } from '../src/components/Layout/Layout';
import { createEmotionCache } from '../src/config';
import { store } from '../src/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Loading } from '../src/components';
import { useState } from 'react';
import { ThemeContext } from '../src/context/theme-provider';
import { GreenTheme } from '../src/config/MUI/theme';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function MyApp (props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [appTheme, setAppTheme] = useState(GreenTheme);

  const onChangeTheme = (theme: Theme) => {
    setAppTheme(theme);
  };

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ThemeContext.Provider value={{ onChangeTheme }}>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={appTheme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <LayoutComponent>
                <CssBaseline />
                <Component {...pageProps} />
                <Copyright />
              </LayoutComponent>
            </ThemeProvider>
          </CacheProvider>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
}
