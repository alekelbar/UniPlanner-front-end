import { screen } from '@testing-library/react';

import { createMockRouter } from './testUtils/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import ProfilePage from '../../pages/home/profile';
import { renderWithProviders } from './testUtils/test-utils';


describe('Profile tests', () => {

  it('Profile Module should be Rendered', () => {

    const preloadedState = {
      preloadedState: {
        auth: {
          loading: false,
          token: '',
          user: {
            email: "test@example.com",
            fullname: "john doe",
            id: 'randomID',
            identification: '01110222'
          }
        }
      }
    };

    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>
        <ProfilePage />
      </RouterContext.Provider>, preloadedState);

    const form = screen.getByTestId('profile-form');
    expect(form).toBeInTheDocument();
  });
});