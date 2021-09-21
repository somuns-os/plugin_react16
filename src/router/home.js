import asyncComponent from '@/utils/asyncComponent'

export default [
  {
    path: '/home/pages',
    title: '首页',
    component: asyncComponent(() => import('@/pages/Home/Home')),
    auth: false
  },
  {
    path: '/home/editor',
    title: '富文本编辑',
    component: asyncComponent(() => import('@/pages/ModifyPassword/ModifyPassword')),
    auth: false,
    children: [
      {
        path: '/home/editor/1',
        title: '富文本',
        component: asyncComponent(() => import('@/pages/ModifyPassword/ModifyPassword'))
      }
    ]
  }
]
