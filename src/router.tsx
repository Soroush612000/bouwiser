import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyProjects from "./pages/MyProjects";
import ProjectDetails from "./pages/ProjectDetails";
import AIScan from "./pages/AIScan.tsx";
import Energy from "./pages/Energy";
import AIAssistant from "./pages/AIAssistant";
import Products from "./pages/Products";
import Compare from "./pages/Compare";
import Hub from "./pages/Hub";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyHome from "./pages/MyHome";
import Reports from "./pages/Reports";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },

  { path: "/projects", element: <MyProjects /> },
  { path: "/projects/:id", element: <ProjectDetails /> },

  { path: "/my-home", element: <MyHome /> },

  { path: "/ai-scan", element: <AIScan /> },
  { path: "/energy", element: <Energy /> },
  { path: "/ai", element: <AIAssistant /> },

  { path: "/products", element: <Products /> },
  { path: "/compare", element: <Compare /> },

  { path: "/reports", element: <Reports /> },

  { path: "/hub", element: <Hub /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);