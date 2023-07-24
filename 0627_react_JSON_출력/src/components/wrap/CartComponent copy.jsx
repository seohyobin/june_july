import React from 'react';
import'./go_top/scss/cart.scss';
import up from'./img/cart/icon-upper.svg';
import axios from 'axios';

export default function CartComponent() {

    //장바구니 가져오기
    const [cart,setCart]=React.useState([]); 

    React.useEffect(()=>{
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

                if(item.보관방법 === '냉동'){
                    arr1=[...arr1,item]
                    console.log(arr1);
                    
                }
                else if(item.보관방법 === '냉장'){
                    arr2=[...arr2,item] 
                    console.log(arr2);               
                }
                else if(item.보관방법 === '상온'){
                    arr3=[...arr3,item]   
                    console.log(arr3);
                }
            })
        }
 
    },[])



    return (
        <div id='cart'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h1>장바구니</h1>
                    </div>
                    <div className="content">
                        <div className="left">
                            <ul>
                                <li className=''>
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
                                    <dl>

                                        {/* 냉장 */}
                                        {
                                            (
                                                cart.length>0 && 
                                        <dt>
                                            <div><img src="./images/cart/icon01.svg" alt="" /><h3>냉장 상품</h3></div> 
                                            <div><button><img src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                        </dt>
                                            )
                                        }

                                        {
                                    cart.map((item,idx)=>{
                                            if(item.보관방법==='냉장'){
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
                                                                        <button className='sub-bgimg-btn blind'>빼기</button>
                                                                        <strong>{item.수량}</strong>
                                                                        <button className='add-bgimg-btn blind'>더하기</button>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <span>{item.총상품금액}원</span>    
                                                                </li>
                                                                <li>
                                                                    <a href="!#" className='del-bgimg-btn blind'>삭제버튼</a>
                                                                </li>
                                                            </ul>
                                                    </dd>
                                                </>
                                            )
                                        }
                                        })
                                            
                                        }
                                              {
                                            (
                                                cart.length>0 &&
                                 
                                        <dt>
                                            <div><img src="./images/cart/icon02.svg" alt="" /><h3>냉동 상품</h3></div> 
                                            <div><button><img src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                        </dt>
                                                 )
                                                }


                                        {
                                        cart.map((item,idx)=>{
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
                                                                    <button className='sub-bgimg-btn blind'>빼기</button>
                                                                    <strong>{item.수량}</strong>
                                                                    <button className='add-bgimg-btn blind'>더하기</button>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <span>{item.총상품금액}원</span>    
                                                            </li>
                                                            <li>
                                                                <a href="!#" className='del-bgimg-btn blind'>삭제버튼</a>
                                                            </li>
                                                        </ul>
                                                    </dd>
                                                </>
                                             )
                                        }
                                        })
                                            
                                        }
                                        
                                                 {
                                            (
                                                cart.length>0 &&

                                        <dt>
                                            <div><img src="./images/cart/icon03.svg" alt="" /><h3>상온 상품</h3></div> 
                                            <div><button><img src="./images/cart/icon-arrow-up.svg" alt="" /></button></div>
                                        </dt>
                                        )
                                        }

                                        {
                                        
                                        cart.map((item,idx)=>{
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
                                                                    <button className='sub-bgimg-btn blind'>빼기</button>
                                                                    <strong>{item.수량}</strong>
                                                                    <button className='add-bgimg-btn blind'>더하기</button>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <span>{item.총상품금액}원</span>    
                                                            </li>
                                                            <li>
                                                                <a href="!#" className='del-bgimg-btn blind'>삭제버튼</a>
                                                            </li>
                                                        </ul>
                                                    </dd>
                                                </>
                                             )
                                        }
                                        })
                                            
                                        }
                                    
                                    </dl>
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
                                        <em>배송지를 등록</em> 하고<br/>
                                        구매 가능한 상품을 확인하세요!
                                    </p>
                                    <button><img src="./main_subimages/cart/ico_search_purple.svg" alt="" />주소 검색</button>
                                </li>
                                <li>
                                    <div>
                                        <div className="row1">
                                            <p><strong>상품금액</strong><strong>309,900원</strong></p>
                                            <p>
                                                <strong>상품할인금액</strong><strong>309,900원</strong>
                                                <span>로그인 후 할인 금액 적용</span>
                                            </p>
                                            <p><strong>배송비</strong><strong>0원</strong></p>
                                        </div>
                                        <div className="row2">
                                            <p><strong>결제예정금액</strong><strong>309,900원</strong></p>
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
    );
};