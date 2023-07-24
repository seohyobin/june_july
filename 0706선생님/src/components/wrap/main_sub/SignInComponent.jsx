import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/signin.scss';

export default function SignInComponent () {

    const {userId, setUserId} = React.useState('');
    const {userPw, setUserPw} = React.useState('');

    const onChangeUserId=(e)=>{
        setUserId(e.target.value);
    }
    const onChangeUserPw=(e)=>{
        setUserPw(e.target.value);
    }


    return (
        <main id='signIn'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>로그인</h2>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li>
                                    <input 
                                    onChange={onChangeUserId}
                                    type="text" 
                                    name='user_id' 
                                    id='userId' 
                                    value={userId} 
                                    placeholder='아이디를 입력해주세요' 
                                    />
                                </li>
                                <li>
                                    <input 
                                    onChange={onChangeUserPw}
                                    type="password" 
                                    name='user_pw' 
                                    id='userPw' 
                                    value={userPw} 
                                    placeholder='비밀번호를 입력해주세요' 
                                    />
                                </li>
                                <li>
                                    <span>
                                        <Link to="/idSearch">아이디 찾기</Link>
                                        <i>|</i>
                                        <Link to="/pwSearch">비밀번호 찾기</Link>
                                    </span></li>
                                <li><button>로그인</button></li>
                                <li><Link to="/signup">회원가입</Link></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};