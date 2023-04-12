import { screen } from '@testing-library/react';

import { SessionClock } from '../components';
import { createMockRouter } from './testUtils/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { renderWithProviders } from './testUtils/test-utils';


describe('Clock tests', () => {

  it('Career clock should be Rendered', async () => {


    const preloadedState = {
      sessions: {
        count: 1,
        loading: false,
        sessions: [],
        selected: {
          _id: '',
          duration: 10,
          name: 'ME',
          type: 'WORK',
          user: 'me'
        }
      }
    };

    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>
        <SessionClock onClose={() => { }} open title='Timer Clock' />
      </RouterContext.Provider>
      , { preloadedState });

    const timer = screen.getByTestId('session-clock');
    expect(timer).toBeInTheDocument();
  });
});