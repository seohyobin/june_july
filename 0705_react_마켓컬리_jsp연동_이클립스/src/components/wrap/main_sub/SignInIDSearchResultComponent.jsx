import React from 'react';
import { Link } from 'react-router-dom';
import './scss/idResult.scss';
import search from '../img/signin/icon-id-search-result.svg';
export default function SignInIDSearchResultComponent(){

    const [userID,setUserId]=React.useState('');
    const [signUp,setSignUp]=React.useState('');
    

    const onClickPwSearch=(e)=>{
        e.preventDefault();
        window.location.pathname='/pwSearch';
    }
    const onClickLogin=(e)=>{
        e.preventDefault();
        window.location.pathname='/signin';
    }


    return (
        <main id="signInIdSearchResult">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>고객님의 컬리계정을 찾았습니다.</h2>
                        <p>아이디 확인 후 로그인 해주세요.</p>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="wrap">
                                        <img src={search} alt="" />
                                        <div className="span">
                                            <span>{userID}</span><br />
                                            <em>가입일{signUp}</em>
                                        </div>
                         
                                    </div>
                         
                                </li>
                                <li></li>
                                <li><button className='btn1' onClick={onClickPwSearch}>비밀번호찾기</button></li>
                                <li><button className='btn2' onClick={onClickLogin}>로그인</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

