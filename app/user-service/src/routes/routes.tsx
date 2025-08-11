import { lazy } from "react";
const UserPage = lazy(() => import("../App.tsx"));

const routes = [
  { path: "/users", element: <UserPage /> },
  { path: "*", element: <div>404 Not Found</div> },
];
export default routes;