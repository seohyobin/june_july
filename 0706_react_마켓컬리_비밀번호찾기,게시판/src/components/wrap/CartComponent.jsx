import React from 'react';
import'./go_top/scss/cart.scss';
import up from'./img/cart/icon-upper.svg';
import './go_top/scss/confirm_modal2.scss'
import { useRef } from 'react';
import { setgroups } from 'process';
import { AddressApiContext } from '../../context/AddressApiContext';
import { GlobalContext } from '../../context/GlobalContext';

export default function CartComponent() {

    const {openPopupDaumPostApi,addr}=React.useContext(AddressApiContext);
    const {CARTPRODUCTKEY}=React.useContext(GlobalContext);

    //장바구니 가져오기
    const[isLogin , setIsLogin]=React.useState(true);
    const [cart, setCart]=React.useState([]);
    const [arr1, setArr1]=React.useState([]); 
    const [arr2, setArr2]=React.useState([]); 
    const [arr3, setArr3]=React.useState([]); 
    const [isConfirm,setIsConfirm]=React.useState(false);
    const [delCode,setDelCode]=React.useState(false);
    const [isdelete,setIsDelete]=React.useState(false);
    ////////////////////////체크박스 상태변수///////////////////////////////
    const [check,setCheck]=React.useState([]);
    const [isSelectDel,setIsSelectDel] =React.useState(false);//선택삭제
    const [isCheckAll, setIsCheckAll] =React.useState(true);
    //모두선택 배열 => 장바구니에 들어온 모든 리스트 목록이 저장을 하는 공간
    const [checkAll, setCheckAll] =React.useState([]);
    ////////////////////////////////////////////////////////////////////////
    //장바구니 목록 리스트 슬라이드 업 다운
    const ddRef = useRef([]);
    const [listH,setListH]=React.useState([0,0,0]);
    const [isUp,setIsUp]=React.useState([true,true,true]);

    // React.useEffect(()=>{
    //     setIsCheckAll(true);
    //     setCheck(checkAll);
    // },[checkAll]);

    React.useEffect(()=>{
        try{
            listH.map((item,i)=>{
                listH[i] = ddRef.current[i].offsetHeight;
                setListH(...listH); 
            })
        }
        catch(e){

        }
    },[]);
    
    const onclickSlideUpDown=(e,n)=>{
        e.preventDefault();

        // let isUp=true;

        if(isUp[n]===true){
            ddRef.current[n].style.height='60px';
            isUp[n]=false;
        }
        else{
            ddRef.current[n].style.height='auto';
            isUp[n]=true;
        }
        setIsUp([...isUp]);

    }

    const onClickCntSUB =(e,record) => {
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
        localStorage.setItem(CARTPRODUCTKEY, JSON.stringify(result));
  
    };

    const initMethod=()=>{
        if(localStorage.getItem(CARTPRODUCTKEY)!==null){
            let result = JSON.parse(localStorage.getItem(CARTPRODUCTKEY));
    
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
            // 임시배열변수에 제품코드 저장
            let temp =[];
            result.map((item, idx)=>{
                temp = [...temp,item.제품코드]; //제품코드

                if(item.보관방법      === '냉장'){
                    arr1=[...arr1,item]
                }
                else if(item.보관방법 === '냉동'){
                    arr2=[...arr2,item] 
                }
                else if(item.보관방법 === '상온'){
                    arr3=[...arr3,item]   
                }

            });
            //임시배열 변수에 저장된 배열 값을 모두 checkAll[]에 저장한다.
            setCheckAll(temp);
            setArr1(arr1);
            setArr2(arr2);
            setArr3(arr3);
            setIsSelectDel(false);
        
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
        localStorage.setItem(CARTPRODUCTKEY, JSON.stringify(result));


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
        let result='';

        if(value==='확인'){          //check['a','b'] cart['a','b','c'....]  => art['c'....]
            if(isSelectDel===true){ //선택삭제 :선택삭제목록을 제외한 내용 재편집
                result = cart.filter((item)=>!check.includes(item.제품코드))

            }
            else{                   //개별삭제(목록에서)
                result = cart.filter((item)=>item.제품코드!==delCode)
            }

            setCheck([]);//선택삭제내용
            setCart(result);
            localStorage.setItem(CARTPRODUCTKEY,JSON.stringify(result))
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
                상품할인금액 += (Math.round(item.정가*item.할인율));
                배송비 = ((총상품금액-상품할인금액) < 40000 ? 3000: 0);
                결제예정금액=(총상품금액-상품할인금액)+배송비;
            }    
            console.log(item.상품할인금액)
        });
        setState({
            ...state,
            총상품금액:총상품금액,
            상품할인금액:상품할인금액,
            배송비:배송비,
            결제예정금액:결제예정금액
        })

    },[cart])
    

    ///////////////////////////////////////////////////////////
    //체크박스 이벤트
    ////////////////////////////////////////////////////////////


    const onClickCheckAll=(e)=>{
       
        e.preventDefault();
        if(isCheckAll===false){ //모두 선택 
            setIsCheckAll(true);
            setCheck(checkAll); //제품코드 모두 저장
        }
        else{
            setIsCheckAll(false); //모두 해제
            setCheck([]); //제품코드 모두 삭제

        }
    }
    
    //개별체크 박스
    const onChangeCheck=(e)=>{
        let temp =[];
        if(e.target.checked===true){
            // console.log(e.target.value);
            // console.log(e.target.checked);
            setCheck([...check,e.target.value]);
        }
        else if(e.target.checked===false){//선택취소 삭제
            temp=check.filter((item)=>item!==e.target.value);
            setCheck(temp); //삭제
        }
    }

    /////////////////전체 선택 체크
    React.useEffect(()=>{
        
        if(check.length===cart.length){
            setCheckAll(true);
        }
        else{
            setCheckAll(false);
        }
        //선택삭제 버튼 true false
        if(check.length > 0){
            setIsSelectDel(true);
        }
        else{
            setIsSelectDel(false);
        }
        
    },[cart.length, check]);

    ///////선택삭제 클릭하면 삭제 모달창 띄운다
    //취소 확인버튼 증 확인버튼 누르면  클릭하면 삭제된다.  
    const onClickSelectDel=(e)=>{
        e.preventDefault();
        setIsConfirm(true);
        
    }


    const res1=cart.map((item,idx)=>{
        if(item.보관방법==='냉장'){
        return(
            <>
                <dd key={idx} ref={(el)=>(ddRef.current[0]=el)}>
                        <ul>
                            <li>
                                <input checked={check.includes(item.제품코드)} type="checkbox" name='chk' id='chk1' value={item.제품코드} onChange={onChangeCheck}  />  
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
                <dd key={idx}  ref={(el)=>(ddRef.current[1]=el)}>
                    <ul>
                        <li>
                            <input checked={check.includes(item.제품코드)} type="checkbox" name='chk' id='chk1' value={item.제품코드} onChange={onChangeCheck}  />  
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
                            <input checked={check.includes(item.제품코드)} type="checkbox" name='chk' id='chk1' value={item.제품코드}  onChange={onChangeCheck} />  
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
                                <li> {/* 위쪽 전체 선택, 삭제 */}
                                    <span>
                                        <button className={`select-all-btn ${ isCheckAll ? ' on' : '' }`} onClick={onClickCheckAll}>
                                            전체선택
                                            <strong>
                                                (
                                                    <em className='select-count'>{check.length}</em> 
                                                    <i>/</i> 
                                                    <em className='cart-tot'>{cart.length}</em>
                                                )
                                            </strong>
                                        </button>
                                        <i>|</i>
                                        <button onClick={onClickSelectDel} disabled={!isSelectDel} className={`delete-btn ${isSelectDel? ' on' : ''}`}>
                                            선택삭제
                                        </button>
                                    </span>

                                </li>
                                <li> {/* 장바구니 목록 출력 */}
                                    {
                                    cart.length ===0 ?
                                    (
                                        <p className='empty'>장바구니에 담긴 상품이 없습니다.</p> 
                                    )
                                    :
                                    (
                                      <>
                                       
                                            {/* 냉장 */}

                                            {
                                            (
                                               
                                                arr1.length >= 1 && 
                                                <div>
                                                    <dl  ref={(el)=>(ddRef.current[0]=el)}>
                                                        <dt>
                                                            <div><img className={`${!isUp[0] ? ' on': ''}`}  src="./images/cart/icon01.svg" alt="" /><h3>냉장 상품</h3></div> 
                                                            <div><button onClick={(e)=>onclickSlideUpDown(e,0)}><img className={`${!isUp[0] ? ' on': ''}`} src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                                        </dt>
                                                    {res1}
                                                    </dl>
                                                </div>
                                            )
                                            }

                                            {/* 냉동 */}

                                            {
                                            (
                                                arr2.length >= 1 &&
                                                <div>
                                                    <dl  ref={(el)=>(ddRef.current[1]=el)}>
                                                        <dt>
                                                            <div><img className={`${!isUp[1] ? ' on': ''}`} src="./images/cart/icon02.svg" alt="" /><h3>냉동 상품</h3></div> 
                                                            <div><button onClick={(e)=>onclickSlideUpDown(e,1)}><img className={`${!isUp[1] ? ' on': ''}`} src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                                        </dt>
                                                        {res2}
                                                    </dl>
                                                </div>
                                            )
                                            }

                                            {/* 상온 */}
                                        
                                            {
                                            (
                                                arr3.length >= 1 &&
                                                <div>
                                                    <dl ref={(el)=>(ddRef.current[2]=el)}>
                                                        <dt>
                                                            <div><img className={`${!isUp[2] ? ' on': ''}`} src="./images/cart/icon03.svg" alt="" /><h3>상온 상품</h3></div> 
                                                            <div><button onClick={(e)=>onclickSlideUpDown(e,2)}><img className={`${!isUp[2] ? ' on': ''}`} src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                                        </dt>
                                                        {res3}
                                                    </dl>
                                                </div>
                                            )
                                            }
                                       </>
                                    )
                                    }
                                </li>
                                <li>{/* 아래쪽 전체 선택, 삭제 */}
                                    <span>
                                    <button className={`select-all-btn ${ isCheckAll ? ' on' : '' }`} onClick={onClickCheckAll}>
                                            전체선택
                                            <strong>
                                                (
                                                    <em className='select-count'>{check.length}</em> 
                                                    <i>/</i> 
                                                    <em className='cart-tot'>{cart.length}</em>
                                                )
                                            </strong>
                                        </button>
                                        <i>|</i>
                                        <button onClick={onClickSelectDel} disabled={!isSelectDel} className={`delete-btn ${isSelectDel? ' on' : ''}`}>
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
                                    <button  onClick={()=>openPopupDaumPostApi()}>
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
                                                <strong>상품할인금액</strong><strong>{isLogin=== true?  ( Number(상품할인금액) > 0 ?`-${Number(상품할인금액).toLocaleString('ko-KR')}`: 0 ):'0'}원</strong>
                                                
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