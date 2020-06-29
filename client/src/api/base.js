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


  // 学生小组
  getGroupList: '/getGroupList', // 获取小组列表
  joinGroup: '/joinGroup', // 加入小组
  getGroupMember: '/getGroupMember', // 获取小组成员
  // 学生自我评价
  getEvaluateData: '/getEvaluateData', // 获取自我评价
  editEvaluate: '/editEvaluate', // 编辑自我评价
  // 学生成绩
  getGradeData: '/getGradeData', // 获取学生成绩
  // 学生课题
  getTopicList: '/getTopicList', // 获取课题列表
  choiceTopic: '/choiceTopic', // 选择课题
  searchTopic: '/searchTopic', // 搜索课题
  

  // 教师小组
  getCourseListTeacher: '/getCourseListTeacher', // 获取小组列表
  getGroupMemberById: '/getGroupMemberById',
  getGroupListTree: '/getGroupListTree',
  deleteGroup: '/deleteGroup', // 删除小组
  deleteMember: '/deleteMember', // 删除组员
  searchGroup: '/searchGroup', // 搜索小组
  searchMember: '/searchMember', // 搜索组员

  // 教师成绩
  getGradeListTree: '/getGradeListTree', // 获取成绩列表
  getAchievementByStudentId: '/getAchievementByStudentId', // 获取学生成果等信息
  getClassList: '/getClassList', // 获取班级列表
  getStudentListByClassId: '/getStudentListByClassId', // 通过班级id获取学生列表
}

export default base