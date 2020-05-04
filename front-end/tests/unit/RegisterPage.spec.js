// 마운트와 렌더링이 완료된 RegisterPage.vue 컴포넌트를 포함하는 Wrapper 객체를 생성한다
// createLocalVue 로컬 뷰를 생성, 로컬 뷰는 전역 Vue클래스에 영향을 주지 않는다
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import RegisterPage from '@/views/RegisterPage'
import registrationService from '@/services/registration'

// vm.$router에 접근할 수 있도록
// 테스트에 Vue Router 추가
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuelidate)
const router = new VueRouter()

// registrationService 목
jest.mock('@/services/registration')

describe('RegisterPage.vue', () => {
    let wrapper
    let fieldUsername
    let fieldEmailAddress
    let fieldPassword
    let buttonSubmit
    let registerSpy

    // 로컬 Vue 인스턴스와 router 인스턴스를 mount 함수에 제공해 wrapper를 생성
    // 여기서 router 인스턴스는 로그인 페이지로 리다이렉션이 발생 했는지 확인하는데 필요
    beforeEach(() => {
        wrapper = mount(RegisterPage, {
            localVue,
            router
        })
        // wrapper.find()는 선택자에 해당하는 HTML 요소를 찾아주는 vue-test-utils의 API다
        fieldUsername = wrapper.find('#username')
        fieldEmailAddress = wrapper.find('#emailAddress')
        fieldPassword = wrapper.find('#password')
        buttonSubmit = wrapper.find('form button[type="submit"]')
        // Create spy for registration service
        // 테스트 스위트(test suite) 레벨로 옮겨서 해당 명세에 있는 모든 테스트에서 registerSpy를 활용
        registerSpy = jest.spyOn(registrationService, 'register')
    })

    afterEach(() => {
        registerSpy.mockReset()
        registerSpy.mockRestore()
    })
    
    // jest.restoreAllMocks() 메소드를 호출해서 registrationService를 복구한다.
    // afterAll() 메소드는 파일에 있는 모든 테스트의 실행이 완료되면 호출
    afterAll(() => {
        jest.restoreAllMocks()
    })

    it('should render registeration form', () => {
        expect(wrapper.find('.logo').attributes().src).toEqual('/images/logo.png')
        expect(wrapper.find('.tagline').text()).toEqual('Open source task management tool')
        expect(fieldUsername.element.value).toEqual('')
        expect(fieldEmailAddress.element.value).toEqual('')
        expect(fieldPassword.element.value).toEqual('')
        expect(buttonSubmit.text()).toEqual('Create account')
    })

    // 데이터 모델의 초깃값을 검증
    // vm의 모든메소드와 프로퍼티에 접근가능
    it('should contain data model with initial values', () => {
        expect(wrapper.vm.form.username).toEqual('')
        expect(wrapper.vm.form.emailAddress).toEqual('')
        expect(wrapper.vm.form.password).toEqual('')
    })

    // 입력과 데이터의 모델 바인딩을 검증하는 테스트
    it('should have form inputs bound with data model', () => {
        const username = 'test'
        const emailAddress = 'test@test.com'
        const password = 'test'
    
        wrapper.vm.form.username = username
        wrapper.vm.form.emailAddress = emailAddress
        wrapper.vm.form.password = password
        expect(fieldUsername.element.value).toEqual('')
        expect(fieldEmailAddress.element.value).toEqual('')
        expect(fieldPassword.element.value).toEqual('')
    })

    // 제출 핸들러의 존재여부를 확인
    it('should have form submit event handler `submitForm`', () => {
        const stub = jest.fn()
        wrapper.setMethods({submitForm: stub})
        buttonSubmit.trigger('submit')
        expect(stub).toBeCalled()
    })

    // 성공적인 회원가입을 검증하는 테스트
    it('should register when it is a new user', () => {
        // expect.assertions() jest API 를 활용, 이 API는 어설션(assertion)이 호출되는 횟수를 검증
        // 이 것은 테스트하는 메소드가 프로미스를 반활할 때 유용하다
        expect.assertions(2)
        const stub = jest.fn()
        // vm.$router의 push() 메소드 스텁을 만들어서 리다이렉트가 발생했는지 확인
        wrapper.vm.$router.push = stub
        wrapper.vm.form.username = 'sunny'
        wrapper.vm.form.emailAddress = 'sunny@taskagile.com'
        wrapper.vm.form.password = 'JestRocks!'
        // submitForm 메소드를 호출해서 폼을 제출
        wrapper.vm.submitForm()
        expect(registerSpy).toBeCalled()
        // registrationService.register() 메소드는 프로미스 기반이기 때문에 vm.$nextTick()에 expect 구문을 넣어야한다.
        // 그렇지 않으면 테스트는 항상 실패
        wrapper.vm.$nextTick(() => {
            expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
        })
    })

    // 회원가입 실패 검증 테스트
    it('should fail it is not a new user', () => {
        // expect.assertions() jest API 를 활용, 이 API는 어설션(assertion)이 호출되는 횟수를 검증
        // 이 것은 테스트하는 메소드가 프로미스를 반활할 때 유용하다
        expect.assertions(3)
        // In the mock, only sunny@taskagile.com is new user
        wrapper.vm.form.username = 'ted'
        wrapper.vm.form.emailAddress = 'ted@taskagile.com'
        wrapper.vm.form.password = 'JestRocks!'
        expect(wrapper.find('.failed').isVisible()).toBe(false)
        wrapper.vm.submitForm()
        expect(registerSpy).toBeCalled()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.failed').isVisible()).toBe(true)
        })
    })

    it('should fail when the email address is invalid', () => {
        wrapper.vm.form.username = 'test'
        wrapper.vm.form.emailAddress = 'bad-email-address'
        wrapper.vm.form.password = 'JestRocks!'
        wrapper.vm.submitForm()
        expect(registerSpy).not.toHaveBeenCalled()
    })

    it('should fail when the username is invalid', () => {
        wrapper.vm.form.username = 'a'
        wrapper.vm.form.emailAddress = 'test@taskagile.com'
        wrapper.vm.form.password = 'JestRocks!'
        wrapper.vm.submitForm()
        expect(registerSpy).not.toHaveBeenCalled()
    })

    it('should fail when the password is invalid', () => {
    wrapper.vm.form.username = 'test'
    wrapper.vm.form.emailAddress = 'test@taskagile.com'
    wrapper.vm.form.password = 'bad!'
    wrapper.vm.submitForm()
    expect(registerSpy).not.toHaveBeenCalled()
    })
})