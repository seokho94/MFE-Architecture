const routes = [
  { path: "/users", element: () => import('../App.tsx') },
  { path: "/test", element: () => import('../pages/TestPage.tsx') },
  { path: "*", element: <div>404 Not Found</div> },
];
export default routes;