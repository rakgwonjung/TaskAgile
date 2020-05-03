// 제스트를 활용하므로 목을 의존하는 객체와 같은 디렉터리에 있는 __mocks__ 폴더에 놓아야한다.
export default {
    register (detail) {
      return new Promise((resolve, reject) => {
        detail.emailAddress === 'test@gmail.com'
          ? resolve({result: 'success'})
          : reject(new Error('User already exist'))
      })
    }
  }