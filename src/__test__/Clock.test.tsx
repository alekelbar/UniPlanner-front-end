import { render, screen } from '@testing-library/react';

import { SessionClock } from '../components';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { createMockRouter } from './testUtils/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { setSelectedSession } from '../redux';


describe('Clock tests', () => {

  it('Career Card should be Rendered', () => {

    store.dispatch(setSelectedSession({
      _id: '',
      duration: 10,
      name: 'ME',
      type: 'WORK',
      user: 'me'
    }));

    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <SessionClock onClose={() => { }} open title='Timer Clock' />
        </Provider>
      </RouterContext.Provider>
    );

    const timer = screen.getByTestId('session-clock');
    expect(timer).toBeInTheDocument();
  });
});