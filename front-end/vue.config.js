module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000,
    // API 요청의 URL에 특정 패턴을 적용, 모든 API 요청은 /api/ 경로로 시작하게 만든다.
    // 이런 방식이라면 API 요청을 확인하는 데 http-proxy-middleware의 컨텍스트 매칭 기능을 활용할 수 있다.
    // http-proxy-middleware 는 URI를 연결해주는 다른방법도 지원한다. 깃허브 문서 확인
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080'
      }
    }
  },
  configureWebpack: {
    entry: {
      app: './src/main.js',
      // 웹팩에 새로운 진입점을 만들어서 모든 서드파티 스타일을 하나의 .css 파일로 묶는다.
      // 필요할 때마다 서드 파티 라이브러리의 스타일을 이곳에 추가할 것이다.
      style: [
        'bootstrap/dist/css/bootstrap.min.css'
      ]
    }
  }
}
