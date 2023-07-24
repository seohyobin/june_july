import React from 'react';
import $ from 'jquery';
import './scss/section7.scss';
import Section7SlideComponent from './Section7SlideComponent';
import axios from 'axios';



    //판매가격 정가 콤마형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        } 
    }

export default function Section7Component(){

    //1.상태관리 변수 지정
    const [state,setState] = React.useState({
        상품:[],
        n:0
    });

    //2.AXIOS 외부 데이터 상품 가져오기 상태관리 배열 변수, 상품수n에 에 데이터 저장하기 
    React.useEffect(()=>{
        axios({
            url:'./data/intro_page/section7.json',
            method:'GET'
        })
        .then((res)=>{
            console.log(res.data);
            if(res.status===200){
                setState({
                    ...state,
                    상품:res.data.상품,
                    n:res.data.상품.length
                })
            }

        })
        .catch((err)=>{
            console.log(`axios 오류 err ${err}`);

        })

    },[])
    //3.React.useEffect() 상품수 등록(n)되면 즉시 슬라이드 전체 너비 설정하기 ==>밑에
    //4.상태변수 데이터를 자식 컴포넌트에 내려준다.
    //5.자식컴포넌트는 비구조화로 받아서 탬플릿 요소에 반복처리 바인딩한다.
    
    
    
    //section7 슬라이드

        React.useEffect(()=>{
            const $slideContainer = $('#section7 .slide-container');
            const $slideWrap = $('#section7 .slide-wrap');
            const $slide = $('#section7 .slide-wrap .slide');
            const $leftArrorwBtn = $('#section7 .left-arrorw-btn');
            const $rightArrorwBtn = $('#section7 .right-arrorw-btn');
    
            let cnt =0;
            let n = (state.n)/4;  //(36-16)/4 => 5묶음 


            //3.React.useEffect() 상품수 등록(n)되면 즉시 슬라이드 전체 너비 설정하기
            $slideWrap.css({ width:`${ 25 * state.n}%`})
    
            //1.메인슬라이드
            mainSlide();
            function mainSlide(){
                $slideWrap.stop().animate({left:`${-100*cnt}%`},600,function(){
                    if(cnt >=4){
                        $('.right-arrorw-btn').stop().fadeOut(400);
                    }
                    else{
                        $('.right-arrorw-btn').stop().fadeIn(400);
                    }   
                    if(cnt <=0){
                        $('.left-arrorw-btn').stop().fadeOut(400);
                    }
                    else{
                        $('.left-arrorw-btn').stop().fadeIn(400);
                    }

                    $slideWrap.stop().animate({left:`${-100*cnt}%`},0)
                });
            }
            //2-1.다음카운트
            function nextCount(){
                cnt++;
                if(cnt >=4){
                   cnt=4;
                }
                //console.log(cnt);
                mainSlide();
            }
            //2-2.이전카운트
            function prevCount(){
                if(cnt <= 0){    
                    cnt = 1;    
                }
                cnt--;
                mainSlide();
            }
            //3-1.이전화살표 클릭이벤트
            $leftArrorwBtn.on({
                click(e){
                    e.preventDefault();
                    prevCount();
                }
            })
            //3-2.다음화살표
            $rightArrorwBtn.on({
                click(e){
                    e.preventDefault();
                    nextCount();
                }
            })
    
        },[state.n]);
    return (
        <section id="section7">
        <div className="container">
            <div className="gap">
                <div className="title">
                    <h2>이 상품 어때요?</h2>
                </div>
                <div className="content">
                    <section7SlideComponent 상품={state.상품} n={state.n}/>
                </div>
            </div>
        </div>
        <a href="!#" className='left-arrorw-btn'><img src="./images/intro/icon_arr_left_black.svg" alt="" /></a>
        <a href="!#" className='right-arrorw-btn'><img src="./images/intro/icon_arr_left_black.svg" alt="" /></a>
    </section>
    );
};

