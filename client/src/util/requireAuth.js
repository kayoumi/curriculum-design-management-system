const requireAuth = (nextState, replace, cb) => {
  if(sessionStorage.getItem('token')){
    cb()
  } else {
    replace('/login')
    cb()
  }
}

export default requireAuth
