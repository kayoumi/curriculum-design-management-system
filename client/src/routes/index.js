import {
  Login,
  Home,
  Student,
  Teacher,
  TeacherEdit,
  Course,
  CourseEdit,
  NotFound,
  NoAuth,
  Profile,
  Notifications,
  TeacherGroup,
  TeacherTopic,
  TeacherGrade,
  TeacherAttendance,
  TeacherAchievement,
  StudentGroup,
  StudentGroupMember,
  StudentTopic,
  StudentGrade,
  StudentEvaluate,
  StudentAchievement,
  
  
} from '../pages'

export const mainRoutes = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [{
    pathname: '/back',
    component: Home,
    exact: true,
    roles: ['001', '002', '003']
}, {
  pathname: '/back/noauth',
  component: NoAuth,
  exact: true,
  roles: ['001', '002', '003']
}, {
  pathname: '/back/profile',
  component: Profile,
  exact: true,
  roles: ['001', '002', '003']
}, {
  pathname: '/back/notifications',
  component: Notifications,
  exact: true,
  roles: ['001', '002', '003']
}, {
  pathname: '/back/admin/student',
  component: Student,
  exact: true,
  roles: ['001']
}, {
  pathname: '/back/admin/teacher',
  component: Teacher,
  exact: true,
  roles: ['001']
}, {
  pathname: '/back/admin/teacher/edit/:id',
  component: TeacherEdit,
  roles: ['001']
}, {
  pathname: '/back/admin/course',
  component: Course,
  exact: true,
  roles: ['001']
}, {
  pathname: '/back/admin/course/edit/:id',
  component: CourseEdit,
  roles: ['001']
}, {
  pathname: '/back/teacher/group',
  component: TeacherGroup,
  roles: ['002']
}, {
  pathname: '/back/teacher/topic',
  component: TeacherTopic,
  roles: ['002']
}, {
  pathname: '/back/teacher/achievement',
  component: TeacherAchievement,
  roles: ['002']
}, {
  pathname: '/back/teacher/grade',
  component: TeacherGrade,
  roles: ['002']
}, {
  pathname: '/back/teacher/attendance',
  component: TeacherAttendance,
  roles: ['002']
}, {
  pathname: '/back/student/group',
  component: StudentGroup,
  roles: ['003']
}, {
  pathname: '/back/student/member',
  component: StudentGroupMember,
  roles: ['003']
}, {
  pathname: '/back/student/topic',
  component: StudentTopic,
  roles: ['003']
}, {
  pathname: '/back/student/achievement',
  component: StudentAchievement,
  roles: ['003']
}, {
  pathname: '/back/student/grade',
  component: StudentGrade,
  roles: ['003']
}, {
  pathname: '/back/student/evaluate',
  component: StudentEvaluate,
  roles: ['003']
}

]

