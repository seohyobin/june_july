import React from 'react';
import'./go_top/scss/cart.scss';
import up from'./img/cart/icon-upper.svg';
import './go_top/scss/confirm_modal2.scss'

export default function CartComponent({confirmModalOpen,openPopupDaumPostApi,addr}) {

    //장바구니 가져오기
    const[isLogin , setIsLogin]=React.useState(true);
    const [cart, setCart]=React.useState([]);
    const [arr1, setArr1]=React.useState([]); 
    const [arr2, setArr2]=React.useState([]); 
    const [arr3, setArr3]=React.useState([]); 
    const [isConfirm,setIsConfirm]=React.useState(false);
    const [delCode,setDelCode]=React.useState('');
    const [isdelete,setIsDelete]=React.useState(false);
  

    const onClickCntSUB = (e,record) => {
        e.preventDefault();
        console.log(record);
        //수량 감소 : 결과를 리턴 받는다.
        //현재 각 행마다 구분하는 제품코드(PrimaryKey)
        //비교문 다음 해당하지 않는 데이터는 그냥 그대로의 값으로 리턴한다.
        //해당하는 제품은 수량,금액 수정 후 저장한다.
        //배열[{제품코드:PRODUCT001,수량:10,총상품금액:70000..},
        //     {제품코드:PRODUCT002,수량:3,총상품금액:35000..}...]
       const result= cart.map((item)=>{
            return(
                item.제품코드===record.제품코드 ? ({...item, 수량: (item.수량 >= 2 ? item.수량-1 : 1), 총상품금액: Math.round((item.수량 >= 2 ? item.수량-1 : 1)*(item.정가)) }) : ({...item})
            )
        });
        console.log(result);

        //리턴 받는 결과 데이터를 카트 배열에 저장한다.
        setCart(result);
        localStorage.setItem('HB_KURLY_CART_PRODUCT', JSON.stringify(result));
  
    };

    const initMethod =()=>{
        if(localStorage.getItem('HB_KURLY_CART_PRODUCT')!==null){
            let result = JSON.parse(localStorage.getItem('HB_KURLY_CART_PRODUCT'));
    
            //정렬 보관방법의 오름차순 asc
            result.sort((a,b)=>{
                if(a.보관방법 > b.보관방법)return  1;
                if(a.보관방법 < b.보관방법)return -1;
                if(a.보관방법===b.보관방법)return  0;
            }); 
            //console.log(result);
            setCart(result);

            let arr1=[];
            let arr2=[];
            let arr3=[];

            // 반복문
            result.map((item,idx)=>{
                if(item.보관방법      === '냉장'){
                    arr1=[...arr1,item]
                }
                else if(item.보관방법 === '냉동'){
                    arr2=[...arr2,item] 
                }
                else if(item.보관방법 === '상온'){
                    arr3=[...arr3,item]   
                }
                setArr1(arr1);
                setArr2(arr2);
                setArr3(arr3);
            })
        }
 
    };

    const onClickCntADD=(e,record)=>{
        e.preventDefault();
        console.log(record);
        const result= cart.map((item)=>{
            return(
                item.제품코드===record.제품코드 ? ({...item, 수량:(item.수량+1), 총상품금액: Math.round((item.수량+1)*(item.정가)) }) : ({...item})
            )
        });
        console.log(result);

        //리턴 받는 결과 데이터를 카트 배열에 저장한다.
        setCart(result);
        localStorage.setItem('HB_KURLY_CART_PRODUCT', JSON.stringify(result));


    };

    React.useEffect(()=>{
        initMethod();
    },[]);


    //장바구니 제품 삭제
    const onClickDel=(e,record)=>{
        e.preventDefault();
        setIsDelete(true);
        setDelCode(record.제품코드); //상태관리변수
    };

    React.useEffect(()=>{
        isdelete && setIsConfirm(true); 
    },[delCode,isdelete ]);    //삭제 상태관리 변수가 변경되면 모달창 띄운다.
    
    //삭제 모달창 취소,확인 클릭 이벤트 구현 

    const onClickComfirmModalClose=(e,value)=>{
        e.preventDefault();
        if(value==='확인'){
            const result = cart.filter((item)=>item.제품코드!==delCode);
            setCart(result);
            localStorage.setItem('HB_KURLY_CART_PRODUCT',JSON.stringify(result))
            initMethod();
           
        }
        setDelCode(''); //초기화
        setIsConfirm(false);//초기화
        setIsDelete(false);//초기화
      

    }
    
    //장바구니 우측 금액 표기 상태변수
    const [state, setState]=React.useState({
        총상품금액:0,//누계#555
        상품할인금액:0,//누계
        배송비:0,//결정
        결제예정금액:0//결정
    });

    const {총상품금액,상품할인금액,배송비,결제예정금액}=state;
        //카트가 들어오면 계산이 이루어진다.

    React.useEffect(()=>{
            let 총상품금액=0
            let 상품할인금액=0
            let 결제예정금액=0
            let 배송비=0

        cart.map((item,idx)=>{
            if(item.수량!==undefined && item.총상품금액 !== undefined){
                총상품금액 += item.총상품금액;
                상품할인금액 += Math.round(item.정가*item.할인율);
                배송비 = ((총상품금액-상품할인금액) < 40000 ? 3000: 0);
                결제예정금액=(총상품금액-상품할인금액)+배송비;
            }    
        });
        setState({
            ...state,
            총상품금액:총상품금액,
            상품할인금액:상품할인금액,
            배송비:배송비,
            결제예정금액:결제예정금액
        })

    },[cart])
    
 
    const res1=cart.map((item,idx)=>{
        if(item.보관방법==='냉장'){
        return(
            <>
                <dd key={idx} className=''>
                        <ul>
                            <li>
                                <input type="checkbox" name='chk' id='chk1' value={item.제품코드} />  
                            </li>
                            <li>
                                <span style={{backgroundImage: `url(${item.이미지})`}} className='cart-small-bgimg  blind'>Cart Small Image</span>
                            </li>
                            <li>
                                <a href="!#">{item.제품명}</a>
                            </li>
                            <li>
                                <div>
                                    <button className={`sub-bgimg-btn blind ${ item.수량===1 ?' on' : ''}`} onClick={(e)=>onClickCntSUB(e,item)}>빼기</button>
                                    <strong>{item.수량}</strong>
                                    <button className='add-bgimg-btn blind' onClick={(e)=>onClickCntADD(e,item)}>더하기</button>
                                </div>
                            </li>
                            <li>
                                <span>{(item.판매가).toLocaleString('ko-KR')}원</span> <br/>   
                                <span className='price-sub'>{(item.총상품금액).toLocaleString('ko-KR')}원</span>    
                            </li>
                            <li>
                                <a href="!#" className='del-bgimg-btn blind' onClick={(e)=>onClickDel(e,item)}>삭제버튼</a>
                            </li>
                        </ul>
                </dd>
            </>
        )
    }
    })
    const res2=cart.map((item,idx)=>{
        if(item.보관방법==='냉동'){
        return(
            <>
                <dd key={idx}>
                    <ul>
                        <li>
                            <input type="checkbox" name='chk' id='chk1' value={item.제품코드} />  
                        </li>
                        <li>
                            <span style={{backgroundImage: `url(${item.이미지})`}} className='cart-small-bgimg  blind'>Cart Small Image</span>
                        </li>
                        <li>
                            <a href="!#">{item.제품명}</a>
                        </li>
                        <li>
                            <div>
                                <button className={`sub-bgimg-btn blind ${item.수량===1 ? ' on' : ' '}`} onClick={(e)=>onClickCntSUB(e,item)}>빼기</button>
                                <strong>{item.수량}</strong>
                                <button className='add-bgimg-btn blind' onClick={(e)=>onClickCntADD(e,item)}>더하기</button>
                            </div>
                        </li>
                        <li>
                            <span>{(item.판매가).toLocaleString('ko-KR')}원</span> <br/>   
                            <span className='price-sub'>{(item.총상품금액).toLocaleString('ko-KR')}원</span>          
                        </li>
                        <li>
                            <a href="!#" className='del-bgimg-btn blind' onClick={(e)=>onClickDel(e,item)}>삭제버튼</a>
                        </li>
                    </ul>
                </dd>
            </>
            
        )
    }
    })
    const res3=cart.map((item,idx)=>{
        if(item.보관방법==='상온'){
        return(
            <>
                <dd key={idx}>
                    <ul>
                        <li>
                            <input type="checkbox" name='chk' id='chk1' value={item.제품코드} />  
                        </li>
                        <li>
                            <span style={{backgroundImage: `url(${item.이미지})`}} className='cart-small-bgimg  blind'>Cart Small Image</span>
                        </li>
                        <li>
                            <a href="!#">{item.제품명}</a>
                        </li>
                        <li>
                            <div>
                                <button className={`sub-bgimg-btn blind ${ item.수량===1 ? ' on' : ''}`} onClick={(e)=>onClickCntSUB(e,item)}>빼기</button>
                                <strong>{item.수량}</strong>
                                <button className='add-bgimg-btn blind' onClick={(e)=>onClickCntADD(e,item)}>더하기</button>
                            </div>
                        </li>
                        <li>
                            <span>{(item.판매가).toLocaleString('ko-KR')}원</span> <br/>   
                            <span className='price-sub'>{(item.총상품금액).toLocaleString('ko-KR')}원</span>        
                        </li>
                        <li>
                            <a href="!#" className='del-bgimg-btn blind' onClick={(e)=>onClickDel(e,item)}>삭제버튼</a>
                        </li>
                    </ul>
                </dd>
            </>
        )
    }
    })


    return (
        <>
        <div id='cart'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h1>장바구니</h1>
                    </div>
                    <div className="content">
                        <div className="left">
                            <ul>
                                <li>
                                    <span>
                                        <button className='select-all-btn'>
                                            전체선택
                                            <strong>
                                                (
                                                    <em className='select-count'>{3}</em> 
                                                    <i>/</i> 
                                                    <em className='cart-tot'>{5}</em>
                                                )
                                            </strong>
                                        </button>
                                        <i>|</i>
                                        <button className='delete-btn'>
                                            선택삭제
                                        </button>
                                    </span>

                                </li>
                                <li>
                                    {
                                    cart.length ===0 ?
                                    (
                                        <p className='empty'>장바구니에 담긴 상품이 없습니다.</p> 
                                    )
                                    :
                                    (
                                     
                                        <dl>
                                            {/* 냉장 */}{
                                            (
                                               
                                                arr1.length >= 1 && 
                                                <>
                                               
                                                    <dt>
                                                        <div><img src="./images/cart/icon01.svg" alt="" /><h3>냉장 상품</h3></div> 
                                                        <div><button><img src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                                    </dt>
                                                    {res1}
                                                </>
                                            )
                                            }

                                            {/* 냉동 */}

                                            {
                                            (
                                                arr2.length >= 1 &&
                                                <>
                                                    <dt>
                                                        <div><img src="./images/cart/icon02.svg" alt="" /><h3>냉동 상품</h3></div> 
                                                        <div><button><img src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                                    </dt>
                                                    {res2}
                                                </>
                                            )
                                            }

                                            {/* 상온 */}
                                        
                                            {
                                            (
                                                arr3.length >= 1 &&
                                                <>
                                                    <dt>
                                                        <div><img src="./images/cart/icon03.svg" alt="" /><h3>상온 상품</h3></div> 
                                                        <div><button><img src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                                    </dt>
                                                    {res3}
                                                </>
                                            )
                                            }
                                        </dl>
                                    )
                                    }
                                </li>
                                <li>
                                    <span>
                                        <button className='select-all-btn'>
                                            전체선택
                                            <strong>
                                                (
                                                    <em className='select-count'>{3}</em> 
                                                    <i>/</i> 
                                                    <em className='cart-tot'>{5}</em>
                                                )
                                            </strong>
                                        </button>
                                        <i>|</i>
                                        <button className='delete-btn'>
                                            선택삭제
                                        </button>
                                    </span>

                                </li>
                            </ul>
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <h3>
                                        <img src="./images/cart/ico_location.svg" alt="" />
                                        배송지
                                    </h3>
                                    <p>
                                        
                                    {    addr.isAddr === false ? (   
                                            <>
                                                <em>배송지를 등록</em> 하고 <br/>
                                                구매 가능한 상품을 확인하세요!
                                            </>    
                                        )
                                        :
                                        (
                                            `${addr.주소1} ${addr.주소2}`
                                        )
                                    }
                                    </p>
                                    <button  onClick={openPopupDaumPostApi}>
                                        {    addr.isAddr === false ? (   
                                                <>
                                                <img src="./main_subimages/cart/ico_search_purple.svg" alt="" />주소 검색
                                                </>
                                            )
                                            :
                                            (
                                               <>배송지 변경</>
                                            )
                                        }

                                    
                                    
                                    
                                    </button>
                                </li>
                                <li>
                                    <div>
                                        <div className="row1">
                                            <p><strong>상품금액</strong><strong>{(총상품금액).toLocaleString('ko-KR')}원</strong></p>
                                            <p>
                                                <strong>상품할인금액</strong><strong>{isLogin=== true? `-${(상품할인금액).toLocaleString('ko-KR')}`:'0'}원</strong>
                                                
                                                {/* { !isLogin &&                                           
                                                     <span>로그인 후 할인 금액 적용</span>
                                                }      
                                                                                       */}
                                                { isLogin===true ?'':<span>로그인 후 할인 금액 적용</span>                                        
                                                     
                                                }                                            
                                            </p>
                                            <p><strong>배송비</strong><strong>{ 배송비 > 0 ? `+${(배송비).toLocaleString('ko-KR')}`: 0}원</strong></p>

                                            {배송비 > 0 &&
                                            <span className='sub-add'>{총상품금액 < 40000 && (40000-(총상품금액-상품할인금액)).toLocaleString('ko-KR')}원 추가주문시, <strong className='st'>무료배송</strong></span>
                                            }

                                        </div>
                                        <div className="row2">
                                            <p><strong>결제예정금액</strong><strong>{(결제예정금액).toLocaleString('ko-KR')}원</strong></p>
                                            <p><strong><em>적립</em>로그인 후 회원 등급에 따라 적립</strong></p>
                                        </div>
                                    </div>                                        
                                </li>
                                <li>
                                    <button>배송지를 입력해주세요</button>    
                                    <p>
                                        [주문완료] 상태일 경우에만 주문 취소 가능합니다.<br/> 
                                        [마이컬리 &gt; 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    {  isConfirm&&(
            <div id="confirmModal2">
            <div className="wrap2">
                <div className="container">
                    <div className="content">
                        <div className="title-box">
                            <h1>삭제하시겠습니까?</h1>
                        </div>
                        <div className="button-box">
                        <button onClick={(e)=>onClickComfirmModalClose(e,"취소")}>취소</button>
                        <button onClick={(e)=>onClickComfirmModalClose(e,"확인")}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
    </>
    );
};