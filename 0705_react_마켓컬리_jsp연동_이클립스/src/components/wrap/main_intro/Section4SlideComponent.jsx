import React from 'react';
    //판매가격 정가 콤마형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        } 
    }
export default function Section4SlideComponent({일일특가,setViewProduct}){



    const onClickProductList =(e, item)=>{
        e.preventDefault();
        // console.log(`product ${제품코드} `);
        // console.log(`product http://localhost:3000/images/sub1/${이미지} `); //절대경로
        let object = {
            보관방법:item.보관방법,
            제품코드:item.제품코드,
            배송구분:item.배송구분,
            제품명:item.제품명,
            제조사:item.제조사,
            제품특성:item.제품특성,
            정가:item.정가,
            할인율:item.할인율,
            판매처:item.판매처,
            판매가:Math.round(item.정가 * (1-item.할인율)),
            이미지:`http://localhost:3001/images/sub1/${item.이미지} `,
            저장일시:new Date().getTime()
        }
        setViewProduct(object);
        window.location.pathname='/product';
    }
    return (
        <div className="right">
            <ul>

            {   
                일일특가.map((item)=>{
                    return(
                        <li className="slide" key={item.제품코드}>
                            <div className="col-gal">
                                    <a href="!#" onClick={(e)=>onClickProductList(e,item.제품코드,item.이미지)}>
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
    );
};

