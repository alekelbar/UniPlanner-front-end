import { render, screen } from '@testing-library/react';

import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { createMockRouter } from './testUtils/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import ProfilePage from '../../pages/home/profile';
import { setAuth } from '../redux/slices/auth/authSlice';


describe('Profile tests', () => {

  it('Profile Module should be Rendered', () => {

    store.dispatch(setAuth({
      loading: false,
      token: "asdfasdfasdfasdf",
      user: {
        email: "test@example.com",
        fullname: "john doe",
        id: 'randomID',
        identification: '01110222'
      }
    }));

    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <ProfilePage />
        </Provider>
      </RouterContext.Provider>
    );

    const form = screen.getByTestId('profile-form');
    expect(form).toBeInTheDocument();
  });
});