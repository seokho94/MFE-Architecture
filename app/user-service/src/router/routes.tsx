const routes = [
  { path: "", element: () => import('../App.tsx') },
  { path: "/service", element: () => import('../pages/UserServicePage.tsx') },
  { path: "/test", element: () => import('../pages/TestPage.tsx') },
  { path: "*", element: <div>404 Not Found</div> },
];
export default routes;