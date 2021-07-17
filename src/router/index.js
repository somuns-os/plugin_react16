import asyncComponent from '@/utils/asyncComponent'
import homeRouter from './home'
import loginRouter from './first-router'


const routers = [
  ...loginRouter,
  ...homeRouter
]

export default routers
