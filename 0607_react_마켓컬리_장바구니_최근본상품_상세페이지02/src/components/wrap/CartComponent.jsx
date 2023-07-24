import React from 'react';
import './go_top/scss/cart.scss';

export default function CartComponent(){
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
                                <li className='head'>
                                    <span>
                                        <button className='select-btn'>
                                             전체선택
                                            <strong>
                                               (<em className='select-count'>3</em>
                                                <i>/</i>
                                                <em className='cart-tot'>5</em>)
                                            </strong>
                                        </button>
                                        <i>|</i>
                                        <button className='delete-btn'>
                                            선택삭제
                                        </button>
                                    </span>
                                </li>
                                <li className='con'>
                                    <dl>    
                                        <dt>
                                            <div>
                                                <img src="./img/cart/icon-upper.svg" alt="" />
                                                <h3>냉장식품</h3>
                                                <div><button><img src="./img/cart/icon-arrow-up.svg" alt="" /></button></div>
                                            </div>
                                        </dt>
                                        <dd>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" name='chk' id='chk1' value='PRODUCT0001'/>
                                                </li>
                                                <li>
                                                    <span className='cart-img-bg blind'> cart small Image</span>
                                                </li>
                                                <li>
                                                    <a href="!#">
                                                        <p>[햇반/쿡반] 불고기 주먹밥 800g</p>
                                                        <p>[햇반/쿡반] 노릇노릇 구운 주먹밥 800g 9종 (택1)</p>
                                                    </a>
                                                </li>
                                                <li>
                                                        <div>
                                                            <button className='sub-btn blind'>빼기</button>
                                                            <strong>2</strong>
                                                            <button className='add-btn blind'>더하기</button>
                                                        </div>
                                                </li>
                                                <li>
                                                    <span>31,500원</span>
                                                </li>
                                                <li>
                                                    <a href="!#" className='del-btn-bg blind' >
                                                        삭제버튼
                                                    </a>
                                                </li>
                                            </ul>
                                        </dd>
                                    </dl>

                                </li>
                                <li className='head'>
                                    <span>
                                        <button className='select-btn'>
                                            전체선택
                                            <strong>
                                                (<em className='select-count'>3</em>
                                                <i>/</i>
                                                <em className='cart-tot'>5</em>)
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
                                            <img src="./img/cart/ico_location.svg" alt="" />배송지
                                        </h3>
                                        <p><em>배송지를 등록</em>하고 <br />
                                        구매 가능한 상품을 확인하세요.</p>
                                        <h4>샛별배송</h4>
                                        <button><img src="./img/cart/ico_search_purple.svg" alt="" />주소검색</button>   
                                    </li>
                                    <li>
                                        <div className="row1">
                                            <p><strong>상품금액</strong><strong>31,000원</strong></p>
                                            <p>
                                                <strong>상품금액</strong><strong>31,000원</strong>
                                                <span>로그인 후 할인 금액 적용</span>
                                            </p>
                                            <p><strong>배송비</strong><strong>0원</strong></p>
                                        </div>
                                        <div className="row2">
                                            <p><strong>결제예정금액</strong><strong>31,000원</strong></p>
                                            <p><strong><em>적립</em></strong><strong>최대 0 원 적립</strong></p>

                                        </div>
                                    </li>
                                    <li>
                                        <button>주문하기</button>
                                        <p>쿠폰/적립금은 주문서에서 사용 가능합니다 <br />
                                        &gt;주문완료&gt; 상태일 경우에만 주문 취소 가능합니다. <br />
                                        &gt;마이컬리&gt; 주문내역 상세페이지&gt; 에서 직접 취소하실 수 있습니다. <br />
                                        쿠폰, 적립금 사용 금액을 제외한 실 결제 금액 기준으로 최종 산정됩니다.<br/>
                                        상품별로 적립금 지급 기준이 다를 수 있습니다. (상품 상세 페이지에서 확인 가능합니다)
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

