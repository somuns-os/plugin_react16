export const routerConfig = [
  {
    path: '/login',
    component: () => import('../pages/login/login.jsx')
  },
  {
    path: '/home',
    component: () => import('../pages/home-page.jsx'),
    auth: true
  }
]
