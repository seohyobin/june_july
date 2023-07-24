import React from 'react';
import viewProductImg from './img/product/1b2676a0-4ad6-4fde-8970-49438e6c3eae.jpg';
import iconHeart from './img/product/icon_heart1.svg';
import iconBall from './img/product/icon_ball.svg';
import './go_top/scss/product.scss'

export default function ProductComponent () {
    return (
        <div id='product'>
            <div className="container">
                <section id="section1">
                    <div className="content">
                        <div className="left">
                            <div className="img-box">
                                <img src={viewProductImg} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                                <ul>
                                    <li><h4>샛별배송</h4></li>
                                    <li><h2>[리버퀸] 스패니쉬 땅콩 368g</h2></li>
                                    <li><p>언제 먹어도 쩐내 없는 고소함</p></li>
                                    <li><span></span><strong></strong></li>
                                    <li><em>11,800원</em></li>
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
                                            <strong>샛별배송</strong><br/>
                                            23시 전 주문 시 내일 아침 7시 전 도착(대구·부산·울산 샛별배송 운영시간 별도 확인)
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            판매자
                                        </div>
                                        <div className="col2">
                                            컬리
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
                                            [리버퀸] 스패니쉬 땅콩 368g<br/>
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
                                                    <button>-</button>
                                                    <span>1</span>
                                                    <button>+</button>
                                                </div>
                                                <div className="col2-right">
                                                    <em>11,800원</em>
                                                    <strong>9,400원</strong>
                                                </div>
                                            </div>
                                        </div> 
                                    </li>
                                </ul>
                            </div>
                            <div className="bottom">
                                <div className="total-calc">
                                        <h2>총 상품금액 : <strong>9,440원</strong></h2>
                                        <p><em>적립</em> 로그인 후, 할인 및 적립 혜택 제공</p>
                                </div>
                                <div className="cart-btn-box">
                                    <button><img src={iconHeart} alt="" /></button>
                                    <button><img src={iconBall} alt="" /></button>
                                    <button>장바구니담기</button>
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
