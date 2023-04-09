import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginPage from '../../pages/index';
import { store } from '../redux/store';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from './testUtils/MockRouter';
import { act } from 'react-dom/test-utils';



const submitLoginForm = async (username: string, password: string) => {
  const usernameInput = screen.getByPlaceholderText(/identificación/i);
  const passwordInput = screen.getByPlaceholderText(/contraseña/i);
  const submitButton = screen.getByRole('button', { name: /ingresar/i });

  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
  });
};


describe('Login', () => {
  it('should render login page', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
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
    render(
      <RouterContext.Provider value={createMockRouter({})}>
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


  it('should not redirect when submitting incorrect credentials', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </RouterContext.Provider>
    );

    const submitButton = screen.getByRole('button', { name: /ingresar/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorMessage = screen.queryByText(/carreras disponibles/i);
    expect(errorMessage).not.toBeInTheDocument();

  });

  // TODO: buscar la manera de probar esta funcionalidad
  // it('should redirect to home page when submitting correct credentials', async () => {
  //   const router = createMockRouter({});
  //   render(
  //     <RouterContext.Provider value={router}>
  //       <Provider store={store}>
  //         <LoginPage />
  //       </Provider>
  //     </RouterContext.Provider>
  //   );

  //   await submitLoginForm("504270168", "alex1234");
  //   await waitFor(() => expect(router.pathname).toBe('/home/careers'));
  //   const homePageTitle = screen.getByRole('heading', { name: /Ingenieria en Sistemas de Información/i });

  //   expect(homePageTitle).toBeInTheDocument();
  // });
});

