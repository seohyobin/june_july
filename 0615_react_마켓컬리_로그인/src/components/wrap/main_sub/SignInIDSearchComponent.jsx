/* eslint-disable default-case */
import React from 'react';
import { Link } from 'react-router-dom';
import './scss/idSearch.scss';
import del from '../img/signin/icon-del.svg';
import { useRef } from 'react';
import { ConfirmContext } from '../../../context/ConfirmContext';
import ConfirmModal from '../ConfirmModal';

export default function SignInIDSearchComponent(){
    const {confirmModalOpen,confirmModalClose}=React.useContext(ConfirmContext);

    //타이머
    const [minutes,setMinutes]=React.useState(0);
    const [seconds,setSeconds]=React.useState(0);
    
    const [isTap,setIsTap]=React.useState(true);
    const [isBtn,setIsBtn]=React.useState(false);
    const [isBtn2,setIsBtn2]=React.useState(false);

    //휴대폰 인증
    const [userName,setUserName]=React.useState('');
    const [userHp,setUserHp]=React.useState('');

    //이메일 인증
    const [userEmail,setUserEmail]=React.useState('');
    const [userName2,setUserName2]=React.useState('');
    
    //인증키
    const [isAuth,setIsAuth]=React.useState(false);
    const [userHpAuth,setUserHpAuth]=React.useState('');

    //휴대폰 인증 useRef
    const userNameRef=React.useRef();
    const userHpRef=React.useRef();

    //이메일 인증 useRef
    const userName2Ref=React.useRef();
    const userEmailRef=React.useRef();
/////////////////////////////////////////////////////////////////////////

    //타이머 동작 3분 카운트

    React.useEffect(()=>{
        let setId=0;
        let start=0;
        let nowTime = 0;
        let end = 0;
        let now = new Date();  

  
        const timerCount=()=>{
            start= new Date(now);
            nowTime=new Date();
            start.setMinutes(start.getMinutes()+3);
            end = start-nowTime;

            if(nowTime >= start){ //시작시간보다 현재시간이 크거나 같다면 종료타임
                clearInterval(setId);
                setMinutes(0);
                setSeconds(0);
            }
            else{
                let m =Math.floor(end/(60*1000)%60);
                let s =Math.floor((end/1000)%60);
                setMinutes(m);  
                setSeconds(s);
            }
        }

        if(isAuth===true){
            setId=setInterval(timerCount,1000);
        }      
        
    

      
    },[isAuth])






    //이름입력
    const onChangeName=(e)=>{
        setUserName(e.target.value);
    }
    const onChangeName2=(e)=>{
        setUserName2(e.target.value);
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
        let authNum=Math.floor(Math.random()*(9000000+100000));
        setUserHpAuth(authNum);
        confirmModalOpen(`인증번호가 발송되었습니다. 3분안에 인증번호를 입력해주세요.  ${authNum}`)
        //인증번호 발송하고 모달창 닫으면 타이머 동작


    }

    //인증키 확인버튼 클릭이벤트
    const onClickAuthOk=(e)=>{
        e.preventDefault();
        //인증확인 됐다고 가정하고이동    
        window.location.pathname='/idSearchResult';
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
    //////인증번호확인클리이벤트
    const onClickAuth=(e)=>{
        e.preventDefault();
        setIsAuth(true);
    }

    const onCliclIconDel=(e,value)=>{
        e.preventDefault();
        switch(value){
            case 'userName' :
                setUserName('');
                userNameRef.current.focus();
                return ;
            case 'userName2' :
                setUserName2('');
                userName2Ref.current.focus();
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
        // if(userName!=='' &&  userHp!==''){
        //     setIsBtn(true)
        // }
        // else{
        //     setIsBtn(false)
        // }
        (userName!=='' &&  userHp!=='') ? setIsBtn(true) : setIsBtn(false);
        (userName2!=='' &&  userEmail!=='') ? setIsBtn2(true) : setIsBtn2(false);
    },[userName,userHp,userEmail,userName2])


    return (
        <main id="signInIdSearch">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>아이디찾기</h2>
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
                                            <li><label htmlFor="userName">이름</label></li>
                                            <li>
                                                <input ref={userNameRef} onChange={onChangeName} type="text" name='user_name' id='userName' value={userName} placeholder='이름을 입력해주세요'/>  
                                                {userName!=='' && <a onClick={(e)=>onCliclIconDel(e,'userName')} href="!#"><img src={del} alt="" /></a> }                                            </li>
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
                                                    <button onClick={onClickHpAuth}>재발송</button>
                                                    <span>
                                                        <em>{minutes <10 ? `0${minutes}` : minutes}</em>
                                                        <i>:</i>
                                                        <em>{seconds <10 ? `0${seconds}` : seconds}</em>
                                                    </span>     
                                                </li>
                                                
                                            </>
                                                )
                                            }
                                          


                                            <li>
                                        {  
                                            !isAuth ?       
                                        (
                                                <button onClick={onClickHpAuth} className={isBtn ? 'on' : ''}>인증번호받기</button>
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
                                        
                                            <li><label htmlFor="userName2">이름</label></li>
                                            <li>
                                                <input ref={userName2Ref} onChange={onChangeName2} type="text" name='user_name2' id='userName2' value={userName2} placeholder='이름을 입력해주세요'/>
                                                {userName2!=='' && <a  onClick={(e)=>onCliclIconDel(e,'userName2')}  href="!#"><img src={del} alt="" /></a> }                                            
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

