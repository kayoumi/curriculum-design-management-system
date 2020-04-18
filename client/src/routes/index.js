import {
  Login,
  Student,
  Teacher,
  TeacherEdit,
  Course,
  NotFound,
  NoAuth,
  Profile,
  Notifications,
} from '../pages'

export const mainRoutes = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [{
    pathname: '/admin',
    component: Course,
    exact: true,
    roles: ['001']
}, {
  pathname: '/admin/student',
  component: Student,
  exact: true,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/teacher',
  component: Teacher,
  exact: true,
  roles: ['001', '002']
}, {
  pathname: '/admin/teacher/edit/:id',
  component: TeacherEdit,
  roles: ['001', '002']
}, {
  pathname: '/admin/course',
  component: Course,
  roles: ['001']
}, {
  pathname: '/admin/noauth',
  component: NoAuth,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/profile',
  component: Profile,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/notifications',
  component: Notifications,
  roles: ['001', '002', '003']
}
]

