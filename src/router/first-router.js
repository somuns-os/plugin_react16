import asyncComponent from '@/utils/asyncComponent'

export default [
  {
    path: '/login',
    component: asyncComponent(() => import('@/pages/login/login'))
  },
  {
    path: '/signup',
    component: asyncComponent(() => import('@/pages/signup/signup'))
  },
  {
    path: '/modPassword',
    component: asyncComponent(() => import('@/pages/ModifyPassword/ModifyPassword'))
  },
  {
    path: '/home',
    redirect: '/home/pages',
    component: asyncComponent(() => import('@/pages/HomePage/HomePage')),
    auth: false
  },
  {
    path: '/404',
    component: asyncComponent(() => import('@/pages/NotFound')),
    auth: false
  }
]
