/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import TopModalComponent  from './wrap/TopModalComponent';
import HeaderComponent    from './wrap/HeaderComponent';
import IntroMainComponent from './wrap/IntroMainComponent'; //인트로 메인 페이지 
import Sub1Component      from './wrap/Sub1Component';
import Sub2Component      from './wrap/Sub2Component';
import Sub3Component      from './wrap/Sub3Component';
import Sub4Component      from './wrap/Sub4Component';
import SignUpComponent    from './wrap/SignUpComponent';
import FooterComponent    from './wrap/FooterComponent';
import ConfirmModal       from './wrap/ConfirmModal';


export default function WrapComponent() {


    const [state,setState] = React.useState({
        minutes:2,
        seconds:59,
        setId:0,
        msg:'',
        isEnd:false,
        //헤더에 프롭스로 전달하기
        MapText:'서울마포구 마포대로 4나길 73 ',
        isMap : true,
    
    });

    const timerCounterfn=()=>{
        let setId = 0;
        let minutes=2;
        let seconds=59; 
        let msg=''; 
        let isEnd=false; 

        setId = setInterval(function(){ 
            seconds--;
            if(seconds<0){
                seconds=59;
                minutes--;
                if(minutes<0){
                    clearInterval(setId);
                    seconds=0;
                    minutes=0;
                    isEnd=true; //모달창에 true false값으로 전달 -> true
                    msg='유효시간이 경과되었습니다.'; //모달창에 메세지
                    
                }
            }
           
            setState({
                ...state,
                seconds:seconds,
                minutes:minutes,
                setId:setId, //환경변수 메모리의 실행중인 타이머의 할당 메모리 사용번호 인덱스를 clearInterval (2)->
                msg:msg,
                isEnd:isEnd
            })


            
        },1000)
    }

    const mapAddressFn=(a,b)=>{
        setState({
            ...state,
            MapText: a,
            isMap : b
        })
    }
    /////////////////////////////////모달 상태관리///////////////////////////////////////////
    const [modal,setModal] = React.useState({

        confirmModalMsg:'모달창의 자식창에서 보내온 타이틀 내용!!!!!!!!',
        isConfirmModal:false

    });
    //1.모달창 닫기 이벤트 => 모달창에 있는 버튼 클릭 이벤트 메소드 만들기
    const confirmModalClose=()=>{
            setModal({
                ...modal,
                isConfirmModal:false
            })
    }

    //2.모달창 열기 이벤트 => 모든 자식 컴포넌트에서 모달 열기와 메시지 전달하기 메소드 만들기

    const confirmModalOpen=(msg)=>{
        setModal({
            ...modal,
            confirmModalMsg:msg,
            isConfirmModal:true
        })
    }

    ///////////////////////////////////////////
    ///1.탑모달 상태관리
    ///////////////////////////////////////////
    const [topModal,setTopModal] =React.useState({
        key :'HB_KURLY_TOPMODAL',
        isTopModal:true 
    })


    //2-1 탑모달 닫기 함수 => 쿠키설정
        const topModalClose=(value,expires)=>{

            setTopModal({
                ...topModal,
                isTopModal:false
            });
            setCookieMethod(value,expires);
        }

    //3.쿠키 설정(저장)하기 : 탑모달은 닫기 클릭하면 쿠키 설정 저장!!
        const setCookieMethod =(value,expires)=>{
            let today= new Date();
            today.setDate(today.getDate() + expires );
            document.cookie=`${topModal.key}=${value};path=/; expires=${today.toUTCString()};`;
        }

    //4.쿠키 가져오기 : 설정된 쿠키가 없으면 탑모달은 열린다. 있다면(찾았다면 found) 아니면 닫는다.
        const getCookieMethod=()=>{
            if(document.cookie==='')return; //예외처리
            const result = document.cookie.split(';');
            let cookie=[];
            result.map((item,idx)=>{
                cookie[idx]={
                    key:item.split('=')[0].trim(),
                    value:item.split('=')[1].trim()
                }
            });

            //찾기 key :'HB_KURLY_TOPMODAL'
            cookie.map((item)=>{


                // if(item.key===topModal.key && item.value=== 'yes'){
                if(item.key.includes(topModal.key) && item.value.includes('yes')){
                    setTopModal({
                        ...topModal,
                        isTopModal:false
                    })
                }


            })
        }
        React.useEffect(()=>{
            getCookieMethod();  
        },[topModal.isTopModal]);


    //상위컴포넌트 프롭스에 등록
    //하위 컴포넌트에 보내줄때 state.dlfma 써서 등록 ->ㅂㅎ냐쥬묜 서용거눙
    // 비구조화해서 받는다  export default function HeaderComponent({MapText,isMap}) {에 등록!!!!!

    return (
        <div id='wrap'>
            {
                topModal.isTopModal&&<TopModalComponent  topModalClose={topModalClose}/>
            }
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<HeaderComponent MapText={state.MapText} isMap={state.isMap}/>}>
                                <Route index element={<IntroMainComponent/>}/>
                                <Route path='/메인' element={<IntroMainComponent/>}/>
                                <Route path='/신상품' element={<Sub1Component/>}/>
                                <Route path='/베스트' element={<Sub2Component/>}/>
                                <Route path='/알뜰상품' element={<Sub3Component/>}/>
                                <Route path='/특가혜택' element={<Sub4Component/>}/>
                                <Route path='/회원가입' element={<SignUpComponent timer={state} timerCounterfn={timerCounterfn}  mapAddressFn={mapAddressFn} confirmModalOpen={confirmModalOpen}/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>

                <FooterComponent/>

                {
                    modal.isConfirmModal && <ConfirmModal confirmModalMsg={modal.confirmModalMsg} confirmModalClose={confirmModalClose}/>
                }
        </div>
    );
};