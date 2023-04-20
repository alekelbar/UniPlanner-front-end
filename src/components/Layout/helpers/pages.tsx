import { Person, School, Settings, Task, Timelapse } from "@mui/icons-material";

interface Page {
  title: string;
  url: string;
  color: string;
  inactiveColor: string;
  icon: React.ReactNode;
}

export const pages: Page[] = [
  {
    inactiveColor: "text.primary.dark",
    title: "Carreras",
    color: "text.primary",
    url: "careers/",
    icon: <School sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Tablero Kanban",
    color: "text.primary",
    url: "kanban/",
    icon: <Task sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Sesiones",
    color: "text.primary",
    url: "sessions/",
    icon: <Timelapse sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Perfil",
    color: "text.primary",
    url: "profile/",
    icon: <Person sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Configuración",
    color: "text.primary",
    url: "settings/",
    icon: <Settings sx={{ color: "text.primary" }} />,
  },
];
