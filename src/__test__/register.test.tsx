import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { act } from 'react-dom/test-utils';
import RegisterPage from '../../pages/auth/register';
import { createMockRouter } from './testUtils/MockRouter';
import { renderWithProviders } from './testUtils/test-utils';


describe('Register', () => {

  const router = createMockRouter({});

  it('should render register page', async () => {
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <RegisterPage />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Registro.*/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/identificación/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Nombre completo/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/correo electronico/i)).toBeInTheDocument();
      expect(screen.getAllByText(/contraseña/i)[0]).toBeVisible();
      expect(screen.getAllByText(/contraseña/i)[1]).toBeVisible();
    });

  });

  it('should be show error messages when submitting empty form', async () => {
    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>
        <RegisterPage />
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

