import React from 'react';
import $ from 'jquery';
import './scss/section1.scss';
import Section1SlideComponent from './Section1SlideComponent';
import axios from 'axios';

export default function Section1Component(){
    const [state, setState] = React.useState({
        slide: [],
        n: null
    });



    //슬라이드 데이터 가져오기!!!
    React.useEffect(()=>{
            //axios api 사용!!!
            axios({
                url:'./data/intro_page/section1.json',
                method:'GET'

            })
            .then((res)=>{

                console.log(res.data);

                if(res.status===200){
                    setState({
                        ...state,
                        slide:res.data.slide,
                        n : (res.data.slide.length)-2
                    })
                }
            })
            .catch((err)=>{
                console.log(`axios 실패 err!!!!! ${err}`);

            })
    },[]);//로딩시 화면이 그려진(마운트)  후 1회 실행!!!!
    
    //section1  메인 슬라이드
    React.useEffect(()=>{

            const $slideContainer = $('#section1 .slide_container');
            const $slideWrap = $('#section1 .slide-wrap');
            const $slide = $('#section1 .slide');
            const $slideA = $('#section1 .slide a');
            const $leftArrowBtn = $('#section1 .left-arrow-btn');
            const $rightArroBtn = $('#section1 .right-arrow-btn');
            const $currnetNumber=$('#section1 .currnet-number');
            const $totalNumber=$('#section1 .total-number');
        
            let cnt = 0;
            let setId = 0;
            //상태관리 n 이 변경되면 다음 useEffect 사용해!!!
            $slideWrap.css({width:`${100 * (state.n+2)}%`})

            //1.메인
            function mainSlide(){
                $slideWrap.stop().animate({left :`${-100*cnt}%`},600,function(){
                    if(cnt >= state.n){
                        cnt = 0;
                    }
                    if(cnt < 0 ){
                        cnt = state.n-1; // 0~22까지 하나 빼!!!
                    }
                    $slideWrap.stop().animate({left :`${-100*cnt}%`},0)
    
                })
                SlidepageEvent();
            }
            //2.다음
             function nextCount(){
                cnt++;
                mainSlide();
             }
            //3.이전
            function prevCount(){
                cnt--;
                mainSlide();
            }
            //4.자동타이머
    
            function autoTimer(){
                clearInterval(setId);
                setId=setInterval(nextCount,3000);
            }
            autoTimer();
    
    
    
            //5.마우스엔터 마우스리브
            $slideContainer.on({
                mouseenter(){
                    clearInterval(setId);
                    $leftArrowBtn.stop().fadeIn(500);
                    $rightArroBtn.stop().fadeIn(500);
                },
                mouseleave(){
                    $leftArrowBtn.stop().fadeOut(500);
                    $rightArroBtn.stop().fadeOut(500);
                    autoTimer();
                },
            });

            
            //6.left 버튼
            $leftArrowBtn.on({
                click(e){
                    e.preventDefault();
                    prevCount();
                }
            })
     
            //7.right 버튼
            $rightArroBtn.on({
                click(e){
                    e.preventDefault();
                    nextCount();
                }
            })
    
            //a링크
    
            $slideA.on({
                click(e){
                    e.preventDefault();
                }
            })
    
            //8.페이지네이션번호
            function SlidepageEvent(){
                $currnetNumber.html(cnt+1>=24 ? 1 : (cnt+1===0 ? state.n : cnt+1 ));
                $totalNumber.html(state.n);
            }
    },[state.n]);

    return (
        <section id="section1">
            <div className="container">
                <div className="gap">
                    <div className="title hide">
                        <h2>마켓컬리 메인 슬라이드</h2>
                    </div>
                    <div className="content">

                        <Section1SlideComponent slide = {state.slide}  n={state.n}/>

                    </div>  
                </div>
            </div>
        </section>
    );
};
