import {
  Login,
  Student,
  Teacher,
  Course,
  NotFound
} from '../pages'

// import Layout from '../components/layout'

export const mainRouter = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRouter = [{
  pathname: '/admin/student',
  component: Student,
  // exact: true
// }, {
//   pathname: '/admin/student/add',
//   component: StudentAdd,
// }, {
}, {
  pathname: '/admin/teacher',
  component: Teacher
}, {
  pathname: '/admin/course',
  component: Course
},]