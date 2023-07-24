
class KurlyComponent extends React.Component {

    constructor(props){
        super(props);
        this.isIdRef = React.createRef();
       
        this.state = {
            회원: [], //데이터베이스 데이터 모두 여기에 저장
            아이디:'',
            비밀번호:'',
            비밀번호확인:'',
            비밀번호체크: false,
            이름:'',
            이메일:'',
            이메일확인: false,
            휴대폰:'',
            휴대폰인증:'',
            phoneKey:'123456',  //인증키 응답파일
            seconds: 59,  //0~59 1분
            minutes: 2,   //2분
            setId: 0,     //setInterval() 타임변수
            okCnt: 0,   //인증번호 클릭 횟수


            생년:'',
            생월:'',
            생일:'',
            생년월일:'',
            

            // 라디오버튼에서 곧바로 체크드 한다.
            // 성별안에 값과 체크한 값이 같으면 true 아니면 false
            성별:'선택안함',
            추가입력사항:'',
            약관동의: [],

            isAddressOpen: false,
            isPostcodeOpen: false,

            우편번호:'',
            주소1:'',
            주소2:'',
            주소:'',

            phoneCheck: false, //휴대폰인증 입력상자와 버튼 숨기기
            isPhoneCheckClass: true, //버튼 클래스 스타일
            disabled1: false,
            disabled2: false,
            timerBoxShow: true,


            // 가이드텍스트 박스 : 포커스 이벤트
            isInputLimitTextId: false,
            isInputLimitTextIdPw: false,
            isInputLimitTextPwConfirm: false,

            // 가이드 클래스 속성 : 정규표현식으로 이벤트
            isOnId: '', //'', true, false           
            isOnId2: '', //'', true, false           
            isOnPw10: '',
            isOnPw: '',
            isOnPwNum: '', 
            isOnPwConfirm: '', 
            isPhoneClass: true,
            isPhoneClass2: false,

            isOnPwEnNumSp: '', 
            isOnPwConfirmpeat3: '', 

            //모달창 멤버
            isModalOpen: false,
            modalText:'',

            //날짜 이벤트 : 
            // 포커스 아웃(onBlur), 포커스 인(onFocus) 발생하면 함수에서 정규표현식 구현
            isInputLimitTextDatebox: false, //오류 발생시 true 변환 보인다.
            isOnDate: '', //true 공백 false 오류 발생
            guidTextDate: '', //가이드 텍스트 오류 내용

            //추가 입력사항
            addItem: false,  //임시보이게
            placeholderText:'',
            추가입력:''

        }
    }

    onFocusId=()=>{
        this.setState({isInputLimitTextId: true});
    }

    onChangeId=(value)=>{
        const regExpId = /^((?=.*[A-Za-z])+(?=.*[0-9])*)+[A-Za-z0-9]{6,}$/g;
        //정규표현식 RegExp을 이용 입력된 값과 비교 
        //정규표현식.test(입력값) 메서드 사용 점검 참(true) 거짓이면(false)
        this.setState({아이디: value});
        this.idimsi = value;

        if(value===''){
            this.setState({
                isOnId: '',
                isOnId2: ''
            });
        }
        else{  
            if( regExpId.test(value) ){
                this.setState({
                    isOnId: true
                });
            }
            else{
                this.setState({
                    isOnId: false,
                    isOnId2: false,
                });
            }
        }       
    }
    //중복검사 가능하도록 함수를 사용하고
    //그리고 함수에 입력값을 매개변수로 전달해준다




    //아이디 중복확인 버튼 클릭 이벤트
    onClickIdDoubleCheck=(e)=>{
        e.preventDefault();

        let imsi = [];
            // imsi = this.state.회원;

        for(let i=0; i<localStorage.length; i++){
            imsi.push( JSON.parse(localStorage.getItem(localStorage.key(i))) );
        }

        if(this.state.아이디===''){
            this.setState({
                isModalOpen: true,
                modalText: '아이디를 입력하세요.'
            });
        }
        else{
            const regExpId = /^((?=.*[A-Za-z])+(?=.*[0-9])*)+[A-Za-z0-9]{6,}$/g;
            if( regExpId.test(this.state.아이디) ){
                this.setState({isOnId: true});
                //아이디가 정규표현식 오류가 없으면 
                //중복검사
                //this.idimsi 전역변수
                let result = imsi.map((item)=>item.아이디===this.idimsi); //리턴값이 false 또는 true
                    // if( result.indexOf(true) ){  //중복된 아이디가 있다면(배열안에 true가 포함되 있냐?)
                    if( result.includes(true) ){  //중복된 아이디가 있다면(배열안에 true가 포함되 있냐?)
                        this.setState({
                            isOnId2: false,
                            isModalOpen: true,
                            modalText: '중복된 아이디입니다.'
                        });
                        return;
                    }
                    else{          
                        this.setState({
                            isOnId2: true,
                            isModalOpen: true,
                            modalText: '사용가능한 아이디입니다.',
                        });
                        return;
                    }
            }
            else{
                this.setState({
                    isOnId: false,                    
                    isModalOpen: true,
                    modalText: '아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다.'
                });
                
            }
        }
    }

    //모달창 닫기 이벤트
    onClickModalClose=(e)=>{
        e.preventDefault();
        this.setState({isModalOpen: false});
    }

    onFocusPw=()=>{
        this.setState({isInputLimitTextIdPw: true});
    }

