import asyncComponent from '@/utils/asyncComponent'

export const homeChildConfig = [
  {
    path: '/home/pages',
    component: asyncComponent(() => import('@/pages/Home/Home'))
  }
]
