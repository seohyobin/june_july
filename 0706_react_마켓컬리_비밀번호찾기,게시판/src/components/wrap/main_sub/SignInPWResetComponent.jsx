import React from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import './scss/pwReset.scss';
import { GlobalContext } from '../../../context/GlobalContext';
import axios from 'axios';
import { ConfirmContext } from '../../../context/ConfirmContext';

export default function SignInPWResetComponent(){

    const [userHpAuth,setUserHpAuth]=React.useState('');

    const {login, setLogin} = React.useContext(GlobalContext);
    const location = useLocation();  
    const {confirmModalOpen,isConfirmModal}=React.useContext(ConfirmContext);
    const navigate = useNavigate();

    const [hpAuth,setHpAuth]=React.useState('');

    const [userId,setUserId]=React.useState('');
    const [userPw,setUserPw]=React.useState('');
    const [userPw2,setUserPw2]=React.useState('');
    const onChangeNewPw=(e)=>{
        e.preventDefault();
        setUserPw(e.target.value);
    }
    React.useEffect(()=>{
        console.log( location.state.아이디 );
        console.log( location.state.가입일 );
        setLogin({
            ...login,
            아이디: location.state.아이디,
            비밀번호: location.state.비밀번호,
            가입일: location.state.가입일
        })
    },[]);
    const onChangeNewPw2=(e)=>{
        e.preventDefault();
        setUserPw2(e.target.value);
    }
    const onClickPwSave=(e)=>{
        e.preventDefault();

        if(userPw===''){
            confirmModalOpen('비밀번호를 입력해 주세요');
        }
        else if(userPw2===''){
            confirmModalOpen('비밀번호를 한번더 입력해 주세요');
        }
        else{
            if(userPw===userPw2){
                
                axios({
                    url:'/kurly/pwResetAction2.jsp',
                    method: 'POST',
                    data:{},
                    params: {
                        "user_pw": userPw,
                        "user_id": location.state.아이디
                    }
                })
                .then((res)=>{
            
            
                    console.log( res );
                    console.log( res.data );

                    const result = res.data;
                    try {                    
                        if( result === -1 ){ // null 이면 가입회원이 아닙니다. 회원가입하세요                      
                            confirmModalOpen(' 비밀번호를 확인하고 다시 입력해주세요. ');
                        }
                        else{                            
                            confirmModalOpen('비밀번호가 재설정 되었습니다. 로그인하세요!');
                            window.location.pathname = "/signin";
                        }
                    } catch (error) {
                        console.log( error );
                    }
                

                })
                .catch((err)=>{
                    console.log(`AXIOS 실패! ${err} `)
                });    

            
            }
            else{
                confirmModalOpen('비밀번호가 일치하지 않습니다.');
            }
        }
        
        

    }



    return (
        <main id="signInPwReset">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 재설정</h2>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li><label htmlFor="userPw">새 비밀번호 등록</label></li>
                                <li>
                                <input 
                                onChange={onChangeNewPw} 
                                type="text" 
                                name='user_pw' 
                                id='userPw'
                                value={userPw} 
                                placeholder="비밀번호를 입력해주세요"
                                />
                                </li>
                                <li><label htmlFor="userPw2">새 비밀번호 확인   </label></li>
                                <li><input onChange={onChangeNewPw2} type="text" name='user_pw2' id='userPw2' value={userPw2} placeholder="비밀번호를 한번 더 입력해주세요"/></li>
                                <li><button onClick={onClickPwSave}>확인</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

