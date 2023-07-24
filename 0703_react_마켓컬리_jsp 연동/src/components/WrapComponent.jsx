import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//고정페이지
import TopModalComponent  from './wrap/TopModalComponent';
import HeaderComponent    from './wrap/HeaderComponent';
import IntroMainComponent from './wrap/IntroMainComponent'; //인트로 메인 페이지 

//서브페이지
import Sub1Component      from './wrap/main_sub/Sub1Component';
import Sub2Component      from './wrap/main_sub/Sub2Component';
import Sub3Component      from './wrap/main_sub/Sub3Component';
import Sub4Component      from './wrap/main_sub/Sub4Component';
//서브페이지:회원가입
import SignUpComponent    from './wrap/main_sub/SignUpComponent';
//서브페이지:로그인
import SignInComponent from './wrap/main_sub/SignInComponent';
import SignInIDSearchComponent from './wrap/main_sub/SignInIDSearchComponent';
import SignInPWSearch1Component from './wrap/main_sub/SignInPWSearch1Component';
import SignInPWResetComponent from './wrap/main_sub/SignInPWResetComponent';
import SignInIDSearchResultComponent from './wrap/main_sub/SignInIDSearchResultComponent';
//게시판
import NoticeComponent from './wrap/main_sub_bbs/NoticeComponent';
import NoticeWriteFormPageComponent from './wrap/main_sub_bbs/NoticeWriteFormPageComponent';
import NoticeViewPageComponent from './wrap/main_sub_bbs/NoticeViewPageComponent';
//고정페이지
import FooterComponent    from './wrap/FooterComponent';
import ConfirmModal       from './wrap/ConfirmModal';
import GoTopComponent     from './wrap/GoTopComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';


//상세페이지
import ProductComponent from './wrap/ProductComponent';

//장바구니(cart)
import CartComponent from './wrap/CartComponent';

//context 사용
import { AddressApiContext } from '../context/AddressApiContext';
import { ConfirmContext } from '../context/ConfirmContext';
import { LocalStorageContext } from '../context/LocalStorageContext';
import { CartContext } from '../context/CartContext';
import { GlobalContext } from '../context/GlobalContext';
import Error404pageComponent from './wrap/Error404pageComponent';
import ConfirmModalOkCancle from './wrap/ConfirmModalOkCancle';
import NoticeUpdateFormPage from './wrap/main_sub_bbs/NoticeUpdateFormPage';

//메인 모달 로컬스토리지에 dateTime  사용
import MainModalComponent from './wrap/MainModalComponent';
//카카오 주소검색 모달 api 
import PostCodeComponent from './wrap/PostCodeComponent';



