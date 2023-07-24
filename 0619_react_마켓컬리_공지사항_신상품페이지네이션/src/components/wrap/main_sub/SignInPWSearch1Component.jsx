/* eslint-disable default-case */
import React from 'react';
import { Link } from 'react-router-dom';
import './scss/pwSearch1.scss';
import del from '../img/signin/icon-del.svg';
import { useRef } from 'react';

export default function SignInPWSearch1Component(){
    
    const [isTap,setIsTap]=React.useState(true);
    const [isBtn,setIsBtn]=React.useState(false);
    const [isBtn2,setIsBtn2]=React.useState(false);

    //휴대폰 인증
    const [userId,setuserId]=React.useState('');
    const [userHp,setUserHp]=React.useState('');

    //이메일 인증
    const [userEmail,setUserEmail]=React.useState('');
    const [userId2,setuserId2]=React.useState('');
    
    //인증키
    const [isAuth,setIsAuth]=React.useState(false);
    const [userHpAuth,setUserHpAuth]=React.useState('');

    //휴대폰 인증 useRef
    const userIdRef=React.useRef();
    const userHpRef=React.useRef();

    //이메일 인증 useRef
    const userId2Ref=React.useRef();
    const userEmailRef=React.useRef();

    //이름입력
    const onChangeId=(e)=>{
        setuserId(e.target.value);
    }
    const onChangeId2=(e)=>{
        setuserId2(e.target.value);
    }

    //휴대폰입력
    const onChangeHp=(e)=>{
        setUserHp(e.target.value);
    }
    //이메일입력
    const onChangeEmail=(e)=>{
        setUserEmail(e.target.value);
    }
    //휴대폰인증입력
    const onChangeHpAuth=(e)=>{
        setUserHpAuth(e.target.value);
    }

    //인증키 확인버튼 클릭이벤트
    const onClickAuthOk=(e)=>{
        e.preventDefault();
        //인증확인 됐다고 가정하고 비밀번호 재설정으로 이동    
        window.location.pathname='/pwReset';
    }

    const onClickTabBtn=(e,value)=>{
        e.preventDefault();
        if(value==='hp'){
            setIsTap(true);
        }
        else{
            setIsTap(false);
        }
       
    }
    const onClickAuth=(e)=>{
        e.preventDefault();
        setIsAuth(true);
    }
    const onCliclIconDel=(e,value)=>{
        e.preventDefault();
        switch(value){
            case 'userId' :
                setuserId('');
                userIdRef.current.focus();
                return ;
            case 'userId2' :
                setuserId2('');
                userId2Ref.current.focus();
                return ;
            case 'userHp' :
                setUserHp('');
                userHpRef.current.focus();
                return ;
            case 'userEmail' :
                setUserEmail('');
                userEmailRef.current.focus();
                return ;
        }
    }


    React.useEffect(()=>{
        // if(userId!=='' &&  userHp!==''){
        //     setIsBtn(true)
        // }
        // else{
        //     setIsBtn(false)
        // }
        (userId!=='' &&  userHp!=='') ? setIsBtn(true) : setIsBtn(false);
        (userId2!=='' &&  userEmail!=='') ? setIsBtn2(true) : setIsBtn2(false);
    },[userId,userHp,userEmail,userId2])


    return (
        <main id="signInPwSearch1">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 찾기</h2>
                    </div>
                    <div className="content">
                        <form action="" autoComplete='off'>
                            <ul>
                                <li>
                                    <button onClick={(e)=>onClickTabBtn(e,'hp')} className={isTap ? 'on' : ''}>휴대폰 인증</button>
                                    <button onClick={(e)=>onClickTabBtn(e,'email')} className={isTap ? '' : 'on'}>이메일 인증</button>
                                </li>

                                {
                                    isTap ?
                                    (                                   
                                        <>
                                            <li><label htmlFor="userId">아이디</label></li>
                                            <li>
                                                <input ref={userIdRef} onChange={onChangeId} type="text" name='user_id' id='userId' value={userId} placeholder='이름을 입력해주세요'/>  
                                                {userId!=='' && <a onClick={(e)=>onCliclIconDel(e,'userId')} href="!#"><img src={del} alt="" /></a> }                                            </li>
                                            <li><label htmlFor="userHp">휴대폰 번호</label></li>
                                            <li>
                                                <input ref={userHpRef} onChange={onChangeHp} type="text" name='user_hp' id='userHp' value={userHp} placeholder='휴대폰 번호를 입력해주세요'/>
                                                {userHp!=='' && <a onClick={(e)=>onCliclIconDel(e,'userHp')}  href="!#"><img src={del} alt="" /></a> }

                                            </li>
                                    
                                            <li></li>
                                            {
                                                 isAuth &&  
                                                (
                                            <>

                                            <li>
                                                <label htmlFor="userHp">인증번호</label>
                                            </li>
                                                <li>
                                                    <input onChange={onChangeHpAuth} type="text" name='user_hp_auth' id='userHpAuth' value={userHpAuth} placeholder='인증번호7자리'/>
                                                    <button>재발송</button>
                                                </li>
                                                
                                            </>
                                                )
                                            }
                                          


                                            <li>
                                        {  
                                            !isAuth ?       
                                        (
                                                <button onClick={onClickAuth} className={isBtn ? 'on' : ''}>인증번호받기</button>
                                        ) : 
                                        (
                                                <button onClick={onClickAuthOk} className={isBtn ? 'on' : ''}>확인</button>
                                        )
                                        }
                                                
                                            </li>
                                           
                                        </>
                                    )
                                        :
                                    (
                                            
                                        <>
                                        
                                            <li><label htmlFor="userId2">아이디</label></li>
                                            <li>
                                                <input ref={userId2Ref} onChange={onChangeId2} type="text" name='user_id2' id='userId2' value={userId2} placeholder='이름을 입력해주세요'/>
                                                {userId2!=='' && <a  onClick={(e)=>onCliclIconDel(e,'userId2')}  href="!#"><img src={del} alt="" /></a> }                                            
                                            </li>

                                            <li><label htmlFor="userHp">이메일</label></li>
                                            <li>
                                                <input ref={userEmailRef} onChange={onChangeEmail} type="email" name='user_email' id='userEmail' value={userEmail} placeholder='이메일을 입력해주세요'/>
                                                {userEmail!=='' && <a onClick={(e)=>onCliclIconDel(e,'userEmail')}  href="!#"><img src={del} alt="" /></a> }

                                            </li>
                                            <li><button className={isBtn2 ? 'on' : ''}>확인  </button></li>
                                        </>
                                    )
                                }

                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

