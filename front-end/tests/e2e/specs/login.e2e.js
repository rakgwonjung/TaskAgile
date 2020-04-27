// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
// nightwatch 테스트 모듈
// 하나의 나이트왓치 테스트는 여러개의 스텝을 포함할 수 있다.
// 각 스텝은 사실 모듈에 속한 하나의 메소드다. 각 메소드는 browser를 매개변수로 받는다.
// browser는 나이트왓치가 제공하는 매개변수이며 브라우저를 제어하는 데 활용한다.
module.exports = {
  'login test': function (browser) {
    browser
      // .url 메소드를 호출해서 로그인 페이지를 연다
      // 로그인 페이지는 개발 서버에 의해 서비스되며, 개발서버는 @vue/cli-service로 시작한다.
      .url(process.env.VUE_DEV_SERVER_URL + 'login')
      // waitForElementVisible() 메소드로 #app 요소가 5초안에 보이는지 검증한다
//      .waitForElementVisible('#app', 5000)
      .waitForElementPresent('#app', 5000)
      // 나이트 왓치의 assert API로 <h1> 요소가 'TaskAgile' 텍스트를 포함하는지 검증. 이 것은 LoginPage.spec.js 파일에서 했던 것과 같은 검증이다.
      .assert.containsText('h1', 'TaskAgile')
      // end() 메소드로 테스트를 종료하고 셀레니움(Selenium) 세션을 적절하게 종료한다.
      .end()
  }
}
