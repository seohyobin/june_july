import React from 'react';
import { Link } from 'react-router-dom';
import './scss/pwSearch.scss';
import {useNavigate}  from 'react-router-dom';

export default function SignInPWSearchComponent(){
    const navigate = useNavigate();
    
    const [userId,setUserId]=React.useState('');
    const [userHp,setUserHp]=React.useState('');
    const [isTap,setIsTap]=React.useState(false);
    const [isBtn,setIsBtn]=React.useState(false);

    const onChangeId=(e)=>{
        setUserId(e.target.value);
    }
    const onChangeHp=(e)=>{
        setUserHp(e.target.value);
    }
    

    return (
        <main id="signInPwSearch">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 찾기</h2>
                    </div>
                    <div className="content">
                        <form action="">
                            <ul>
                                <li>
                                    <button className={isTap ? '' : 'on'}>휴대폰 인증</button>
                                    <button className={isTap ? 'on' : ''}>이메일 인증</button>
                                </li>
                                <li><label htmlFor="userName">아이디</label></li>
                                <li>
                                    <input onChange={onChangeId} type="text" name='user_id' id='userId' value={userId} placeholder='아이디를 입력해주세요'/>   
                                </li>
                                <li><label htmlFor="userHp">휴대폰 번호</label></li>
                                <li>
                                    <input onChange={onChangeHp} type="text" name='user_hp' id='userHp' value={userHp} placeholder='휴대폰 번호를 입력해주세요'/>
                                </li>
                                <li><button className={isBtn ? 'on' : ''}>인증번호받기</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

