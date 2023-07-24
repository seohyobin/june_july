import React from 'react';
import viewProductImg from './img/product/1b2676a0-4ad6-4fde-8970-49438e6c3eae.jpg';
import iconHeart from './img/product/icon_heart1.svg';
import iconBall from './img/product/icon_ball.svg';
import './go_top/scss/product.scss'

export default function ProductComponent({cartCountNunber}){
    
    const [cnt,setCnt]=React.useState(1);
    const [state,setState] =React.useState({
        상품:{},
        key:'HB_KURLY_CART_PRODUCT'
    });
    const [isCart,setIsCart]=React.useState(false);
    const [isCartOk,setIsCartOk]=React.useState(false);


     
    const {상품,key}=state;
    
    React.useEffect(()=>{
        setState({
            ...state,
            상품:{
                ...state.상품,
                수량:cnt,
                총상품금액:Math.round(cnt*(상품.정가))
            }  
        })
    },[cnt]);

    //개수 증가 함수
    const onClickAdd=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
        setIsCart(true);
        
    }
    //개수 감소 함수
    const onClickSub=(e)=>{
        e.preventDefault();
        if(cnt<=1) return;
        setCnt(cnt-1);
        setIsCart(true);
        
    }
        React.useEffect(()=>{
            //상품정보 가져오기
            if(localStorage.getItem('HB_KURLY_RECENTLY_VIEW')!==null){
                let result=JSON.parse(localStorage.getItem('HB_KURLY_RECENTLY_VIEW'));
                console.log(result);
                
                setState({
                    ...state,
                    상품:result[0]
                })
                // console.log(result[0]);

            }

        },[])

     //장바구니 저장하기 버튼
    const onClickCart=(e)=>{
        e.preventDefault();

        //수량 총금액 계산값이 없다면
        if(isCart===false){ //수량증감 변화가 없는상태 => 클릭 안된 상태
           
            setState({
                ...state,
                상품 : {
                    ...state.상품,
                    수량: 1,
                    총상품금액:Math.round(cnt*(상품.정가))
                }
            })
        }
        setIsCart(false);//초기화
        setIsCartOk(true); //장바구니 버튼 클릭했다.
       
    }


    React.useEffect(()=>{
        let arr = [];
        if(isCartOk===true){ //장바구니를 클릭하면 실행
            setIsCartOk(false);//논리값은 초기화 시켜야지 계속 사용가능해! 
            if(localStorage.getItem(key)!==null){
                arr = JSON.parse(localStorage.getItem(key));



                //중복된 데이터는 하나로 저장 수량을 합산한다.
                //1.가져온 데이터 로컬스토리지 저장소 가져온 데이터와
                //2.상세페이지의 장바구니에 들어갈 상품정보데이터를 제품코드를 비교한다.
                //3.중복된 제품코드가 있다면 제품코드는 레코드 하나만 저장하되 수량과 금액은 합산한다. 



                arr = [상품, ...arr]
                localStorage.setItem(key, JSON.stringify(arr)); 
                //여기에서 최상위 컴포넌트에세 수량을 전달 그리고 
                //최상위 컴포넌트는 헤더(하위)에 장바구니 수량 프롭스로 전달
            }
            else {
                arr = [상품]
                localStorage.setItem(key, JSON.stringify(arr));
            } 
        
        cartCountNunber(arr.length);
        }
    },[isCartOk])

    React.useEffect(()=>{
         
        if(localStorage.getItem(key)!==null){
            let arr = JSON.parse(localStorage.getItem(key));
            cartCountNunber(arr.length);    
        }
        
    },[]);

    // 상품 클릭 이벤트 매개변수 들어옴

    return (
        <div id='product'>
        <div className="container">
            <section id="section1">
                <div className="content">
                    <div className="left">
                        <div className="img-box">
                            <img src={상품.이미지} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            <ul>
                                <li><h4>{상품.배송구분}</h4></li>
                                <li><h2>{`[${상품.제조사}]${상품.제품명}`}</h2></li>
                                <li><p>{상품.제품특성}</p></li>
                                <li>
                                    {
                                        상품.할인율 > 0 && <span>{Math.round(상품.할인율*100)}%&nbsp;&nbsp;&nbsp;</span>
                                    }<strong>{(상품.정가*(1-상품.할인율)).toLocaleString('ko-KR')}원</strong></li>
                                <li><em>{상품.정가}원</em></li>
                                <li><h5>로그인 후, 할인 및 적립 혜택 이 제공됩니다.</h5></li>
                                <li><a href="!#">컬리카드 - 최대 <strong>472원</strong> 적립 + 첫 결제 3만원 할인</a></li>
                            </ul>
                        </div>
                        <div className="middle">
                            <ul>
                                <li>
                                    <div className="col1">
                                        배송
                                    </div>
                                    <div className="col2">
                                        <strong>{상품.배송구분}</strong><br/>
                                        23시 전 주문 시 내일 아침 7시 전 도착(대구·부산·울산 샛별배송 운영시간 별도 확인)
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        판매자
                                    </div>
                                    <div className="col2">
                                        {상품.판매처}
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        포장타입
                                    </div>
                                    <div className="col2">
                                        1통
                                    </div>
                                </li>
                                <li>
                                   <div className="col1">
                                        판매단위
                                    </div>
                                    <div className="col2">
                                        368g 내외
                                    </div>
                                     
                                </li>
                                <li>
                                    <div className="col1">
                                        <strong>원산지</strong>
                                    </div>
                                    <div className="col2">
                                        <strong>상품설명/상세정보 참조</strong>
                                    </div>                                        
                                </li>
                                <li>
                                    <div className="col1">
                                        알레르기정보
                                    </div>
                                    <div className="col2">
                                        - 땅콩 함유
                                    </div>                                        
                                </li>
                                <li>
                                    <div className="col1">
                                        유통기한(또는 소비기한)정보
                                    </div>
                                    <div className="col2">
                                        수령일 포함 최소 125일 남은 제품을 보내드립니다. 
                                    </div>                                         
                                </li>
                                <li>
                                    <div className="col1">
                                        상품선택
                                    </div>
                                    <div className="col2">
                                        {상품.제품명}<br/>
                                        적립제외상품
                                    </div>                                         
                                </li>
                                <li>
                                    <div className="col1">
                                        &nbsp;
                                    </div>
                                    <div className="col2">
                                        <div className="count-number-price">
                                            <div className="col2-left">
                                                <button  onClick={onClickSub}>-</button>
                                                <span>{cnt}</span>
                                                <button  onClick={onClickAdd}>+</button>
                                            </div>
                                            <div className="col2-right">
                                                <em>{(상품.정가*1).toLocaleString('ko-KR')}원</em>
                                                <strong>{Math.round(상품.정가*(1-상품.할인율)).toLocaleString('ko-KR')}원</strong>
                                            </div>
                                        </div>
                                    </div> 
                                </li>
                            </ul>
                        </div>
                        <div className="bottom">
                            <div className="total-calc">
                                    <h2>총 상품금액 : <strong>{(cnt*(상품.정가*(1-상품.할인율))).toLocaleString('ko-KR')}</strong><em>원</em></h2>
                                    <p><em>적립</em> 로그인 후, 할인 및 적립 혜택 제공</p>
                            </div>
                            <div className="cart-btn-box">
                                <button><img src={iconHeart} alt="" /></button>
                                <button><img src={iconBall} alt="" /></button>
                                <button onClick={onClickCart}>장바구니담기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="content">

                </div>
            </section>
            <section id="section3">
                <div className="content">

                </div>
            </section>
            <section id="section4">
                <div className="content">

                </div>
            </section>
            <section id="section5">
                <div className="content">

                </div>
            </section>
            <section id="section6">
                <div className="content">

                </div>
            </section>
            <section id="section7">
                <div className="content">

                </div>
            </section>
            <section id="section8">
                <div className="content">

                </div>
            </section>
            <section id="section9">
                <div className="content">

                </div>
            </section>
            <section id="section10">
                <div className="content">

                </div>
            </section>
            <section id="section11">
                <div className="content">

                </div>
            </section>
            <section id="section12">
                <div className="content">

                </div>
            </section>
            <section id="section13">
                <div className="content">

                </div>
            </section>
        </div>              
    </div>
    );
};
