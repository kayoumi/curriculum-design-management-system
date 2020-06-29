import Loadable from 'react-loadable'
import { Loading } from '../components'

const Login = Loadable({
  loader: () => import('./login'),
  loading: Loading
})
const Home = Loadable({
  loader: () => import('./public/home'),
  loading: Loading
})
const Student = Loadable({
  loader: () => import('./admin/student'),
  loading: Loading
})
const Teacher = Loadable({
  loader: () => import('./admin/teacher'),
  loading: Loading
})
const TeacherEdit = Loadable({
  loader: () => import('./admin/teacher/edit'),
  loading: Loading
})
const Course = Loadable({
  loader: () => import('./admin/course'),
  loading: Loading
})
const CourseEdit = Loadable({
  loader: () => import('./admin/course/edit'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./public/notFound'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./public/noAuth'),
  loading: Loading
})
const Profile = Loadable({
  loader: () => import('./public/profile'),
  loading: Loading
})
const Notifications = Loadable({
  loader: () => import('./public/notifications'),
  loading: Loading
})
const TeacherGroup = Loadable({
  loader: () => import('./teacher/group'),
  loading: Loading
})
const TeacherTopic = Loadable({
  loader: () => import('./teacher/topic'),
  loading: Loading
})
const TeacherAchievement = Loadable({
  loader: () => import('./teacher/achievement'),
  loading: Loading
})
const TeacherAttendance = Loadable({
  loader: () => import('./teacher/attendance'),
  loading: Loading
})
const TeacherGrade = Loadable({
  loader: () => import('./teacher/grade'),
  loading: Loading
})
const StudentGroup = Loadable({
  loader: () => import('./student/group'),
  loading: Loading
})
const StudentGroupMember = Loadable({
  loader: () => import('./student/groupMember'),
  loading: Loading
})
const StudentTopic = Loadable({
  loader: () => import('./student/topic'),
  loading: Loading
})
const StudentAchievement = Loadable({
  loader: () => import('./student/achievement'),
  loading: Loading
})
const StudentEvaluate = Loadable({
  loader: () => import('./student/evaluate'),
  loading: Loading
})
const StudentGrade = Loadable({
  loader: () => import('./student/grade'),
  loading: Loading
})
export {
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
  TeacherAchievement,
  TeacherAttendance,
  TeacherGrade,
  StudentGroup,
  StudentGroupMember,
  StudentTopic,
  StudentAchievement,
  StudentEvaluate,
  StudentGrade,
}
