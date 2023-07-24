import React from 'react';
import jQuery from 'jquery';

    //판매가격 정가 콤마형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        } 
    }


export default function Section3SlideComponent({상품,n}){


    return (
        <div className="slide-container">
            <div className="slide-view">
                <ul className="slide-wrap">

                {
                    상품.map((item)=>{
                        return(
                            <li className="slide" key={item.제품코드} >
                                <div className="col-gal">
                                    <a href="!#">
                                        <div className="img-box">
                                            <img src={`./images/sub1/${item.이미지}`} alt="" />
                                            <span>
                                                <img src="./images/sub1/icon_cart.svg" alt="" />
                                            </span>
                                        </div>
                                        <div className="tex-box">
                                                <ul>
                                                    <li>{item.배송구분}</li>
                                                    <li><strong>[{item.제조사}]</strong> <em>{item.제품명}</em></li>
                                                    <li>{item.제품특성}</li>
                                                    <li><span className='rate-price'>{item.할인율===0 ? `` :`${Math.round(item.할인율*100)}%`}</span>{item.할인율 > 0 &&(<span className='pan-price'>{commaPrice(item.정가*(1-0.1))}</span>)}</li>
                                                    <li>{item.할인율===0? <span className='pan-price'>{commaPrice(item.정가)}</span> : <s>{commaPrice(item.정가)}</s> }</li>
                                                    <li className='review'>후기<span className='span-img'><img src="./images/intro/review.svg" alt="" /></span></li>
                                                </ul>
                                        </div>
                                    </a>
                                </div>  
                            </li>
    
                        )
                    })


                }

                </ul>
            </div>
        </div>
    );
};

