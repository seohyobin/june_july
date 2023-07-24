import React from 'react';
import jQuery from 'jquery';
import './scss/section1_slide.scss'


export default function Section1SlideComponent({slide,n}){

    const slideWrap=React.useRef(); //돔 요소 선택자 useRef -> current 

    const [cnt, setCnt]=React.useState(0);

    React.useEffect(()=>{
        slideWrap.current.style.width = `${100*(n+2)}%`; // 100 * 23 
     
    },[slide,n]);

    React.useEffect(()=>{
            slideWrap.current.style= `left:${-(100*cnt)}%`;
            slideWrap.current.style.transition= `all 0.6s ease-in-out`;
            //처음으로 리턴 : 계속 롤링하기 위해서 반드시 리턴
            if(cnt > n ){
                slideWrap.current.style.transition= `none`; 
                slideWrap.current.style.left= `0`; 
                setCnt(1);// 일 이 아니면 두번눌러야혀
            }
            //마지막으로 리턴 뒤로 -> 계속 롤링하기 위해서
            if(cnt < 0 ){
                slideWrap.current.style.transition= `none`; // 애니메이션 없어야지 움직임이 없어
                slideWrap.current.style.left= `${-100*n}%`; 
                setCnt(n-1);// 일 이 아니면 두번눌러야혀
            }
            

    },[cnt]);    

    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt+1)

    }
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt-1)
    }
    //슬라이드 클릭시 새로고침 발생 방지
    const onClickA =(e,idx,src)=>{
        e.preventDefault();

        ////이렇게 걸어줭!!!!!
        // console.log( idx,src);
        // if(idx===2){
        //     window.location.pathname='/베스트'
        // }
        // else if(idx===1){
        //     window.location.pathname='/신상품'

        // }
        // else if(idx===3){
        //     window.location.pathname='/알뜰상품'

        // }
        // else if(idx===4){
        //     window.location.pathname='/특가혜택'

        // }
    }
      
    return (
        <div className="slide_container">
            <div className="slide-view">
                <ul ref={slideWrap} className="slide-wrap">


                    {
                        slide.map((item,idx)=>{ 
                            return(
                                <li className="slide" key={item.idx}><a href="!#" onClick={(e)=>onClickA(e,idx,item.src)}><img src={item.src} alt="" /></a></li>
                                )
                        })

                    }
                  


                </ul>
            </div> 
            <a href="!#" onClick={onClickPrev} className=' left-arrow-btn'><img src="./images/intro/arrow_left.svg" alt="" /></a>
            <a href="!#" onClick={onClickNext} className='right-arrow-btn'><img src="./images/intro/arr_right.svg" alt="" /></a>
            <span className='page-count-box'>
                <em className='currnet-number'>{cnt+1 > n ? 1 : cnt+1}</em>
                <i>/</i>    
                <em className='total-number'>{n}</em>
            </span>
        </div>
    );
};

