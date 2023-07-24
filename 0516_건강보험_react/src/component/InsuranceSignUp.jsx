import React from 'react';
import $ from 'jquery';
import axios from 'axios';

export default function InsuranceSignUp({signup}){

    const [state,setState]=React.useState(signup);

    const onChangeID=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            id:value
        })
    }


    const onChangePW=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            pw:value
        })
    }

    const onChangePw_re=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            pw_re:value
        })
    }

    const onChangePw_q1=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            q1:value
        })
    }

    const onChangePw_q2=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            q2:value
        })
    }


    const onChangePw_q3=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            q3:value
        })
    }

    const onChangePw_q=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            pw_q:value
        })
    }

    const onChangePw_a=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            pw_a:value
        })
    }

    const onChangePh=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            ph:value
        })
    }

    const onChangePerson=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            person:value
        })
    }

    const onChangeEmail=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            email:value
        })
    }

    const onChangeRecieve=(e)=>{
        const value= e.target.value;

        setState({
            ...state,
            recieve:value
        })
    }
    const onSubmitInsurance=(e)=>{
        
        e.preventDefault();
        
        // const formdata={
        //     "id":state.id,
        //     "pw":state.pw,
        //     "pw_re":state.pw_re,
        //     "q1":state.q1,
        //     "q2":state.q2,
        //     "q3":state.q3,
        //     "pw_q":state.pw_q,
        //     "pw_a":state.pw_a,
        //     "ph":state.ph,
        //     "person":state.person,
        //     "email":state.email,
        //     "recieve":state.recieve

        // }

        let formData= new URLSearchParams();

        formData.append("id",state.id);
        formData.append("pw",state.pw);
        formData.append("pw_re",state.pw_re);
        formData.append("q1",state.q1);
        formData.append("q2",state.q2);
        formData.append("q3",state.q3);
        formData.append("pw_q",state.pw_q);
        formData.append("pw_a",state.pw_a);
        formData.append("ph",state.ph);
        formData.append("person",state.person);
        formData.append("email",state.email);
        formData.append("recieve",state.recieve);
        

        // fetch('/JSP/0512_건강보험_React_AJAX_JSP_과제/DAO_DTO_0512_과제/insert_action.jsp',{
        //     method:'POST',
        //     body:formData
        // })
        // .then((res)=> res.json())
        // .then((res)=>{
        //     console.log(res);
        //     console.log(' FETCH API 성공 ');
        // });


        axios({
                url:'/JSP/0512_건강보험_React_AJAX_JSP_과제/DAO_DTO_0512_과제/insert_action.jsp',
                method:'POST',
                data:{},
                params:formData
        })
        .then((res)=>{
                alert("확인!!!");
                console.log('axios 성공');
                console.log(res);

        })
        .catch((err)=>{
                console.log('axios 성공');
                console.log(err);
        })


        // $.ajax({
        //     url:'http://localhost:8080/JSP/0512_건강보험_React_AJAX_JSP_과제/DAO_DTO_0512_과제/insert_action.jsp',
        //     type:'POST',
        //     data:formdata,
        //     success(res){
        //         console.log(res);
        //         console.log('AJAX 성공');

        //         alert('회원가입성공!!!!');
        //     },
        //     error(err){
        //         console.log('AJAX오류'+ err );

        //     }
        // })
    }
    

    return (
        <div id="wrap">
        <div className="back">
            <div className="container">
                <div className="title">
                    <h1>회원가입</h1>
                    <div className="border-box">
                        <p>개인(직장가입자)이 아닌 <span>사업장업무를 위한 회원가입</span>입니다.<br/>
                        사업장관리번호 및 단위 사업장 기호가 다른 경우에는 각각 회원가입을 하셔야 합니다<br/>
                        예) 건설현장 사업장마다 사업장관리번호가 각각 적용되오니 회원가입도 각각 하셔야 해당 업무를 이용하실 수 있습니다.</p>
                    </div>
                    <p><span><img src="./images/ico-compulsory.png" alt=""/></span>   표는 필수 입력 사항이며, [동일아이디검색] 및 [가입여부확인] 버튼을 반드시 눌러주세요.</p>
                </div>
                <div className="content">
                    
                    <hr/>
                    <form onSubmit={onSubmitInsurance} action="./insert_action.jsp" name="insurance1" id="insurance1" method="post">
                        <table>
                            <tr>
                                <th>아이디  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td>
                                    <input onChange={onChangeID} type="text" name="id" id="id" placeholder="영문+ 숫자 6~10자 이내" value={state.id}/>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td>
                                    <input onChange={onChangePW} value={state.pw} type="text" name="pw" id="pw" placeholder="영문+숫자+특수문자(!@#$) 각 1자 이상 포함하여 9~12자 이내 비밀번호 입력"/>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호확인  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td>
                                    <input onChange={onChangePw_re} value={state.pw_re} type="text" name="pw_re" id="pw_re" placeholder="영문+숫자+특수문자(!@#$) 각 1자 이상 포함하여 9~12자 이내 비밀번호 입력"/>
                                </td>
                            </tr>
                            <tr>
                                <th>사업장관리번호  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td>
                                    <input onChange={onChangePw_q1} value={state.q1} type="text" name="q1" id="q1" placeholder=""/>
                                </td>
                            </tr>
                            <tr>
                                <th>사업장기호  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td>
                                    <input input onChange={onChangePw_q2} value={state.q2}  type="text" name="q2" id="q2" placeholder="사업장관리번호확인 버튼을 클릭하여 검증하시면 자동입력 됩니다."/>
                                </td>
                            </tr>
                            <tr>
                                <th>단위사업장기호  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td>
                                    <input type="text" name="q3" id="q3"  value={state.q3}  onChange={onChangePw_q3} />
                                </td>
                            </tr>
                            <tr>
                                <th>비빌번호 분실 시 <br/>확인 질문  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td><select name="pw_q" id="pw_q" onChange={onChangePw_q} value={state.pw_q} >
                                    <option value="">질문을 선택하세요</option>
                                    <option value="나의 아버지 성함은?">나의 아버지 성함은?</option>
                                    <option value="나의 그리운 고향은?">나의 그리운 고향은?</option>
                                    <option value="나의 첫째아이 이름은?">나의 첫째아이 이름은?</option>
                                    <option value="나의 초등학교 이름은?">나의 초등학교 이름은?</option>
                                    <option value="나의 보물 제1호는?">나의 보물 제1호는?</option>
                                    <option value="기억에 남는 추억의 장소는?">기억에 남는 추억의 장소는?</option>
                                    <option value="나의 인생 좌우명은?">나의 인생 좌우명은?</option>
                                </select></td>
                            </tr>
                            <tr>
                                <th>비밀번호 분실 시 <br/>확인 답변  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td><input value={state.pw_a}  onChange={onChangePw_a} type="text" name="pw_a" id="pw_a" placeholder="조회 답변은 띄어쓰기 포함 10자 이내"/></td>
                            </tr>
                            <tr>
                                <th>전화번호  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td><input onChange={onChangePh} value={state.ph} type="text" name="ph" id="ph" placeholder="“-(하이픈)” 없이 입력 (예 : 01012345678)"/></td>
                            </tr>
                            <tr>
                                <th>업무담당자명  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td><input onChange={onChangePerson} value={state.person} type="text" name="person" id="person" placeholder="사업장의 소속된 직장 가입자 직원 또는 대표자 업무담당자명 입력"/></td>
                            </tr>
                            <tr>
                                <th>이메일  <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td><input onChange={onChangeEmail} value={state.email} type="text" name="email" id="email"/></td>
                            </tr>
                            <tr>
                                <th>소식지 수신여부   <span><img src="./images/ico-compulsory.png" alt=""/></span></th>
                                <td>
                                    <label for="recieve_y">받음   <input type="radio" className="radio" name="recieve" id="recieve_y" value="받음" onChange={onChangeRecieve}/></label>
                                    <label for="recieve_n">안받음 (공단의 다양한 소식을 무료로 만나보세요)  <input type="radio" className="radio" name="recieve" id="recieve_n" value="안받음" onChange={onChangeRecieve} /></label>
                          
                                </td>
                            </tr>
                        </table>
                        <button type="submit">확인</button>
                    </form>
                </div>
            </div>
        </div>
   
    </div>
    );
};

InsuranceSignUp.defaultProps={
    signup:{
        id:'',
        pw:'',
        pw_re:'',
        q1:'',
        q2:'',
        q3:'',
        pw_q:'',
        pw_a:'',
        ph:'',
        person:'',
        email:'',
        recieve:''
    }
}
