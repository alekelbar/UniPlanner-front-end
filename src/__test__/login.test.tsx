import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import LoginPage from '../../pages/auth/index';
import { store } from '../redux/store';
import { createMockRouter } from './testUtils/MockRouter';
import { renderWithProviders } from './testUtils/test-utils';

describe('Login', () => {

  let router = createMockRouter({});


  it('should render login page', () => {
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );

    const loginPageTitle = screen.getByRole('heading', { name: /ingreso/i });
    const usernameInput = screen.getByPlaceholderText(/identificación/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /ingresar/i });

    expect(loginPageTitle).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should show error messages when submitting empty form', async () => {
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </RouterContext.Provider>
    );

    const submitButton = screen.getByRole('button', { name: /ingresar/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const identificationError = screen.getByText(/su identificación es requerida/i);
    const passwordError = screen.getByText(/su contraseña es requerida/i);

    expect(identificationError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });


  it('should not redirect when submitting incorrect/empty credentials', async () => {

    const spyPush = jest.spyOn(router, 'push');

    renderWithProviders(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </RouterContext.Provider>
    );

    const submitButton = screen.getByRole('button', { name: /ingresar/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(spyPush).not.toHaveBeenCalledWith('/home/careers');
    });

  });

  it('should redirect to home page when submitting correct credentials', async () => {
    // Arrange
    const spyPush = jest.spyOn(router, 'push');

    renderWithProviders(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );

    // Act
    const usernameInput = screen.getByPlaceholderText(/identificación/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /ingresar/i });

    fireEvent.change(usernameInput, { target: { value: 'alekelbar' } });
    fireEvent.change(passwordInput, { target: { value: 'mBRuNX6U7dkEju' } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(spyPush).toHaveBeenCalledWith('/home/careers');
    });
  });
});

