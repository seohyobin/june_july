
        // AJAX({});
        // AXIOS({}).THEN().CATCH();
        // const formData = {
        //     아이디: state.아이디,
        //     비밀번호: state.비밀번호
        // }
        // $.ajax({
        //     url:'http://moonjong.dothome.co.kr/signup_db/insert.php',
        //     type:'POST',
        //     data: formData,
        //     success(res){
        //         console.log('AJAX 성공 : ' + res );
        //     },
        //     error(err){
        //         console.log('AJAX 실패 : ' + err );
        //     }
        // });

        // axios()
        // 폼데이터 생성자 생성 
        // let newFormData = new FormData();
        // newFormData.append('아이디', state.아이디);
        // newFormData.append('비밀번호', state.비밀번호);

        // axios({
        //     url:'',
        //     method:'POST',
        //     data: newFormData  // 전송할 폼데이터
        // })
        // .then((res)=>{
        //     console.log( res.data );
        // })
        // .catch((err)=>{
        //     console.log( err );
        // });


        // 가입하기 버튼 클릭 했을 때 검증 조건문
        // 입력폼 화면의 필수 항목과 선택 항목, 그리고 중복확인, 인증등 항목들의
        // 빠짐없는 항목을 체크하고 가용성있는 폼데이터를 전송한다.
        // 1. 아이디 : 빈값이면 입력 요구
        // 2. 아이디 중복확인 : 중복확인을 검사한다. isIdOk
        // 3. 비밀번호: 빈값이면 입력 요구
        // 4. 비밀번호확인: 두개비밀번호 비교 확인 isPw2 false이고 빈값이아니면
        // 5. 이름:  빈값이면 입력 요구
        // 6. 이메일: 빈값이면 입력 요구
        // 7. 이메일 중복확인 : isEmailOk
        // 7. 휴대폰 : 빈값이면 입력 요구
        // 8. 휴대폰 : 인증번호 성공 여부확인  //인증성공 추가  isHpOk true 이면 성공
        // 9. 주소1, 주소2 : 빈값이면 입력 요구
        
        // 10. 성별 : 선택사항이므로 유효성에서 제외
        // 11. 생년월 : 선택사항이므로 유효성에서 제외
        // 12. 추가입력사항 : 선택사항이므로 유효성에서 제외

        // 13. 이용약관동의 : //필수항목 3개 확인 추가 검증
        //     가입하기 클릭하면 이용약관동의 배열값내용중 필수 항복을 카운트한다. 변수에 대입
        
        // 14. 1 ~ 13 까지 이상없으면 전송
        const result = state.이용약관동의.map((item)=>item.includes('필수')? 1 : 0);
        console.log( result )

        let sum=0;
        result.map((item)=>{
            sum+=item;
        })

        if( sum < 3 ){
            setState({
                ...state,
                isConfirmModal: true,
                confirmMsg: '이용약관동의 필수항목 3개를 선택해야합니다.'
            })
        }
        else{
            setState({
                ...state,
                isConfirmModal: false,
                confirmMsg: ''
            })
        }

        // // indexOf('필수) 찾으면 0 1 2 3... 글자 위치 인덱스값
        // // 찾지 못하면 -1
        let cnt=0;
        state.이용약관동의.map((item)=>{
            if(item.indexOf('필수')!==-1){
                cnt++;
            }
            console.log( `item.indexOf('필수') ${item.indexOf('필수')}` );
        });

        if( cnt < 3 ){
            setState({
                ...state,
                isConfirmModal: true,
                confirmMsg: '이용약관동의 필수항목 3개를 선택해야합니다.'
            })
        }
        else{
            setState({
                ...state,
                isConfirmModal: false,
                confirmMsg: ''
            })

        }


        let cnt2=0;
        state.이용약관동의.map((item)=>{
            if(item.search('필수')!==-1){ //-1아니면 찾은거임.
                cnt2++;
            }
            console.log( `item.search('필수')  ${item.search('필수')}` );
        });

        if( cnt2 < 3 ){
            setState({
                ...state,
                isConfirmModal: true,
                confirmMsg: '이용약관동의 필수항목 3개를 선택해야합니다.'
            })
        }
        else{
            setState({
                ...state,
                isConfirmModal: false,
                confirmMsg: ''
            })

        }



