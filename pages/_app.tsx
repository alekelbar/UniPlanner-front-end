import { CacheProvider, EmotionCache, ThemeContext } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { LayoutComponent } from '../src/components/Layout'; // No importar esto NUNCA desde components, es una dependecia circular
import { createEmotionCache } from '../src/config';
import { store } from '../src/redux';
import UNATheme from '../src/config/MUI/theme';
import { Switch, Theme, ThemeProvider } from '@mui/material';
import React from 'react';
import { OnChangeThemeContext } from '../src/context/theme-provider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp (props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [appTheme, setAppTheme] = React.useState<Theme>(UNATheme);

  const onChangeTheme = (theme: Theme) => {
    setAppTheme(theme);
  };

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <OnChangeThemeContext.Provider value={{ onChangeTheme }}>
          <ThemeProvider theme={appTheme}>
            <LayoutComponent>
              <CssBaseline />
              <Component {...pageProps} />
            </LayoutComponent>
          </ThemeProvider>
        </OnChangeThemeContext.Provider>
      </CacheProvider>
    </Provider>
  );
}
