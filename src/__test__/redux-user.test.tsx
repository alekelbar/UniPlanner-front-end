import { startUpdateUser, startUserLogin, store } from '../redux';
import { act } from 'react-dom/test-utils';


describe('User actions', () => {

  it('should be fail to login with incorrect credentials', async () => {

    await act(async () => {
      await store.dispatch(startUserLogin({ identification: 'alekelbar', password: 'alex1234' }));
    });
    const user = store.getState().auth.user;
    expect(user).toBeNull();
  });

  it('should dispatch login action', async () => {
    await act(async () => {
      await store.dispatch(startUserLogin({ identification: 'alekelbar', password: 'mBRuNX6U7dkEju' }));
    });

    const user = store.getState().auth.user;
    expect(user).not.toBeNull();
  });

  it('should dispatch update action', async () => {

    await act(async () => {
      await store.dispatch(startUserLogin({ identification: 'alekelbar', password: 'mBRuNX6U7dkEju' }));
      await store.dispatch(startUpdateUser({ fullname: 'Alekelbar Bar Bar' }));
    });

    const user = store.getState().auth.user;

    expect(user?.fullname).toBe("Alekelbar Bar Bar");
  });
});
