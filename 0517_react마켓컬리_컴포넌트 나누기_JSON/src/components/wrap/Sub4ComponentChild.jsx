import React from 'react';

export default function Sub4ComponentChild({특가혜택}){

 // 정가, 판매가 금액에 콤머 형식 정규표현식 구현하기


    const result = 특가혜택.map((item)=>{
            return(
                
                    <li key={item.제품코드}>
                        <a href="!#">
                            <div className="img-box">
                                <img src={`./images/sub4/${item.이미지}`} alt="" />
                            </div>
                        </a>
                    </li>
            )
        
    })

    return (
            <ul>

                {
                //     신상품.map((item)=>{
                //         return(
                //                 <li key={item.제품코드}>
                //                     <a href="!#">
                //                         <div className="img-box">
                //                             <img src={`./images/sub1/${item.이미지}`} alt="" />
                                            
                //                             <span>
                //                                 <img src="./images/sub1/icon_cart.svg" alt="" />
                //                             </span>
                //                         </div>
                //                         <div className="tit-box">
                //                             <ul>
                //                                 <li>{item.배송구분}</li>
                //                                 <li><strong>[{item.제조사}]</strong> <em>{item.제품명}</em></li>
                //                                 <li>{item.제품특성}</li>
                //                                 <li><span className='rate-price'>{item.할인율===0 ? `` :`${Math.round(item.할인율*100)}%`}</span>{item.할인율 > 0&&(<span className='pan-price'>{commaPrice(item.정가*(1-item.할인율))}</span>)}</li>
                //                                 <li><s>30000원</s></li>
                //                                 <li>{item.판매처}</li>
                //                             </ul>
                //                         </div>
                //                     </a>
                //                 </li>
                //         )
                    
                // })
                }

                {result}







            </ul>
    );
};

