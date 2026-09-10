import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Video from "./Video";
import Login from "./Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/url",
        element: <App />,
    },
    {
        path: "/video",
        element: <Video />,
    },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
