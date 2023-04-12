import { screen } from '@testing-library/react';

import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { createMockRouter } from './testUtils/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import SettingsPage from '../../pages/home/settings';
import { updateSetting } from '../redux/slices/Settings/setting-slice';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from './testUtils/test-utils';


describe('Settings tests', () => {

  it('Setting Module should be Rendered', async () => {

    const preloadState = {
      preloadedState: {
        setting: {
          error: null,
          loading: false,
          selected: {
            importance: 3,
            urgency: 1,
            do: "#f10909",
            prepare: "#093fe1",
            delegate: "#00e62e",
            ignore: "#e9d60c",
            user: 'me',
            _id: 'me'
          }
        }
      }
    };

    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>
        <SettingsPage />
      </RouterContext.Provider>, preloadState);

    await act(async () => {
      const field = screen.getByText(/Configuraciones de usuario/i);
      expect(field).toBeInTheDocument();
    });
  });
});