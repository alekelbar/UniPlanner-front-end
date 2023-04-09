import { render, screen } from '@testing-library/react';

import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { createMockRouter } from './testUtils/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import SettingsPage from '../../pages/home/settings';
import { updateSetting } from '../redux/slices/Settings/setting-slice';
import { act } from 'react-dom/test-utils';


describe('Settings tests', () => {

  it('Setting Module should be Rendered', async () => {

    store.dispatch(updateSetting({
      importance: 3,
      urgency: 1,
      do: "#f10909",
      prepare: "#093fe1",
      delegate: "#00e62e",
      ignore: "#e9d60c",
      user: 'me',
      _id: 'me'
    }));

    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <SettingsPage />
        </Provider>
      </RouterContext.Provider>
    );

    await act(async () => {
      const field = screen.getByText(/Configuraciones de usuario/i);
      expect(field).toBeInTheDocument();
    });
  });
});