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
    title: "Agenda",
    color: "text.primary",
    url: "/schedule/careers/",
    icon: <School sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Tablero Kanban",
    color: "text.primary",
    url: "/tools/kanban/",
    icon: <Task sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Sesiones",
    color: "text.primary",
    url: "/tools/sessions/",
    icon: <Timelapse sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Perfil",
    color: "text.primary",
    url: "/tools/profile/",
    icon: <Person sx={{ color: "text.primary" }} />,
  },
  {
    inactiveColor: "text.primary.dark",
    title: "Configuración",
    color: "text.primary",
    url: "/tools/settings/",
    icon: <Settings sx={{ color: "text.primary" }} />,
  },
];
