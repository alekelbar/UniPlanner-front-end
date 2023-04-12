import { fireEvent, screen, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import LoginPage from "../../pages";
import ProfilePage from "../../pages/home/profile";
import SettingsPage from "../../pages/home/settings";
import { CareerCard, CourseCard, LayoutComponent, SessionCard } from "../components";
import { createMockRouter } from "./testUtils/MockRouter";
import { renderWithProviders } from "./testUtils/test-utils";

describe("testing critical path", () => {

  describe('testing deliveries feacture', () => {
    const router = createMockRouter({});
    it("should redirect to home page when submitting correct credentials", async () => {
      // Arrange
      const spyPush = jest.spyOn(router, "push");

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <LoginPage />
        </RouterContext.Provider>
      );

      // Act
      const usernameInput = screen.getByPlaceholderText(/identificación/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.change(usernameInput, { target: { value: "alekelbar" } });
      fireEvent.change(passwordInput, { target: { value: "mBRuNX6U7dkEju" } });
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(spyPush).toHaveBeenCalledWith("/home/careers");
      });
    });

    it('Career Card should be Rendered and redirect to courses', async () => {

      const spyRouter = jest.spyOn(router, 'push');

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <CareerCard career={{
            _id: 'career 1',
            name: 'Career Name'
          }} />
        </RouterContext.Provider>
      );

      await waitFor(() => {
        const card = screen.getByText('Career Name');
        expect(card).toBeInTheDocument();
      });

      const coursesButton = screen.getByRole('button', { name: /Cursos/i });
      fireEvent.click(coursesButton);


      await waitFor(() => {
        expect(spyRouter).toHaveBeenCalledWith('/home/courses');
      });
    });

    it('Course Card should be Rendered', () => {

      const spyRouter = jest.spyOn(router, 'push');

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <CourseCard course={{
            name: 'Course Name',
            _id: 'COURSE-ID',
            career: 'course id',
            courseDescription: 'Course description',
            credits: 2,
            user: 'my user'
          }} actualPage={1} onOpenEdit={() => { }} reload={(num) => { }} />
        </RouterContext.Provider>
      );

      const courseTitle = screen.getByText(/Course Name/i);
      expect(courseTitle).toBeInTheDocument();

      const courseCredits = screen.getByText(/Credits/i);
      expect(courseCredits).toBeInTheDocument();

      const courseDescription = screen.getByText(/Course description/i);
      expect(courseDescription).toBeInTheDocument();

      const buttonUpdate = screen.getByRole('button', { name: /Actualizar/i });
      expect(buttonUpdate).toBeInTheDocument();

      const buttonRemove = screen.getByRole('button', { name: /Actualizar/i });
      expect(buttonRemove).toBeInTheDocument();

      const buttonDeliveries = screen.getByRole('button', { name: /VER ENTREGABLES/i });
      expect(buttonDeliveries).toBeInTheDocument();

      fireEvent.click(buttonDeliveries);

      expect(spyRouter).toHaveBeenCalledWith('/home/deliveries');
    });
  });

  describe('testing session feacture', () => {
    const router = createMockRouter({});
    it("should redirect to home page when submitting correct credentials", async () => {
      // Arrange
      const spyPush = jest.spyOn(router, "push");

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <LoginPage />
        </RouterContext.Provider>
      );

      // Act
      const usernameInput = screen.getByPlaceholderText(/identificación/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.change(usernameInput, { target: { value: "alekelbar" } });
      fireEvent.change(passwordInput, { target: { value: "mBRuNX6U7dkEju" } });
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(spyPush).toHaveBeenCalledWith("/home/careers");
      });
    });

    it('Career Card should be Rendered and redirect to sessions', async () => {

      const spyRouter = jest.spyOn(router, 'push');

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <LayoutComponent>
            <CareerCard career={{
              _id: 'career 1',
              name: 'Career Name'
            }} />
          </LayoutComponent>
        </RouterContext.Provider>
        , { preloadedState: { auth: { loading: false, token: '', user: null } } });

      await waitFor(() => {
        const card = screen.getByText('Career Name');
        expect(card).toBeInTheDocument();
      });

      const buttonSideBar = screen.getByTestId('SchoolIcon');

      await act(async () => {
        fireEvent.click(buttonSideBar);
      });

      fireEvent.click(
        screen.getByRole('link', {
          name: /Sesiones/,
        })
      );

      await waitFor(() => {
        expect(spyRouter).toHaveBeenCalledWith("/home/sessions", "/home/sessions", { "locale": undefined, "scroll": undefined, "shallow": undefined });
      });
    });

    it('Session Card should be Rendered and action buttons works', async () => {
      renderWithProviders(
        <RouterContext.Provider value={router}>
          <SessionCard session={{
            name: 'Task Name',
            _id: 'TASK-ID',
            user: 'my user',
            duration: 2,
            type: ''
          }} actualPage={1} reload={(num) => { }} onStartSession={() => { }} />
        </RouterContext.Provider>
      );

      const card = screen.getByTestId('session-card');
      expect(card).toBeInTheDocument();

      const startSessionButton = screen.getByRole('button', { name: /Iniciar la sesión/i });
      expect(startSessionButton).toBeInTheDocument();

      const spyClick = jest.fn();
      startSessionButton.onclick = spyClick;
      fireEvent.click(startSessionButton);

      expect(spyClick).toHaveBeenCalled();
    });
  });

  describe('testing profile feacture', () => {
    const router = createMockRouter({});
    it("should redirect to home page when submitting correct credentials", async () => {
      // Arrange
      const spyPush = jest.spyOn(router, "push");

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <LoginPage />
        </RouterContext.Provider>
      );

      // Act
      const usernameInput = screen.getByPlaceholderText(/identificación/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.change(usernameInput, { target: { value: "alekelbar" } });
      fireEvent.change(passwordInput, { target: { value: "mBRuNX6U7dkEju" } });
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(spyPush).toHaveBeenCalledWith("/home/careers");
      });
    });

    it('Career Card should be Rendered and redirect to profile', async () => {

      const spyRouter = jest.spyOn(router, 'push');

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <LayoutComponent>
            <CareerCard career={{
              _id: 'career 1',
              name: 'Career Name'
            }} />
          </LayoutComponent>
        </RouterContext.Provider>
        , { preloadedState: { auth: { loading: false, token: '', user: null } } });

      await waitFor(() => {
        const card = screen.getByText('Career Name');
        expect(card).toBeInTheDocument();
      });

      const buttonSideBar = screen.getByTestId('SchoolIcon');

      await act(async () => {
        fireEvent.click(buttonSideBar);
      });

      fireEvent.click(
        screen.getByRole('link', {
          name: /Perfil/,
        })
      );

      await waitFor(() => {
        expect(spyRouter).toHaveBeenCalledWith("/home/profile", "/home/profile", { "locale": undefined, "scroll": undefined, "shallow": undefined });
      });

    });

    it('Profile component should be Rendered and action buttons works', async () => {
      renderWithProviders(
        <RouterContext.Provider value={router}>
          <ProfilePage />
        </RouterContext.Provider>
        , {
          preloadedState: {
            auth: {
              loading: false, token: '', user: {
                email: 'test@example.com',
                fullname: 'john Doe',
                id: '123',
                identification: '2222222222'
              }
            }
          }
        });

      const updateButton = screen.getByTestId('button-update');
      expect(updateButton).toBeInTheDocument();

      const spyClick = jest.fn();
      updateButton.onclick = spyClick;
      await act(async () => {
        fireEvent.click(updateButton);
      });

      expect(spyClick).toHaveBeenCalled();
    });
  });

  describe('testing update settings', () => {
    const router = createMockRouter({});
    it("should redirect to home page when submitting correct credentials", async () => {
      // Arrange
      const spyPush = jest.spyOn(router, "push");

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <LoginPage />
        </RouterContext.Provider>
      );

      // Act
      const usernameInput = screen.getByPlaceholderText(/identificación/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.change(usernameInput, { target: { value: "alekelbar" } });
      fireEvent.change(passwordInput, { target: { value: "mBRuNX6U7dkEju" } });
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(spyPush).toHaveBeenCalledWith("/home/careers");
      });
    });

    it('Career Card should be Rendered and redirect to settings', async () => {

      const spyRouter = jest.spyOn(router, 'push');

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <LayoutComponent>
            <CareerCard career={{
              _id: 'career 1',
              name: 'Career Name'
            }} />
          </LayoutComponent>
        </RouterContext.Provider>
        , { preloadedState: { auth: { loading: false, token: '', user: null } } });

      await waitFor(() => {
        const card = screen.getByText('Career Name');
        expect(card).toBeInTheDocument();
      });

      const buttonSideBar = screen.getByTestId('SchoolIcon');

      await act(async () => {
        fireEvent.click(buttonSideBar);
      });

      fireEvent.click(
        screen.getByRole('link', {
          name: /Configuración/,
        })
      );

      await waitFor(() => {
        expect(spyRouter).toHaveBeenCalledWith("/home/settings", "/home/settings", { "locale": undefined, "scroll": undefined, "shallow": undefined });
      });

    });

    it('Settings component should be Rendered and action buttons works', async () => {

      const preloadState = {
        preloadedState: {
          setting: {
            error: null,
            loading: false,
            selected: {
              importance: 3,
              urgency: 1,
              do: "#f10909",
              prepare: "#093fe1",
              delegate: "#00e62e",
              ignore: "#e9d60c",
              user: 'me',
              _id: 'me'
            }
          }
        }
      };

      renderWithProviders(
        <RouterContext.Provider value={router}>
          <SettingsPage />
        </RouterContext.Provider>
        , preloadState);

      const updateButton = screen.getByTestId('aply-changes');
      expect(updateButton).toBeInTheDocument();

      const spyClick = jest.fn();
      updateButton.onclick = spyClick;
      await act(async () => {
        fireEvent.click(updateButton);
      });

      expect(spyClick).toHaveBeenCalled();
    });
  });
});
