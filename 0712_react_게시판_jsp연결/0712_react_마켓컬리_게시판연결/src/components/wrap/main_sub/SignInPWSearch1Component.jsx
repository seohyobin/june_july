/* eslint-disable default-case */
import React from 'react';
import { Link } from 'react-router-dom';
import './scss/pwSearch1.scss';
import del from '../img/signin/icon-del.svg';
import { useRef } from 'react';
import {useNavigate}  from 'react-router-dom';
import {ConfirmContext} from '../../../context/ConfirmContext';
import axios from 'axios';
export default function SignInPWSearch1Component(){
    const {confirmModalOpen, isConfirmModal} = React.useContext(ConfirmContext);
    const navigate = useNavigate();

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

    // 발급된인증키
    const [hpAuth, setHpAuth] = React.useState('');

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
    
    const onClickHpAuth=(e)=>{
        e.preventDefault();
        setIsAuth(true);
        // 인증번호 발송 7자리
        let authNum = Math.floor(Math.random()*(9000000+1000000));
        // 발급된인증키저장
        setHpAuth(authNum);        
        confirmModalOpen(`인증번호가 발송되었습니다. 3분안에 인증번호를 입력해주세요.${authNum}`);
    }
    //인증키 확인버튼 클릭이벤트
    const onClickAuthOk=(e)=>{
        e.preventDefault();
        const regExp = /[^0-9]/g;
        let 휴대폰 = '';

        // 숫자가 아니면 삭제
        휴대폰 = userHp.replace(regExp, '');

        if(userId===''){
            confirmModalOpen('아이디를 입력해 주세요');
        }
        else if(휴대폰===''){
            confirmModalOpen('휴대폰 번호를 입력해 주세요');
        }
        else{
            // 인증확인됐다고 하고
            // 비밀번호 재설정 페이지로 이동
            // 인증번호(키)를 상태변수랑 비교하고
            // 일치하면 인증에 true 지정 설정 변경하고 
            // 아이디를 찾아서 결과를 결과페이지에 전송한다.
            if(hpAuth===Number(userHpAuth)){
                setIsAuth(true);
                // 이름, 휴대폰을 데이터베이스 서버에 전송하고
                // 결과가 일치하면 아이디를 결과화면에 쿼리스트링 파라미터값으로 전송한다.
                // 그리고 결과화면에서 보여준다.


                const regExpHp = /^(\d{3})(\d{4})(\d{4})$/g;  //010-7942-5305   010-348-6441        
                const result = 휴대폰.replace(regExpHp, '$1-$2-$3');

                axios({
                    // 이름, 휴대폰번호를 전송한다.
                    url:'/kurly/pwSearchAction.jsp',
                    method: 'POST',
                    data:{},
                    params: {
                        "user_id": userId,
                        "user_hp": result
                    }
                })
                .then((res)=>{
            
            
                    console.log( res );
                    console.log( res.data );

                    const result = res.data;
                    try {                    
                        if( result === null ){ // null 이면 가입회원이 아닙니다. 회원가입하세요                      
                            confirmModalOpen('가입회원이 아닙니다. 회원가입하세요 ');
                            window.location.pathname = `/signup`;
                        }
                        else{
                            // 파라미터 전송 라우터때문에 404페이지로 이동이되는문제 해결
                            // 1. 최상위컴폰넌트에 상태관리변수 아이디 에 저장 그리고 결과화면에 연동한다.
                            // 2. 라우터를 이용한다. navigate() 이용하여 파라미터를 state 객체를 이용 
                            // 키와 키값을 전송
                            confirmModalOpen(' 가입 회원의 아이디를 확인하고 로그인하세요!');    
                            // 라우터 네비게이트 사용 구현 파미터전송                       
                            navigate('/pwReset', {state: {아이디 : userId, 비밀번호: result.비밀번호, 가입일: result.가입일}});
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
                setIsAuth(false);
            }
        }
       
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
        e.preventDefault();
        setIsAuth(true);
        // 인증번호 발송 7자리
        let authNum = Math.floor(Math.random()*(9000000+1000000));
        // 발급된인증키저장
        setHpAuth(authNum);        
        confirmModalOpen(`인증번호가 발송되었습니다. 3분안에 인증번호를 입력해주세요.${authNum}`);
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
                                                <input ref={userIdRef} onChange={onChangeId} type="text" name='user_id' id='userId' value={userId} placeholder='아이디를 입력해주세요'/>  
                                                {userId!=='' && <a onClick={(e)=>onCliclIconDel(e,'userId')} href="!#"><img src={del} alt="" /></a> }                                            
                                            </li>
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
                                                <label htmlFor="userHp" >인증번호</label>
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

