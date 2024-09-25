import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

// Create a router instance with routes defined
const router = createBrowserRouter([
  {
    // Root path, renders the Layout component
    path: "",
    element: <Layout />,
    children: [
      {
        // Login page route, renders the Login component
        path: "",
        element: <Login />,
      },
      {
        // Register page route, renders the Register component
        path: "register",
        element: <Register />,
      },
      {
        // Protected routes
        element: <ProtectedRoutes />,
        children: [
          {
            // Home page route, renders the Home component
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

// Render the App component with the router instance
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
