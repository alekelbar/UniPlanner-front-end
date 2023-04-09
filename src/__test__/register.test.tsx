import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from './testUtils/MockRouter';
import RegisterPage from '../../pages/register';
import { act } from 'react-dom/test-utils';


describe('Register', () => {
  it('should render register page', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <RegisterPage />
        </Provider>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const title = screen.getByText(/Registro.*/);
      expect(title).toBeInTheDocument();
    });
  });

  it('should show error messages when submitting empty form', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <RegisterPage />
        </Provider>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const title = screen.getByText(/Registro.*/);
      expect(title).toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /registrarme/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const error = screen.getByText(/La identificación es requerida/);
      expect(error).toBeInTheDocument();
    });
  });
});

