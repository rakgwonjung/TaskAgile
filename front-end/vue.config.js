module.exports = {
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
  }
}
