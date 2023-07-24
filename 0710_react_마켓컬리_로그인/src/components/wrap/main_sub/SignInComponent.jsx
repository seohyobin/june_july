import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import'./scss/signin.scss';
import axios from 'axios';
import { ConfirmContext } from '../../../context/ConfirmContext';
import {GlobalContext} from '../../../context/GlobalContext'; 

export default function SignInComponent(){
    const {confirmModalOpen,isConfirmModal}=React.useContext(ConfirmContext);
    const {login, setLogin,signin,setSignin} = React.useContext(GlobalContext);
    const [state, setState]=React.useState({
        user_id:'',
        user_pw:''
    });
    //아이디 입력상자 
    const [userId,setUserId]=React.useState('');
    const [userPw,setUserPw]=React.useState('');

    const onChangeUser_id=(e)=>{
        setState({
            ...state,
            user_id:e.target.value
        });
    }

    const onChangeUser_pw=(e)=>{
        setState({
            ...state,
            user_pw:e.target.value
        });

    }
    //로그인 액션 파일 => 로그인 구현
    //user_signin_action.jsp
    const onClickLogin=(e)=>{
        e.preventDefault();
        if(userId===''){
            confirmModalOpen('아이디를 확인하고 입력하세요.');

        }
        else if (userPw===''){
            confirmModalOpen('비밀번호를 확인하고 입력하세요.');

        }
        else{


            axios({
                //이름과 휴대폰 번호를 전송한다.
                url:'/kurly/user_signin_action.jsp',
                method:'POST',
                data:{},
                params:{
                    "user_id":state.user_id,
                    "user_pw":state.user_pw
                }
            })
            .then((res)=>{
                
                console.log( 'axios 전송 성공');
                console.log( res );
                const result = res.data;
                try {
                    if(result === -1){
                        confirmModalOpen('아이디를 확인하고 다시 시도해주세요.');

                    }
                    else if(result ===0){
                        confirmModalOpen('비밀번호를 확인하고 다시 시도해주세요.');

                    }
                    else{
                        confirmModalOpen('로그인이 되었습니다.');

                       
                        let today= new Date();
                        console.log(today);
                        today.setDate(today.getDate()+3); //로그인 3일 만료일

                        const obj={
                            user_id:state.user_id,
                            expires:today.getTime()
                          
                        }
                        localStorage.setItem('KURLYUSERLOGIN',JSON.stringify(obj))
                        Navigate('/main' , {state:{아이디:state.user_id}})
                        setSignin({
                            ...signin,
                            user_id:state.user_id,
                            expires:state.expires
                        })

                    }
                } catch (error) {
                    console.log(`AXIOS 실패! ${error} `)
                }
            
            })
            .catch((err)=>{
                console.log(`AXIOS 실패! ${err} `)
            });    
        

        }
        
      
    }


    return (
        <main id="signIn">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>로그인</h2>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li><input onChange={onChangeUser_id} type="text" name='user_id' id='user_id' value={state.user_id} placeholder="아이디를 입력해주세요"/></li>
                                <li><input onChange={onChangeUser_pw} type="text" name='user_pw' id='user_pw' value={state.user_pw} placeholder="비밀번호를 입력해주세요"/></li>
                                <li>
                                    <span><Link to="/idSearch">아이디찾기</Link></span>
                                    <i> | </i>
                                    <span><Link to="/pwSearch">비밀번호찾기</Link></span>
                                </li>
                              
                                <li><button onClick={onClickLogin}>로그인</button></li>
                                <li><Link to='/signup'>회원가입</Link></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

