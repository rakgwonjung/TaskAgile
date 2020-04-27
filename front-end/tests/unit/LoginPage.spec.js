import Vue from 'vue'
import LoginPage from '@/views/LoginPage'

// jest의 describe(name, fn) API로 관련 된 테스트를 함께 모아 하나의 테스트 스위트(test suite)를 만든다
describe('LoginPage.vue', () => {
  // it(name, fn, timeout) 함수는 제스트 API인 test(name, fn, timeout)의 별명이다.
  // 첫번째 변수는 테스트 명이다. 두 번째 변수는 테스트의 예상 값을 포함하는 함수다.
  // 세번 째 변수는 타임아웃의 밀리초 값이며 생략 가능(기본 값 5초)
  it('should render correct contents', () => {
    // vue의 하위 클래스인 LoginPage를 생성한다.
    const Constructor = Vue.extend(LoginPage)
      // LoginPage 의 Vue 인스턴스를 생성한 다음 부착한다.
      // $mount() 메소드가 호출되면 LoginPage Vue 인스턴스가 마치 페이지에 렌더링된 것으로 생각 할 수 있다.
      const vm = new Constructor().$mount()
      // jest API인 expect().toEqual()로 페이지에 있는 <h1> 태그의 텍스트 내용이 TaskAgile 값인지 확인한다.
      // vm.$el은 Vue 인스턴스인 vm이 관리하는 루트 DOM 요소다.
      // 여기서는 자바스크립트의 내장 클래스 element의 인스턴스인 <div> 래퍼를 의미한다.
      // .querySelector('h1'> 메소드 <h1> 요소를 찾는데 사용된다.
      expect(vm.$el.querySelector('h1').textContent)
        .toEqual('TaskAgile')
  })
})
