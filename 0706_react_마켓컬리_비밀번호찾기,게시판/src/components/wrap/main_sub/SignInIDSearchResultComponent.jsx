import React from 'react';
import { Link, useSearchParams,useLocation } from 'react-router-dom';
import './scss/idResult.scss';
import {GlobalContext} from '../../../context/GlobalContext';
import search from '../img/signin/icon-id-search-result.svg';
export default function SignInIDSearchResultComponent(){
    const {login, setLogin} = React.useContext(GlobalContext);

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
    //라우터에 파라미터 이용방법 네비게이션 파라미터 이용 방법으로 구현
    const location = useLocation();  

    const [param, setParam] = useSearchParams();  
    React.useEffect(()=>{
            console.log( location.state.아이디 );
            console.log( location.state.가입일 );
            setLogin({
                ...login,
                아이디: location.state.아이디,
                가입일: location.state.가입일,
                비밀번호:location.state.비밀번호
            })

            // setLogin({
            //     ...login,
            //     아이디: param.get('아이디'),
            //     가입일: param.get('가입일')
            // })
    },[]);


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
                                            <span>{login.아이디}</span><br />
                                            <em>{login.가입일}</em>
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

