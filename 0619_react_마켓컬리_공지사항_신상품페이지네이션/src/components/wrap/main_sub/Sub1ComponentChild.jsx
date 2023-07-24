import React from 'react';

export default function Sub1ComponentChild({신상품,setViewProduct}){
/////////////////////////////페이지 네이션

const [list , setList]=React.useState(6);
const [pageNumber,setPageNumber]=React.useState(1);
const [groupPage,setGroupPage]=React.useState(3);
const [cnt, setCnt]=React.useState(1);

const [startNum,setStartNum]=React.useState((cnt-1)*groupPage);
const [endNum,setEndNum]=React.useState(startNum+groupPage);

const onClickGroupPrev=(e)=>{
    e.preventDefault();
    setCnt(cnt-1);
}

const onClickGroupNext=(e)=>{
    e.preventDefault();
    setCnt(cnt+1)

}
const onClickPageNum=(e,n)=>{
    e.preventDefault();
    setPageNumber(n);
}
React.useEffect(()=>{
    setStartNum((cnt-1)*groupPage);
},[cnt,groupPage]);


React.useEffect(()=>{
    setEndNum(startNum+groupPage); //on이벤트
    setPageNumber(startNum+1);
},[startNum,groupPage]);



// 정가, 판매가 금액에 콤머 형식 정규표현식 구현하기
 const commaPrice=(price)=>{
    let value = price.toString();
    //     300  
    // 383,000  
    const regExp = /(^\d+)(\d{3})/g;  // (그룹1)(그룹2)
    // console.log('정가 가져오기 = ' , price );
    // console.log('정가.toString  = ' , value );
    // 가져온 데이터값은 숫자이다 그래서 파란색으로 콘솔로그에 표시
    // 정규표현식 반드시 문자열만 처리가능하다.
    // 문자열형식으로 변환 시키기

    // 반복문 처리 모두처리
    // 리턴문으로 결과값 돌려준다.
    while( regExp.test(value) ){
        return  value.replace(regExp, '$1,$2');
    }
    
}
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
        이미지:`http://localhost:3000/images/sub1/${item.이미지} `,
        저장일시:new Date().getTime(),
        
    }
    setViewProduct(object);
    window.location.pathname='/product';
}
const result = 신상품.map((item,idx)=>{

        if(Math.ceil((idx+1)/list) === pageNumber){

            return(
                <li key={idx}>
                    <a href="!#" onClick={(e)=>onClickProductList(e,item)} >                            
                        <div className="img-box">
                            <img src={`./images/sub1/${item.이미지}`} alt="" />
                            
                            <span>
                                <img src="./images/sub1/icon_cart.svg" alt="" />
                            </span>
                        </div>
                        <div className="tit-box">
                            <ul>
                                <li>{item.배송구분}</li>
                                <li><strong>[{item.제조사}]</strong> <em>{item.제품명}</em></li>
                                <li>{item.제품특성}</li>
                                <li><span className='rate-price'>{item.할인율===0 ? `` :`${Math.round(item.할인율*100)}%`}</span>{item.할인율 > 0 &&(<span className='pan-price'>{commaPrice(item.정가*(1-item.할인율))}</span>)}</li>
                                <li>{item.할인율===0? <span className='pan-price'>{commaPrice(item.정가)}</span> : <s>{commaPrice(item.정가)}</s> }</li>
                                <li>{item.판매처}</li>
                            </ul>
                        </div>
                    </a>
                </li>
        )
        }


        
    })

    return (
        <>
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
            <div className="page-btn-box">

                {cnt>1 && <a href="!#" onClick={onClickGroupPrev} className='prev-btn'>&lt;</a>}   
                {      
                    (()=>{

                        let arr=[]

                        for(let i=startNum; i<endNum; i++){
                            if(i<Math.round(신상품.length/list)){
                                arr= [...arr,<a href="!#" className={pageNumber === (i+1) ? 'on' :''} onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a>]
                            }
                        }
                        return arr;
                    })()
                    
                }
                {cnt < 신상품.length/list/groupPage && <a href="!#" onClick={onClickGroupNext} className='next-btn'>&gt;</a>}            </div>
        </>
       
    );
};

