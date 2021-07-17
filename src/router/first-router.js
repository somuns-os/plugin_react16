import asyncComponent from '@/utils/asyncComponent'

export default [
  {
    path: '/',
    redirect: '/login'
  },
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
    component: asyncComponent(() => import('@/pages/Layout/Layout')),
    auth: false
  },
  {
    path: '/404',
    component: asyncComponent(() => import('@/pages/NotFound')),
    auth: false
  }
]
