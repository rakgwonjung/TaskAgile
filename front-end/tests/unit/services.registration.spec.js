import moxios from 'moxios'
import registrationService from '@/services/registration'

describe('services/registration', () => {
  beforeEach(() => {
    // 테스트를 위한 mock 생성
    moxios.install()
  })

  afterEach(() => {
    // 사용한 mock 제거
    moxios.uninstall()
  })

  it('should pass the response to caller when request succeeded', () => {
    // expect.assertions() jest API 를 활용, 이 API는 어설션(assertion)이 호출되는 횟수를 검증
    // 이 것은 테스트하는 메소드가 프로미스를 반활할 때 유용하다
    expect.assertions(2)
    // moxios.wait() 메소드로 목 요청이 만들어질 때까지 기다린다
    // 이 메소드는 setTimeout()을 기반으로 구현
    moxios.wait(() => {
      // 가장 최근의 요청을 가져온다
      let request = moxios.requests.mostRecent()
      // toBeTruthy() 제스트의 API로 최근 요청이 존재하는지 검증
      // 따라서 axios의 요청이 정말로 실행되는지 확인할 수 있다.
      expect(request).toBeTruthy()
      // moxios 요청에 대한 응답 지정
      request.respondWith({
        status: 200,
        response: {result: 'success'}
      })
    })
    // register() 메소드가 성공적인 응답을 받았는지 확인
    // 프로미스를 활용하기 때문에 프로미스가 이행(resolve)될 때까지 제스트가 기다릴 수 있도록 테스트 메소드의 결과로 프로미스를 반환해야 한다.
    // 실패하면 테스트는 자동으로 실패
    return registrationService.register().then(data => {
      expect(data.result).toEqual('success')
    })
  })

  it('should propagate the error to caller when request failed', () => {
    expect.assertions(2)
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request).toBeTruthy()
      // respondWith() 대신 moxios의 request.reject() API를 활용, then -> catch
      request.reject({
        status: 400,
        response: {message: 'Bad request'}
      })
    })
    return registrationService.register().catch(error => {
      expect(error.response.message).toEqual('Bad request')
    })
  })
})