export const routerConfig = [
  {
    path: '/login',
    component: () => import('../pages/login/login')
  },
  {
    path: '/signup',
    component: () => import('../pages/signup/signup')
  },
  {
    path: '/home',
    component: () => import('../pages/HomePage'),
    auth: true
  },
  {
    path: '/404',
    component: () => import('../pages/NotFound'),
    auth: true
  }
]