    onChangePw=(value)=>{
        
        this.setState({비밀번호: value});

        //10자이상 체크
        if(value===''){
            this.setState({isOnPw10: ''});
        }
        else{  
            if(/^.{10,}$/.test(value)){
                this.setState({isOnPw10: true});
            }
            else{
                this.setState({isOnPw10: false});
            }
        } 

        //(영문1자이상)+(숫자1자이상+|특수문자1자이상+)+ 공백문자제외 2개이상 조합
        // /^((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[\!\@\#\$\%\*])+)+)[A-Za-z0-9\!\@\#\$\%\*]{10,}$/g
        if(value===''){
            this.setState({isOnPw: ''});
        }
        else{  
            // if(/^((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\]\{\}\'\"\;\:\/\?\.\,\<\>])+)+)[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\]\{\}\'\"\;\:\/\?\.\,\<\>]{10,}$/g.test(value)){
            if(/^((?=.*[A-Za-z])+((?=.*\d)+|(?=.*[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\]\{\}\'\"\;\:\/\?\.\,\<\>])+)+)[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\]\{\}\'\"\;\:\/\?\.\,\<\>]{10,}$/g.test(value)){
                this.setState({isOnPw: true});
            }
            else{
                this.setState({isOnPw: false});
            }
        } 

        // 동일한 숫자 연속 3개 이상 사용불가
        // 
        if(value===''){
            this.setState({isOnPwNum: ''});
        }
        else{  
            // if(/(.)\1\1/g.test(value)){ //문자,숫자,특수문자,공백 3글자 연속검증 오류
            // if(/(\w)\1\1/g.test(value)){ //문자숫자 3글자 연속검증 오류
            // if(/([A-Za-z0-9])\1\1/g.test(value)){ //문자숫자 3글자 연속검증 오류
            // if(/([A-Za-z])\1\1/g.test(value)){ //문자 3글자 연속검증 오류
            // if(/([0-9])\1\1/g.test(value)){ //숫자(반드시 소괄호로 감싼다) 3글자 연속검증 오류
            if(/(\d)\1\1/g.test(value)){ //숫자(반드시 소괄호로 감싼다) 3글자 연속검증 오류
                this.setState({isOnPwNum: false});
            }
            else{
                this.setState({isOnPwNum: true});
            }
        } 

    }

    onFocusPwConfirm=()=>{
        this.setState({isInputLimitTextPwConfirm: true});
    }    
    onChangePwConfirm=(value)=>{
        this.setState({비밀번호확인: value});
        
        if( this.state.비밀번호확인==='' ){
            this.setState({isOnPwConfirm: ''});
        }
        else{
            if(this.state.비밀번호 === value){
                this.setState({isOnPwConfirm: true});
            }
            else{
                this.setState({isOnPwConfirm: false});
            }
        }


    }

    //이름
    onChangeName=(value)=>{
        this.setState({이름: value});
        // 정규표현식.test(문자열)
        // 문자열.replace(정규표현식, '')
        
        // 숫자만 자동삭제
        // 예문]/[0-9]/g
        // value.replace(/^[0-9]$/g, '');
        this.setState({이름: value.replace(/[^A-Z가-힣ㄱ-ㅎㅏ-ㅣ\s\d]*/gi,'') })
    }

    // 이메일
    onChangeEmail=(value)=>{
        this.setState({이메일: value});
        this.emailimsi = value;
    }

    //이메일 중복체크 클릭 이벤트
    onClickEmailCheck=(e)=>{
        e.preventDefault();

        let imsi = [];
            //imsi = this.state.회원;  //데이터베이스 데이터

        for(let i=0; i<localStorage.length; i++){
            imsi.push( JSON.parse(localStorage.getItem(localStorage.key(i))) );
        }

        const regExp = /^[A-Za-z0-9]([\-\_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([\-\_\.]?[A-Za-z])*.[A-Za-z]{2,3}$/g;

        if(this.state.이메일===''){
            this.setState({
                isModalOpen: true,
                modalText: '이메일 주소를 입력하세요!',
                이메일확인: false
            });
        }
        else{
            if( regExp.test(this.state.이메일) === false ){
                this.setState({
                    isModalOpen: true,
                    modalText: '이메일 주소를 확인하세요!',
                    이메일확인: false
                });                
            }
            else{
                                 
                //이메일이 정규표현식 오류가 없으면 
                //중복검사
                //this.idimsi 전역변수
                let result = imsi.map((item)=>item.이메일===this.emailimsi); //리턴값이 false 또는 true
                    // if( result.indexOf(true) ){  //중복된 아이디가 있다면(배열안에 true가 포함되 있냐?)
                    if( result.includes(true) ){  //중복된 아이디가 있다면(배열안에 true가 포함되 있냐?)
                        this.setState({
                            isModalOpen: true,
                            modalText: '중복된 이메일 입니다.'
                        });
                    }
                    else {
                        this.setState({
                            isModalOpen: true,
                            이메일확인: true,
                            modalText: '사용가능한 이메일 입니다.' 
                        }); 
                    }
            }
        }
    }


    onChangePhone=(value)=>{
        let result='';
        //숫자만 입력
        //나머진 자동 삭제
        result = value.replace(/^[^0-9]$/g,'');
        // 01079425305 / 11
        // 0107945305  / 10 
        this.setState({휴대폰: result });

        if(value.length>=10){
            this.setState({isPhoneClass: false}); //보라색
        }
        else{
            this.setState({isPhoneClass: true});  //비활성화 회색
        }
    }
    //휴대폰 인증 입력상자 이벤트
    onChangePhoneCheck=(value)=>{
        this.setState({ 휴대폰인증: value.replace(/^[^0-9]$/g, '') })
    }
    //휴대폰 버튼 클릭 이벤트
    onClickPhoneEvent=(e)=>{
        e.preventDefault();
        //휴대폰의 정규검사
        // 010-7942-5305
        // 010-794-5305
        // 01[06789]  010 016 017 018 019
        if(this.state.휴대폰.length<10){  //10글자 미만은 버튼클릭 취소
            return ;
        }

        if(this.state.휴대폰===''){
            this.setState({
                isModalOpen: true,
                modalText:'휴대폰 번호를 입력하세요!',
                isPhoneClass: false
            });
        }
        else{
            // if(/^01[06789]{1}[\d]{3,4}[\d]{4}$/g.test(this.state.휴대폰)){
            if(/^01[06789]{1}[0-9]{3,4}[0-9]{4}$/g.test(this.state.휴대폰)){
                this.setState({
                    isModalOpen: true,
                    modalText:'인증번호를 전송했습니다.',
                    phoneCheck: true,
                    disabled1: true,    //사용못함
                    isPhoneClass: true  //버튼 비활성화
                });

                // this.setState({okCnt: this.state.okCnt+1});
                
                sessionStorage.setItem('카운터', Number(sessionStorage.getItem('카운터'))+1);
                // localStorage.setItem('카운터', Number(localStorage.getItem('카운터'))+1);
                
                console.log( Number(sessionStorage.getItem('카운터')) );
                // console.log( Number(localStorage.getItem('카운터')) );

                if( Number(sessionStorage.getItem('카운터'))>10 ){
                // if( Number(localStorage.getItem('카운터'))>10 ){
                    this.setState({
                        isModalOpen: true,
                        modalText:'인증번호 발송 횟수가 10회를 초과하였습니다. 내일 다시 시도 해 주시기 바랍니다.',
                    });
                    return;
                }
                else{
                    //타임 카운터 구동
                    this.timeCounter();
                }

            }
            else{
                this.setState({
                    isModalOpen: true,
                    modalText:'휴대폰 번호를 확인하세요!',
                    isPhoneClass: false
                });
            }
        }
    }

    //휴대폰 인증 
    onClickPhoneCheckEvent=(e)=>{
        e.preventDefault();
        if( this.state.phoneKey===this.state.휴대폰인증 ){
            this.setState({
                isModalOpen: true,
                modalText:'인증을 성공했습니다.',
                disabled2: true,    //사용못함
                isPhoneClass2: true,  //버튼 비활성화
                timerBoxShow: false  //타이머 숨기기
            });
            //타이머 중지
            clearInterval(this.state.setId);

            return;
        }
        else{
            this.setState({
                isModalOpen: true,
                modalText:'인증번호를 확인해주세요',
                disabled2: false,
                isPhoneClass2: false
            });
            return;
        }
    }

    //타임 카운터
    timeCounter=()=>{
        let imsiId = 0;
    

        imsiId = setInterval(()=>{
            let {seconds, minutes, setId} = this.state;
            //초단위
            this.setState({
                seconds: seconds-1
            });
                if(seconds<=0){
                    this.setState({
                        seconds: 59,
                        minutes: minutes-1
                    });
                        if(minutes<=0){
                            clearInterval(setId);
                            this.setState({
                                seconds: 0,
                                minutes: 0,
                                isModalOpen: true,
                                modalText:'3분 인증 시간이 초과 되었습니다.',
                            });

                            return;
                        }
                }
        }, 1000);

        this.setState({setId: imsiId})
    }

    //데이터베이스 데이터 가져오기  
    //공공데이터
    // axiosDatabaseGet=()=>{
    //     axios({
    //         url:'./select_table_market_kerly.php',
    //         method:'GET'
    //     })
    //     .then((res)=>{
    //         // console.log('AXIOS 성공 : ', res );
    //         // console.log('AXIOS 성공 : ', res.data );
    //         this.setState({회원: res.data});
    //     })
    //     .catch((err)=>{
    //         console.log('AXIOS 실패 : ', err );
    //     });
    // }

    //컨스트럭터(Constructor()) > 멤버변수, 프롭스데이터 > 렌더함수 => 마운트 => componentDidMount();
    componentDidMount(){
        this.state.phoneCheck && this.timeCounter();     
        //데이터베이스 데이터 가져오기  
        // this.axiosDatabaseGet();
    }

    //컴포넌트가 소멸된 시점에(DOM에서 삭제된 후) 실행되는 메소드다.
    //컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용하다.
    componentWillUnmount(){
        clearInterval(this.state.setId);  //타이머 클린업
    }






    // 주소 /////////////////////////////////////////////
    //우편번호
    onChangeAddressZip=(value)=>{
        this.setState({우편번호: value});
    }
    //검색 주소
    onChangeAddress1=(value)=>{
        this.setState({주소1: value});
    }
    //나머지 주소
    onChangeAddress2=(value)=>{
        this.setState({주소2: value});
        this.setState({주소: `${this.state.우편번호} ${this.state.주소1} ${this.state.주소2} `});
    }

    //주소버튼 이벤트
    onClickAddressOpen=(e)=>{
        e.preventDefault();
        
        this.postfn(); //주소검색 메인함수 호출 실행

        this.setState({isAddressOpen: true});
        this.setState({isPostcodeOpen: true});
    }

    //주소받아오기함수
    onAddressHandle=(zip, roadAddress)=>{
        this.setState({우편번호: zip });
        this.setState({주소1: roadAddress });
        this.setState({isPostcodeOpen: false});
    }


    // 카카오주소검색 메인함수
    postfn=()=>{        
        const addressfn=(data)=>{
            this.onAddressHandle(data.zonecode, data.roadAddress);
        }
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                addressfn(data);
            }
        }).open();
    }







    onChangeGender=(value)=>{
        this.setState({성별: value});    
    }



    //포커스 아웃(onBlur) 그리고 포커스 인(onFoucus)
    birthYaerMonthDateCheck=()=>{

        //생년월일
        const year = new Date().getFullYear();
        const month = new Date().getMonth()+1; //0 ~ 11
        const date = new Date().getDate();

        //현재 날짜
        const birthYear = Number(this.state.생년);
        const birthMonth = Number(this.state.생월);
        const birthDate = Number(this.state.생일);

        //구현 날짜 계산식
        const birthDay = new Date( birthYear, birthMonth, birthDate ); 
        const nowDay14   = new Date( year-14, month, date);  //14세 미만 계산  변수
        const nowDay120   = new Date( year-120, month, date);  //120세 부터 생년월일 입력 가능한 변수
        const nowDay   = new Date( year, month, date);  //미래를 체크하기 위해서 오늘 현재 날짜 변수
        const lastDay = new Date(birthYear, birthMonth, 0).getDate();  //생일 말일




        if(this.state.생년==='' && this.state.생월==='' && this.state.생일==='' ){
            return;
        }
        else{

            //년 체크
            if(/(?:1[9][0-9][0-9]|2[0-9][0-9][0-9])/g.test(this.state.생년.trim())===false){ //년도 오류 메시지 show
                this.setState({isInputLimitTextDatebox: true});
                this.setState({isOnDate: false});  
                this.setState({guidTextDate: `태어난 년도 4자리를 정확하게 입력해주세요.`});  
                return;
            }
            else{  //년도 오류 메시지 hide
                this.setState({isInputLimitTextDatebox: false});
                this.setState({isOnDate: ''});  
                this.setState({guidTextDate: ``});

                //년도 끝나고 > 월 체크
                if(/(?:0?[1-9]|1[012])/g.test(this.state.생월.trim())===false){ //월 오류 메시지 show
                    this.setState({isInputLimitTextDatebox: true});
                    this.setState({isOnDate: false});  
                    this.setState({guidTextDate: `태어난 월을 정확하게 입력해주세요.`});  
                    return;
                }
                else{ //월 오류 메시지 hide
                    this.setState({isInputLimitTextDatebox: false});
                    this.setState({isOnDate: ''});  
                    this.setState({guidTextDate: ``});


                    //년도 > 월 > 일 체크  태어난 년도의 월 말일 계산 => 간식끝나고 수업내용 말일계산하기
                    if(/(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])/g.test(this.state.생일.trim())===false  ||  birthDate > lastDay  ){
                        this.setState({isInputLimitTextDatebox: true});
                        this.setState({isOnDate: false});  
                        this.setState({guidTextDate: `태어난 일을 정확하게 입력해주세요.`});  
                        return;
                    }
                    else {  //일 오류 메시지 hide
                        this.setState({isInputLimitTextDatebox: false});
                        this.setState({isOnDate: ''});  
                        this.setState({guidTextDate: ``});

                            // 생년월일 모두 입력 완료되고 정상인 상태에서 나이계산
                            // 14세 미만 체크
                            //미래 체크 : 큰숫자 먼저 처리
                            if(birthDay > nowDay){ 
                                this.setState({isInputLimitTextDatebox: true});
                                this.setState({isOnDate: false });  
                                this.setState({guidTextDate: `생년월일이 미래로 입력 되었습니다.`});
                                return;
                            }
                            else{
                                this.setState({isInputLimitTextDatebox: false});
                                this.setState({isOnDate: ``});
                                this.setState({guidTextDate: ``});

                                if(birthDay > nowDay14){ //14미만 오류
                                    this.setState({isInputLimitTextDatebox: true});
                                    this.setState({isOnDate: false });  
                                    this.setState({guidTextDate: `만 14세 미만은 가입이 불가 합니다.`});
                                    return;
                                }
                                else{
                                    this.setState({isInputLimitTextDatebox: false});
                                    this.setState({isOnDate: ``});
                                    this.setState({guidTextDate: ``});
                                }

                            }  

                            //120세 초과는 가입불가
                            if(birthDay < nowDay120){ 
                                this.setState({isInputLimitTextDatebox: true});
                                this.setState({isOnDate: false });  
                                this.setState({guidTextDate: `생년월일을 다시 확인해주세요.`});
                                return;
                            }
                            else{
                                this.setState({isInputLimitTextDatebox: false});
                                this.setState({isOnDate: ``});
                                this.setState({guidTextDate: ``});
                            }

                            const {생년,생월,생일} = this.state;
                            this.setState({생년월일: `${생년}-${생월}-${생일}`});
                    }
                }
            }
        }
    }

    //포커스아웃 이벤트
    onBlurEvent=()=>{
        this.birthYaerMonthDateCheck();
    }
 
    //포커스인 이벤트
    onFocusEvent=()=>{
        this.birthYaerMonthDateCheck();
    }



    onChangeYear=(value)=>{
        this.setState({생년: value});
        
    }
    onChangeMonth=(value)=>{
        this.setState({생월: value});   
       
    }
    onChangeDate=(value)=>{
        this.setState({생일: value});     
       
    }

    onChangeChooga=(value)=>{
        this.setState({
            추가입력사항: value,
            addItem: true
        });

        
        //placeholder 
        if(this.state.추가입력사항==='추천인 아이디'){
            this.setState({
                placeholderText: `추천인 아이디를 입력해주세요.`
            });
        }
        else{
            this.setState({
                placeholderText: `참여 이벤트명을 입력해주세요.`
            });
        }

    }

    //추가입력 숨은 박스
    onChangeAddEvent=(value)=>{
        this.setState({추가입력: value});

    }


    onChangeCheckedOne=(checked, value)=>{
        let imsi='';

        if(checked===true){ //만약 체크되면 추가
            //SNS OR 이메일
            if(value==='SNS'  &&  this.state.약관동의.includes('이메일') ){
                this.setState({약관동의:[...this.state.약관동의, value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의']}); 
            }
            else if(value==='이메일'  &&  this.state.약관동의.includes('SNS') ){
                this.setState({약관동의:[...this.state.약관동의, value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의']}); 
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'  &&  !this.state.약관동의.includes('SNS') && !this.state.약관동의.includes('이메일') ){
                this.setState({약관동의:[...this.state.약관동의, value, 'SNS', '이메일']}); 
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'  &&  this.state.약관동의.includes('SNS') && !this.state.약관동의.includes('이메일') ){
                this.setState({약관동의:[...this.state.약관동의, value, '이메일']}); 
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'  &&  !this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일') ){
                this.setState({약관동의:[...this.state.약관동의, value, 'SNS']}); 
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'  &&  this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일') ){
                this.setState({약관동의:[...this.state.약관동의, value ]}); 
            }
            else{
                this.setState({약관동의:[...this.state.약관동의, value]});
            }

            
        }
        else{ //체크 해제하면 삭제
            //체크 해제한것만 제외 filter
            if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' && this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일') && this.state.약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')){
                imsi = this.state.약관동의.filter((item)=> item!==value);
                imsi = imsi.filter((item)=> item!=='SNS');
                imsi = imsi.filter((item)=> item!=='이메일');                
            }    
            else if(value==='SNS' && this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일') && this.state.약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')){
                imsi = this.state.약관동의.filter((item)=> item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의');
                imsi = imsi.filter((item)=> item!=='SNS');
            }    
            else if(value==='이메일' && this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일') && this.state.약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')){
                imsi = this.state.약관동의.filter((item)=> item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의');
                imsi = imsi.filter((item)=> item!=='이메일');
            }    
            else{
                imsi = this.state.약관동의.filter((item)=> item!==value);
            }
            this.setState({약관동의: imsi });
        }
    }

    onChangeCheckedAll=(checked)=>{
        
        if(checked){
            const imsi = [
                '이용약관 동의(필수)',
                '개인정보 수집·이용(필수)',
                '개인정보 수집·이용(선택)',
                '무료배송, 할인쿠폰 등 혜택/정보 수신 동의',
                'SNS',
                '이메일',
                '본인은 만 14세 이상입니다.(필수)'
            ]
            this.setState({약관동의: imsi});
        }
        else{
            this.setState({약관동의: [] });  //빈 배열 [] 모두삭제
        }

    }



    onSubmit=(e)=>{
       e.preventDefault();
        const {
                아이디,비밀번호,이름,이메일,휴대폰,주소1,주소2,생년월일,성별,추가입력사항,추가입력,약관동의,주소,
                isOnId,isOnPw10,isOnPw,isOnPwNum,isOnPwConfirm,이메일확인,isPhoneClass2
        } = this.state;
        let imsi = 약관동의.filter((item)=>item.indexOf('필수')!==-1); //자동리턴


        //필수 입력 사항 정리
        if(아이디===''||비밀번호===''||이름===''||이메일===''||휴대폰===''||주소1===''||주소2===''){
            if(아이디===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'아이디를 입력하세요'    
                })    
            }
            else if(비밀번호===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'비밀번호를 입력하세요'    
                })    
            }
            else if(이름===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'이름을 입력하세요'    
                })    
            }
            else if(이메일===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'이메일을 입력하세요'    
                })    
            }
            else if(휴대폰===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'휴대폰을 입력하세요'    
                })    
            }
            else if(주소1===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'주소1을 입력하세요'    
                })    
            }
            else if(주소2===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'주소2를 입력하세요'    
                })    
            }
            return;
        }
        else if(isOnId===false||isOnPw10===false||isOnPw===false||isOnPwNum===false||isOnPwConfirm===false||이메일확인===false||isPhoneClass2===false){
            if(isOnId===false){
                this.setState({
                    isModalOpen: true,
                    modalText:'아이디를 확인하세요.'    
                })    
            }  
            else if(isOnPw10===false){
                this.setState({
                    isModalOpen: true,
                    modalText:'비밀번호는 10자 이상입니다. 확인하세요.'    
                })    
            }  
            else if(isOnPw===false){
                this.setState({
                    isModalOpen: true,
                    modalText:'영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합! 확인하세요.'    
                })    
            }  
            else if(isOnPwNum===false){
                this.setState({
                    isModalOpen: true,
                    modalText:'동일한 숫자 3개 이상 연속 사용 불가! 확인하세요.'    
                })    
            }  
            else if(isOnPwConfirm===false){
                this.setState({
                    isModalOpen: true,
                    modalText:'동일한 비밀번호를 입력해주세요.'    
                })    
            }              
            else if(이메일확인===false){
                this.setState({
                    isModalOpen: true,
                    modalText:'이메일을 확인해주세요.'    
                })    
            }  
            else if(isPhoneClass2===false){
                this.setState({
                    isModalOpen: true,
                    modalText:'휴대폰 인증을 해주세요.'    
                })    
            }  
            
            return;
        }
        else if(imsi.length < 3 ){
            this.setState({
                isModalOpen: true,
                modalText:'약관동의 필수항목 선택해주세요.'    
            })  
            return;  //전송 취소
        }

         let imsiData = {
                아이디: 아이디,
                비밀번호: 비밀번호,
                이름: 이름,
                이메일: 이메일,
                휴대폰: 휴대폰.replace(/^(01[016789]{1})([0-9]{3,4})([0-9]{4})$/g, '$1-$2-$3'), //010-7942-5305 010-792-5305
                생년월일: 생년월일,
                주소: 주소,    
                성별: 성별,
                추가입력사항:`${추가입력사항}: ${추가입력}`,                
                약관동의: 약관동의,
                가입일자: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`    
        } 

      
        
        localStorage.setItem(imsiData.아이디, JSON.stringify(imsiData));
        
        
       
        //POST 전송방식
        //폼데이터 데이터전송
        let formData = new FormData();
            formData.append('id',       아이디);
            formData.append('pw',       비밀번호);
            formData.append('irum',     이름);
            formData.append('email',    이메일);
            formData.append('hp',       휴대폰.replace(/^(01[016789]{1})([0-9]{3,4})([0-9]{4})$/g, '$1-$2-$3'));
            formData.append('birth',    생년월일);
            formData.append('addr',     주소);
            formData.append('gender',   성별);
            formData.append('addinput', `${추가입력사항}: ${추가입력}`);
            formData.append('agrement', 약관동의);
            formData.append('joindate', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);
        
        axios({
            url:'http://localhost:8090/dataSend',
            method:'POST',
            data: formData  //폼데이터전송
        })
        .then((res)=>{
            console.log('AXIOS 성공 메시지');
            console.log( res );
            this.setState({
                isModalOpen: true,
                modalText:'마켓컬리 회원가입을 감사드립니다.'    
            })
            location.href='/response';
        })
        .catch((err)=>{
            console.log('AXIOS 실패 메시지');
            console.log('error: ', err);            
        });





        //초기화
        this.setState({
            아이디:'',
            비밀번호:'',
            비밀번호확인:'',
            비밀번호체크: false,
            이름:'',
            이메일:'',
            이메일확인: false,
            휴대폰:'',
            휴대폰인증:'',
            phoneKey:'123456',  //인증키 응답파일
            seconds: 59,  //0~59 1분
            minutes: 2,   //2분
            setId: 0,     //setInterval() 타임변수
            okCnt: 0,   //인증번호 클릭 횟수


            생년:'',
            생월:'',
            생일:'',
            생년월일:'',
            

            // 라디오버튼에서 곧바로 체크드 한다.
            // 성별안에 값과 체크한 값이 같으면 true 아니면 false
            성별:'선택안함',
            추가입력사항:'',
            약관동의: [],

            isAddressOpen: false,
            isPostcodeOpen: false,

            우편번호:'',
            주소1:'',
            주소2:'',
            주소:'',

            phoneCheck: false, //휴대폰인증 입력상자와 버튼 숨기기
            isPhoneCheckClass: true, //버튼 클래스 스타일
            disabled1: false,
            disabled2: false,
            timerBoxShow: true,


            // 가이드텍스트 박스 : 포커스 이벤트
            isInputLimitTextId: false,
            isInputLimitTextIdPw: false,
            isInputLimitTextPwConfirm: false,

            // 가이드 클래스 속성 : 정규표현식으로 이벤트
            isOnId: '', //'', true, false           
            isOnPw10: '',
            isOnPw: '',
            isOnPwNum: '', 
            isOnPwConfirm: '', 
            isPhoneClass: true,
            isPhoneClass2: false,

            isOnPwEnNumSp: '', 
            isOnPwConfirmpeat3: '', 

            //모달창 멤버
            isModalOpen: false,
            modalText:'',

            isInputLimitTextDatebox: false,
            isOnDate: '',
            guidTextDate: '',


            addItem: false, 
            placeholderText:'',
            추가입력:''
        });
    }

    render() {
        return (
            <div id='kurly'>
                <div className='title'>
                    <img src='./img/logo_x2.png' alt=''/>
                </div>

                <div className='content'>
                    <div>
                        <h1>회원가입</h1>
                        <h4>
                            <span><i>*</i>필수입력사항</span>
                        </h4>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <ul>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>아이디<i>*</i></span>
                                    </div>
                                    <div className='right'>
                                        <input 
                                        type='text' 
                                        className='input-box' 
                                        onChange={(e)=>this.onChangeId(e.target.value)} 
                                        value={this.state.아이디} placeholder='6자 이상의 영문 혹은 영문과 숫자를 조합' 
                                        maxLength={20}
                                        onFocus={this.onFocusId}
                                        ref={this.isIdRef}
                                        />
                                        <button onClick={this.onClickIdDoubleCheck} className='confirm-btn'>중복확인</button>
                                        {   
                                            this.state.isInputLimitTextId && (         
                                                <div className='input-limit-text'>
                                                    <p className={
                                                        (this.state.isOnId==='' ? '':(this.state.isOnId ? 'success' : 'error'))
                                                    }
                                                    >6~16자 이내의  영문 혹은 영문과 숫자를 조합
                                                    </p>
                                                    <p className={
                                                        (this.state.isOnId2==='' ? '':(this.state.isOnId2 ? 'success' : 'error'))
                                                    }
                                                    >아이디 중복확인</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>비밀번호<i>*</i></span>
                                    </div>
                                    <div className='right'>
                                        <input 
                                        type='password' 
                                        className='input-box' 
                                        onChange={(e)=>this.onChangePw(e.target.value)} 
                                        value={this.state.비밀번호} placeholder='비밀번호를 입력해주세요'
                                        onFocus={this.onFocusPw}
                                        />
                                        {       
                                            this.state.isInputLimitTextIdPw && (
                                                <div className='input-limit-text'>
                                                    <p className={                                                    
                                                            (
                                                                this.state.isOnPw10==='' ? '' : 
                                                                (this.state.isOnPw10 ? 'success' : 'error')
                                                            )
                                                        }                                            
                                                    >10자 이상 입력</p>
                                                    <p className={
                                                            (
                                                                this.state.isOnPw==='' ? '' : 
                                                                (this.state.isOnPw ? 'success' : 'error')
                                                            )
                                                    }>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                                                    <p className={
                                                            (
                                                                this.state.isOnPwNum==='' ? '' : 
                                                                (this.state.isOnPwNum ? 'success' : 'error')
                                                            )
                                                    }
                                                    >동일한 숫자 3개 이상 연속 사용 불가</p>
                                                </div>                        
                                            )                
                                        }
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>비밀번호확인<i>*</i></span>
                                    </div>
                                    <div className='right'>
                                        <input 
                                        type='password' 
                                        className='input-box' 
                                        onChange={(e)=>this.onChangePwConfirm(e.target.value)} 
                                        value={this.state.비밀번호확인} 
                                        placeholder='비밀번호를 한번 더 입력해주세요'
                                        onFocus={this.onFocusPwConfirm}
                                        />
                                        {
                                            this.state.isInputLimitTextPwConfirm && (
                                                <div className='input-limit-text'>
                                                    <p className={
                                                         (
                                                            this.state.isOnPwConfirm==='' ? '' : 
                                                            (this.state.isOnPwConfirm ? 'success' : 'error')
                                                        )
                                                    }>동일한 숫자 3개 이상 연속 사용 불가</p>
                                                </div> 
                                            )
                                        }
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>이름<i>*</i></span>
                                    </div>
                                    <div className='right'>
                                        <input type='text' className='input-box' onChange={(e)=>this.onChangeName(e.target.value)} value={this.state.이름} placeholder='이름을 입력해주세요'/>                                        
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>이메일<i>*</i></span>
                                    </div>
                                    <div className='right'>
                                        <input 
                                        type='text' 
                                        className='input-box' 
                                        onChange={(e)=>this.onChangeEmail(e.target.value)} 
                                        value={this.state.이메일} 
                                        placeholder='예: marketkurly@kurly.com'
                                        />                                        
                                        <button onClick={this.onClickEmailCheck} className='confirm-btn'>중복확인</button>
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>휴대폰<i>*</i></span>
                                    </div>
                                    <div className='right'>
                                        <input type='text' 
                                        className='input-box' 
                                        onChange={(e)=>this.onChangePhone(e.target.value)} 
                                        value={this.state.휴대폰} 
                                        placeholder='숫자만 입력해주세요'
                                        maxLength={11}
                                        disabled={this.state.disabled1}
                                        />                                        
                                        <button disabled={this.state.disabled1} onClick={(e)=>this.onClickPhoneEvent(e)} className={`confirm-btn 
                                            (
                                                ${this.state.isPhoneClass===''?'':this.state.isPhoneClass===true?`overlap-btn`:``}
                                            )
                                        `}>인증번호 받기</button>
                                        {
                                            this.state.phoneCheck && (   
                                                <>
                                                    <input type='text' 
                                                    className='input-box phone-check' 
                                                    onChange={(e)=>this.onChangePhoneCheck(e.target.value)} 
                                                    value={this.state.휴대폰인증} 
                                                    placeholder=''
                                                    maxLength={6}
                                                    disabled={this.state.disabled2}
                                                    />                                        
                                                    <button disabled={this.state.disabled2} onClick={(e)=>this.onClickPhoneCheckEvent(e)} className={`confirm-btn phone-check
                                                        (
                                                            ${this.state.isPhoneClass2===''?'':this.state.isPhoneClass2===true?`overlap-btn`:``}
                                                        )
                                                    `}>인증번호 확인</button>                                                    
                                                     {
                                                         this.state.timerBoxShow && (
                                                            <span className='time-counter'>{this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}`:this.state.seconds}</span>
                                                         )
                                                     }
                                                </>     
                                            )
                                        }  
                                                
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>주소<i>*</i></span>
                                    </div>
                                    <div className='right address'>
                                        
                                        {
                                            this.state.isAddressOpen && (                                                
                                                <div>
                                                    {/* 주소 API 조회하여 받은 우편번호  */}
                                                    <input type='text' className='input-box' onChange={(e)=>this.onChangeAddressZip(e.target.value)} value={this.state.우편번호} placeholder='우편번호' />
                                                    
                                                    {/* 주소 API 조회하여 받은 주소1     */}
                                                    <input type='text' className='input-box' onChange={(e)=>this.onChangeAddress1(e.target.value)} value={this.state.주소1} placeholder='주소검색' />
                                                    
                                                    {/* 상세주소 주소2 */}
                                                    <input type='text' className='input-box' onChange={(e)=>this.onChangeAddress2(e.target.value)} value={this.state.주소2} placeholder='나머지 주소를 입력해주세요' />
                                                      
                                                </div>
                                            )
                                        }


                                        {
                                            this.state.isPostcodeOpen && (
                                             <div></div> 
                                            )
                                        }

                                         

                                        <button className='address-btn'  onClick={this.onClickAddressOpen}><span><i className='fa fa-search'></i>{ this.state.isAddressOpen ? `주소 재검색` :  `주소 검색` }</span></button>
                                        <p className='address-info-text'>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>성별</span>
                                    </div>
                                    <div className='right'>
                                        <div className='radio-box'>
                                            <label>
                                                <input type='radio' name='sex' onChange={(e)=>this.onChangeGender(e.target.value)} checked={ this.state.성별.includes('남성') } value={`남성`} />
                                                <span>남자</span>
                                            </label>
                                            <label>
                                                <input type='radio' name='sex' onChange={(e)=>this.onChangeGender(e.target.value)} checked={ this.state.성별.includes('여성') } value={`여성`} />
                                                <span>여자</span>
                                            </label>
                                            <label>
                                                <input type='radio' name='sex' onChange={(e)=>this.onChangeGender(e.target.value)} checked={ this.state.성별.includes('선택안함') } value={`선택안함`} />
                                                <span>선택안함</span>
                                            </label>
                                        </div>
                                    </div>
                                 </div>
                            </li>
                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>생년월일</span>
                                    </div>
                                    <div className='right'>
                                        <div className='date-box'>
                                            <span>
                                                <input 
                                                type='text' 
                                                placeholder='YYYY' 
                                                onChange={(e)=>this.onChangeYear(e.target.value)} 
                                                value={this.state.생년}
                                                maxLength='4'
                                                onBlur={this.onBlurEvent}
                                                onFocus={this.onFocusEvent}
                                                />
                                            </span>
                                            <span>
                                                <i>/</i>
                                            </span>
                                            <span>
                                                <input type='text' 
                                                placeholder='MM'
                                                onChange={(e)=>this.onChangeMonth(e.target.value)} 
                                                value={this.state.생월}                                                 
                                                maxLength='2'
                                                onBlur={this.onBlurEvent}
                                                onFocus={this.onFocusEvent}
                                                />
                                            </span>
                                            <span>
                                                <i>/</i>
                                            </span>
                                            <span>
                                                <input type='text' 
                                                placeholder='DD'  
                                                onChange={(e)=>this.onChangeDate(e.target.value)} 
                                                value={this.state.생일}                                                 
                                                maxLength='2'
                                                onBlur={this.onBlurEvent}
                                                onFocus={this.onFocusEvent}                                                
                                                />
                                            </span>                                           
                                        </div>
                                        
                                        {
                                            //년월일 입력시 오류 발생하면 아래 가이드 텍스트 박스가 보인다.
                                            //true 이면 오류(show) false 정상(hide)
                                            // isInputLimitTextDatebox: false,
                                            // isOnDate: '',
                                            // guidTextDate: '', //가이드 텍스트 오류 내용
                                            this.state.isInputLimitTextDatebox && (
                                                <div className='input-limit-text'>
                                                    <p className={
                                                         (
                                                            this.state.isOnDate==='' ? '' : 
                                                            (this.state.isOnDate ? '' : 'error')
                                                        )
                                                    }>{this.state.guidTextDate}</p>
                                                </div> 
                                            )
                                        }

                                    </div>
                                 </div>
                            </li>

                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>추가입력 사항</span>
                                    </div>
                                    <div className='right'>
                                        <div className='radio-box recommender-box'>
                                            <label>
                                                <input type='radio' name='recommender' onChange={(e)=>this.onChangeChooga(e.target.value)}  checked={this.state.추가입력사항.includes('추천인 아이디')}   value='추천인 아이디' />
                                                <span>추천인 아이디</span>
                                            </label>
                                            <label>
                                                <input type='radio' name='recommender' onChange={(e)=>this.onChangeChooga(e.target.value)}  checked={this.state.추가입력사항.includes('참여 이벤트명')}    value='참여 이벤트명' />
                                                <span>참여 이벤트명</span>
                                            </label>
                                        </div>
                                        {
                                            this.state.addItem && (
                                                <div className='add-item'>
                                                    <input type='text' 
                                                    className='input-box add-box' 
                                                    onChange={(e)=>this.onChangeAddEvent(e.target.value)} 
                                                    value={this.state.추가입력} 
                                                    placeholder={this.state.placeholderText}
                                                    />  
                                                    <p>
                                                        추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br /> 
                                                        가입 이후, 수정이 불가합니다.<br />  
                                                        대소문자 및 띄어쓰기에 유의해주세요.
                                                    </p>               
                                                </div>
                                            )
                                        }
                                    </div>
                                 </div>
                            </li>

                            <li>
                                <hr />
                            </li>

                            <li>
                                <div className='gap'>
                                    <div className='left'>
                                        <span>이용약관동의<i>*</i></span>
                                    </div>
                                    <div className='right'>
                                        <div className='check-box'>
                                            <dl>
                                                <dt>
                                                    <label>
                                                        <input type='checkbox' onChange={(e)=>this.onChangeCheckedAll(e.target.checked, e.target.value)} name='chkAll' id='chkAll' checked={this.state.약관동의.length===7?true:false}  value='전체동의' />
                                                        <span>전체 동의합니다.</span>
                                                    </label>
                                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                                </dt>
                                                <dd>
                                                    <label>
                                                        <input type='checkbox' name='chk1' id='chk1' onChange={(e)=>this.onChangeCheckedOne(e.target.checked, e.target.value)} checked={this.state.약관동의.includes('이용약관 동의(필수)')} value='이용약관 동의(필수)' />
                                                        <span>이용약관 동의(필수)</span>
                                                    </label>    
                                                    <a href='#!' title='약관보기'>약관보기</a>
                                                </dd>
                                                <dd>
                                                    <label>
                                                        <input type='checkbox' name='chk2' id='chk2' onChange={(e)=>this.onChangeCheckedOne(e.target.checked, e.target.value)}  checked={this.state.약관동의.includes('개인정보 수집·이용(필수)')} value='개인정보 수집·이용(필수)' />
                                                        <span>개인정보 수집·이용(필수)</span>
                                                    </label>
                                                    <a href='#!' title='약관보기'>약관보기</a>                                                    
                                                </dd>
                                                <dd>
                                                    <label>
                                                        <input type='checkbox' name='chk3' id='chk3' onChange={(e)=>this.onChangeCheckedOne(e.target.checked, e.target.value)}  checked={this.state.약관동의.includes('개인정보 수집·이용(선택)')}  value='개인정보 수집·이용(선택)' />
                                                        <span>개인정보 수집·이용(선택)</span>
                                                    </label>
                                                    <a href='#!' title='약관보기'>약관보기</a>                                                    
                                                </dd>

                                                <dd>
                                                    <label>
                                                        <input type='checkbox' name='chk4' id='chk4' onChange={(e)=>this.onChangeCheckedOne(e.target.checked, e.target.value)} checked={this.state.약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')} value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' />
                                                        <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의 </span>
                                                    </label>
                                                    <div className='chk4-sub'>
                                                        <label>
                                                            <input type='checkbox' name='chk4_1' id='chk4_1' onChange={(e)=>this.onChangeCheckedOne(e.target.checked, e.target.value)} checked={this.state.약관동의.includes('SNS')}  value='SNS' />
                                                            <span>SNS</span>
                                                        </label>
                                                        <label>
                                                            <input type='checkbox' name='chk4_2' id='chk4_2' onChange={(e)=>this.onChangeCheckedOne(e.target.checked, e.target.value)} checked={this.state.약관동의.includes('이메일')}  value='이메일' />
                                                            <span>이메일</span>
                                                        </label>
                                                        <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                                    </div>
                                                </dd>

                                                <dd>
                                                    <label>
                                                        <input type='checkbox' name='chk5' id='chk5' onChange={(e)=>this.onChangeCheckedOne(e.target.checked, e.target.value)} checked={this.state.약관동의.includes('본인은 만 14세 이상입니다.(필수)')}  value='본인은 만 14세 이상입니다.(필수)'/>
                                                        <span>본인은 만 14세 이상입니다.(필수)</span>
                                                    </label>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                 </div>
                            </li>
                        </ul>

                        <div className='button-box'>
                            <button type='submit'>가입하기</button>
                        </div>

                    </form>
                </div>
                {                        
                    this.state.isModalOpen && (
                            <div className='modal'>
                                <div className='container'>
                                    <div className='top'>
                                        <ul>
                                            <li>
                                                <h2>알림메시지</h2>
                                                <span><a href='#!' onClick={this.onClickModalClose}><img src='./img/ico_close_999_32x32.png' alt='닫기이미지'/></a></span>
                                            </li>
                                            <li>
                                                <p>{this.state.modalText}</p>
                                            </li>
                                        </ul>                
                                    </div>
                                    <div className='bottom'>
                                        <button  onClick={this.onClickModalClose}>확인</button>         
                                    </div>
                                </div>
                            </div>
                    )
                }
            </div>
        );
    }
}


//돔 컨테이너와 리액트 컴포넌트 연결
ReactDOM.render(
    <KurlyComponent />,
    document.getElementById('root')
);




