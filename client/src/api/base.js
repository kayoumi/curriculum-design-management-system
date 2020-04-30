const base = {
  login: '/login', // 用户登录
  timeToken: '/logintoken', // 获取登录时间密钥
  getUserInfo: '/getUserInfo', // 获取用户信息
  // 通知中心
  getNotifications: '/getNotifications', // 获取消息列表
  // 教师
  getTeacherList: '/getTeacherList', // 教师列表
  getTeacherInfoById: '/getTeacherInfoById', // 教师详情
  addTeacher: '/addTeacher', // 添加教师信息
  updateTeacherInfo: '/updateTeacherInfo', // 修改教师信息
  deleteTeacherInfo: '/deleteTeacherInfo', // 删除教师信息
  bulkDeleteTeacher: '/bulkDeleteTeacher', // 批量删除教师
  bulkAddTeacher: '/bulkAddTeacher', // 批量添加教师
  searchTeacherByName: '/searchTeacherByName', // 搜索教师
  // 学生
  getStudentList: '/getStudentList', // 学生列表
  getStudentInfoById: '/getStudentInfoById', // 学生详情
  addStudentInfo: '/addStudentInfo', // 添加学生信息
  updateStudentInfo: '/updateStudentInfo', // 修改学生信息
  deleteStudentInfo: '/deleteStudentInfo', // 删除学生信息
  searchStudentByName: '/searchStudentByName', // 搜索学生
  // 课程
  getCourseList: '/getCourseList', // 获取课程列表
  getCourseInfoById: '/getCourseInfoById', // 课程详情
  searchCourseByName: '/searchCourseByName', // 搜索课程
  deleteCourseInfo: '/deleteCourseInfo', // 删除课程
  addCourse: '/addCourse', // 删除课程
}

export default base