export default function WrapComponent(){
    //관리자인증
    //메인모달 showIn ShoWout
    const [mainModal, setMainModal]=React.useState(true);
    //카카오 주소 검색 API
    const [postModal, setPostModal]=React.useState(false);

    //카카오 모달 열기
    const postCodeClose=()=>{
        setPostModal(false);

    }
    //카카오 모달 닫기
   const postCodeOpen=()=>{
        setPostModal(true);
    }

    const mainModalshowIn=()=>{
        setMainModal(true);

    }
        //헤더영역 배송지 등록, 장바구니, 회원가입 주소등록
        const openPopupDaumPostApi= async ()=>{
            //주소변경없이 창을 닫는다면 주소 변경 못하게 막는다.
            setPostModal(true);        
        }
    //자식컴포넌트에서 클릭이벤트 
    const mainModalshowOut=()=>{
        setMainModal(false);
    }
    const mainModalAyearshowOut=()=>{
        let today  = new Date();
        today.setFullYear(today.getFullYear()+1);
        const obj={
            id:202306301151,
            expires : today.getTime()
        }
        localStorage.setItem('MAINMODALONEYEARCLOSE',JSON.stringify(obj))
        setMainModal(false);
    }
    //로딩시 로컬스토리지에 데이터 중 MAINMODALONEYEARCLOSE 를 이용 키값을 가져온다
    //키값이 만료기한으로 남아있다면 모달창을 열지않고 만료기한이 지났다면 연다


    React.useEffect(()=>{
        if(localStorage.getItem('MAINMODALONEYEARCLOSE')!==null){
           let result = JSON.parse(localStorage.getItem('MAINMODALONEYEARCLOSE'));
           console.log(result);
            let today = new Date();
            today.setFullYear(today.getFullYear()+1);
            today.getFullYear(today.getFullYear()+1);
           if(today >= result.expires){ //만료일 지나면 모달 열기 (보이기)

                setMainModal(true);
                localStorage.removeItem('MAINMODALONEYEARCLOSE');
           }
           else{ //만료일 이전이면 모달 닫기(숨기기)
                console.log('만료일이 남았습니다. ');
                setMainModal(false);

           }
        }
    },[])

    const [isAdmin,setIsAdmin]=React.useState(true);

    const [ADMINKEY]=React.useState({
        CARTPRODUCTKEY:'HB_KURLY_CART_PRODUCT',
        VIEWPRODUCTKEY:'HB_KURLY_RECENTLY_VIEW',
        TOPMODALKEY:'HB_KURLY_TOPMODAL',
        ADDRESSKEY:'JANEADDRESS'
    });
    const {CARTPRODUCTKEY,VIEWPRODUCTKEY,TOPMODALKEY,ADDRESSKEY}=ADMINKEY;


    //마켓컬리 주소 통합 상태관리(헤더,장바구니,회원가입 보내줘)
    const [addr,setAddr] =React.useState({
        주소1:'',
        주소2:'',
        isAddr:false,
        key :ADDRESSKEY
    });
    //새로고침시 자동 실행
    const addressAuto= async()=>{
        if(sessionStorage.getItem(ADDRESSKEY)!==null){
            const 주소1=JSON.parse(sessionStorage.getItem(ADDRESSKEY)).주소1;
            const 주소2=JSON.parse(sessionStorage.getItem(ADDRESSKEY)).주소2;
            setAddr({
                ...addr,
                주소1:주소1,
                주소2:주소2,
                isAddr:true
            })
           }    
           return ''; //메세지 안보이게 
    }
    React.useEffect(()=>{
        addressAuto();
    },[addr.isAddr])


    

    //장바구니 수량 카운트 상태변수

    const [cartCount,setCartCount]=React.useState(0);

    //장바구니에 수량 카운트 상태변수를 전달하는 함수
    const cartCountNunber=(num)=>{
        setCartCount(num);
    }
    React.useEffect(()=>{
        cartCountNunber();
    },[])
    //네비게이션
    const [isIntro , setIsIntro]=React.useState(true);
    //헤더영역에서 라우터 링크 이용해서 값을 변경한다.

    //매개변수 z로 변경해줭
    const setIsIntroFn=(z)=>{
        setIsIntro(z);
    }

    const [product,setProduct] =React.useState({
        key:VIEWPRODUCTKEY,
        sign: false,
        getViewProduct : []
    });


    //  비구조화 !! 구조분할할당
    const {getViewProduct,key,sign} = product;

    // 상품 클릭 이벤트 매개변수 들어옴
    const setViewProduct=(value)=>{
        let arr = [];

        if(localStorage.getItem(key)!==null){
            arr = JSON.parse(localStorage.getItem(key));
            arr = [value, ...arr]
            localStorage.setItem(key, JSON.stringify(arr) );  
            setProduct({
                ...product,
                sign: !sign,
                getViewProduct: arr
            });  
        }
        else {
            arr = [value]
            localStorage.setItem(key, JSON.stringify(arr) );
            setProduct({
                ...product,
                sign: !sign,
                getViewProduct: arr
            });
        }        
    }
   


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

        confirmModalMsg:'',
        isConfirmModal:false,

        confirmMsgOKCancle:'',
        isConfirmModalOKCanCle:false,
        isConfirmModalOKCanCleResult:''
    });
    const {confirmModalMsg,isConfirmModal,confirmMsgOKCancle,isConfirmModalOKCanCle,isConfirmModalOKCanCleResult}=modal;


    //삭제 확인 취소 컨펌 모달창 열기 메소드
    const confirmModalMsgOKCanCleOpen=(msg)=>{
        setModal({
            ...modal,
            confirmMsgOKCancle:msg,
            isConfirmModalOKCanCle:true
        })
    }
    //삭제 확인 취소 컨펌 모달창 닫기 메소드
    const confirmModalMsgCancleCanCleClose=(value)=>{
        setModal({
            ...modal,
            isConfirmModalOKCanCle:false,
            isConfirmModalOKCanCleResult:value

        })
        
    }
    
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
        key :TOPMODALKEY,
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
            today.setDate(today.getDate() + expires ); // - 하면 없어져
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
            //모달 닫기했던 쿠키가 존재하면
            //모달 닫기를 수행한다. => 새로고침 해도 또 설정 또 설정..  계속 설정!!!!
            cookie.map((item)=>{


                // if(item.key===topModal.key && item.value=== 'yes'){
                if(item.key.includes(topModal.key) && item.value.includes('yes')){
                    setTopModal({
                        ...topModal,
                        isTopModal:false
                    })
                    return;
                }


            })
        }
        React.useEffect(()=>{
            getCookieMethod();  
        },[topModal.isTopModal]);


    //상위컴포넌트 프롭스에 등록
    //하위 컴포넌트에 보내줄때 state.dlfma 써서 등록 ->보내주면 서용거눙
    // 비구조화해서 받는다  export default function HeaderComponent({MapText,isMap}) {에 등록!!!!!


        
    return (
        <div id='wrap'>
            <GlobalContext.Provider value={{CARTPRODUCTKEY,VIEWPRODUCTKEY,TOPMODALKEY,ADDRESSKEY,isAdmin,mainModal,mainModalshowOut,mainModalAyearshowOut,addressAuto,postCodeOpen,postCodeClose}}>

            {
                topModal.isTopModal&&<TopModalComponent  topModalClose={topModalClose}/>
            }   
                    <CartContext.Provider value={{cartCountNunber,cartCount}}>
                    <LocalStorageContext.Provider value={{setViewProduct}} >
                    <ConfirmContext.Provider value={{modal,confirmModalOpen,confirmModalClose,confirmModalMsgOKCanCleOpen,confirmModalMsgCancleCanCleClose}}>
                    <AddressApiContext.Provider value={{addr,openPopupDaumPostApi}}>
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                            <Routes>
                                <Route path='/' element={<HeaderComponent setIsIntroFn={setIsIntroFn} MapText={state.MapText} isMap={state.isMap}/>}>
                                    <Route index element={<IntroMainComponent setViewProduct={setViewProduct}/>}/>
                                    <Route path='/main' element={<IntroMainComponent setViewProduct={setViewProduct}/> }/>
                                    <Route path='/sub1' element={<Sub1Component setViewProduct={setViewProduct}/>}/>
                                    <Route path='/sub2' element={<Sub2Component setViewProduct={setViewProduct}/>}/>
                                    <Route path='/sub3' element={<Sub3Component setViewProduct={setViewProduct}/>}/>
                                    <Route path='/sub4' element={<Sub4Component/>}/>
                                    <Route path='/signup' element={<SignUpComponent timer={state} timerCounterfn={timerCounterfn}  mapAddressFn={mapAddressFn}/>}/>
                                    <Route path='/signin' element={<SignInComponent/>}/>
                                    <Route path='/idSearch' element={<SignInIDSearchComponent/>}/>
                                    <Route path='/pwSearch' element={<SignInPWSearch1Component/>}/>
                                    <Route path='/pwReset' element={<SignInPWResetComponent/>}/>
                                    <Route path='/idSearchResult' element={<SignInIDSearchResultComponent/>}/>
                                    <Route path='/product' element={<ProductComponent key={key}/>}/>
                                    <Route path='/cart' element={<CartComponent key={key}/>}/>
                                    <Route path='/*' element={<Error404pageComponent/>}/>
                                    <Route path='/notice' element={<NoticeComponent/>}/>
                                    <Route path='/notice_write' element={<NoticeWriteFormPageComponent/>}/>
                                    <Route path='/notice_view' element={<NoticeViewPageComponent/>}/>
                                    <Route path='/notice_update' element={<NoticeUpdateFormPage/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </AddressApiContext.Provider>
                   {
                    mainModal && <MainModalComponent/>
                    }
                   {
                    postModal && <PostCodeComponent/>
                    }
                
                <FooterComponent/>
                {/* <GoTopComponent/> */}
                <QuickMenuComponent product={product} isIntro={isIntro}/>
                {                 
                    modal.isConfirmModalOKCanCle && <ConfirmModalOkCancle/>
                }
                {
                    modal.isConfirmModal && <ConfirmModal/>
                }
      
                </ConfirmContext.Provider>
                </LocalStorageContext.Provider>
                </CartContext.Provider>
                </GlobalContext.Provider>
        </div>
    );
}; 