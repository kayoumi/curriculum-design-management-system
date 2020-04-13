import Loadable from 'react-loadable'
import { Loading } from '../components'

// import Login from './login'
// import Student from './student'
// import Teacher from './teacher'
// import Course from './course'
// import NotFound from './notFound'

const Login = Loadable({
  loader: () => import('./login'),
  loading: Loading
})
const Student = Loadable({
  loader: () => import('./student'),
  loading: Loading
})
const Teacher = Loadable({
  loader: () => import('./teacher'),
  loading: Loading
})
const Course = Loadable({
  loader: () => import('./course'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./notFound'),
  loading: Loading
})

export {
  Login,
  Student,
  Teacher,
  Course,
  NotFound
}
