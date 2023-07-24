import React from 'react';
import $ from 'jquery';
import axios from 'axios';







export default function NaverSignUpComponent({회원가입}) {

    const [state, setState] = React.useState(회원가입);
    
    const onChangeId=(e)=>{
        const value= e.target.value;

        
        setState({
            ...state,
            아이디:value       
        })

   
    }
    const onChangePw=(e)=>{
        const value= e.target.value;


        
        setState({
            ...state,
            비밀번호:value       
        })

    }

    const onChangeName=(e)=>{
        const value= e.target.value;


        
        setState({
            ...state,
            이름:value       
        })
    }
    
    const onChangeBirth=(e)=>{
        const value= e.target.value;


        
        setState({
            ...state,
            생년월일:value       
        })
    }
    const onChangeGender=(e)=>{
        const value= e.target.value;


        
        setState({
            ...state,
            성별:value       
        })
    }
    const onChangeEmail=(e)=>{
        const value= e.target.value;


        
        setState({
            ...state,
            이메일:value       
        })

    }
    const onChangeHp =(e)=>{
        const value= e.target.value;


        
        setState({
            ...state,
            전화번호:value       
        })
    }

    const onSubmitNaver=(e)=>{
        e.preventDefault();
    
        // const formData={
        //     "id" : state.아이디,
        //     "pw" : state.비밀번호,
        //     "name" : state.이름,
        //     "birth" : state.생년월일,
        //     "gender" : state.성별,
        //     "email" : state.이메일,
        //     "ph" : state.전화번호
        // }

        let formData=new URLSearchParams();
        formData.append("id",state.아이디);
        formData.append("pw",state.비밀번호);
        formData.append("name",state.이름);
        formData.append("birth",state.생년월일);
        formData.append("gender",state.성별);
        formData.append("email",state.이메일);
        formData.append("ph",state.전화번호); 

        // axios({
        //     url:'/JSP/0512_NAVER_AJAX_REACT_JSP과제/NAVER_RE/signup_action.jsp',
        //     method:'POST',
        //     data:{},
        //     params:formData
        // })
        // .then((res)=>{
        //         alert("확인!!!");
        //         console.log('axios 성공');
        //         console.log(res);
        // })
        // .catch((err)=>{
        //     console.log('axios 성공');
        //     console.log(err);
        // })

        fetch('/JSP/0512_NAVER_AJAX_REACT_JSP과제/NAVER_RE/signup_action.jsp',{
            method:'POST',
            body:formData
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            console.log(' FETCH API 성공 ');
        })

        // $.ajax({
        //     url:'http://localhost:8080/JSP/0512_NAVER_AJAX_REACT_JSP과제/NAVER_RE/signup_action.jsp',
        //     type:'POST',
        //     data:formData,
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
                    <div id="header">
          <h1>NAVER</h1>
        </div>
         <form onSubmit={onSubmitNaver} method="post" name="signup" id="sign_up" action="./signup_action.jsp">
            <label for="id">
                아이디<br/><input onChange={onChangeId} type="text" name="id" id="id" placeholder="아이디를 입력하세요" value={state.아이디}/>
            </label>
            <label for="pw">
               비밀번호<br/><input onChange={onChangePw} type="text" name="pw" id="pw" placeholder="비밀번호를 입력하세요" value={state.비밀번호}/>
            </label>
            <label for="name">
               이름<br/><input  onChange={onChangeName} type="text" name="name" id="name" placeholder="이름을 입력하세요" value={state.이름}/>
            </label>
            <label for="birth">
               생년월일<br/><input  onChange={onChangeBirth} type="text" name="birth" id="birth" placeholder="생년월일을 입력하세요" value={state.생년월일}/>
            </label>
            <label for="gender">
                성별<select  onChange={onChangeGender} name="gender" id="gender" value={state.성별}>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                    <option value="선택안함">선택안함</option>
                </select>
            </label>
            <label for="email">
                이메일<br/><input  onChange={onChangeEmail} type="email" name="email" id="email" placeholder="이메일을 입력하세요" value={state.이메일}/>
            </label>
            <label for="ph">
                전화번호<br/><input  onChange={onChangeHp} type="ph" name="ph" id="ph" placeholder="전화번호를 입력하세요" value={state.전화번호}/>
            </label>
            <button type="submit">가입하기</button>
        </form>
        </div>
    );
};

NaverSignUpComponent.defaultProps={
    회원가입:{
        아이디:'',
        비밀번호:'',
        이름:'',
        생년월일:'',
        성별:'',
        이메일:'',
        전화번호:''
    }
}