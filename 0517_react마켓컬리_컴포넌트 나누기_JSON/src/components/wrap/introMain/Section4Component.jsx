import React from 'react';
import $ from 'jquery';
import './scss/section4.scss';
import Section4SlideComponent from './Section4SlideComponent';
import axios from 'axios';


    //판매가격 정가 콤마형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        } 
    }

export default function Section4Component(){
    const [state,setState]=React.useState({
        일일특가:[]


    });

    const [timer,setTimer]=React.useState({
        hours:0,
        minutes:0,
        seconds:0
    });

    React.useEffect(()=>{
        axios({
            url:'./data/section4.json',
            method:'GET'
        })
        .then((res)=>{
            console.log(res.data);
            if(res.status===200){
                setState({
                    ...state,
                    일일특가:res.data.일일특가

                })
            }
        })
        .catch((err)=>{
            console.log(`axios 오류 err ${err}`);
        })
    },[])



        //section4 24시간 일일특가 타이머
        React.useEffect(()=>{
            let setId = 0;

        
    
            function saleTimer(){
            let start = new Date('2023-04-27 17:51:00');    //1.타임세일 시작 시점
                                                            //'날짜세팅 -> 팀장이 설정한 시작날' 설정하면 알아서 시작 알아서 지정하면 시간이 맞춰져서 돼!!!
    
            let now= new Date();                            //2.타임세일 후 현재시간 now 
                                                            // 타이머가 현재시간 계속 읽어들여  => now 에 들어감
    
            start.setHours(start.getHours() + 24);          //3.시간  + 24  = >1일특가!!! //// 1시간 세일 = > 시간 + 1   시간 세팅=>  setter 함수
                                                            //start.setHours(현재시간 + 24);//특가시간 측정 1일 추가 setDate setHours setMinues
    
            let end = start-now;                            //4.남은시간(세일 종료시간) = 타임세일시직(24시간 이미 더해져있어) - 현재시간
                                                            //시작시간 - 현재시간  
                                                        
    
    
            //5.카운트 박스 시 분 초 표기 1초간격으로
    
            //6.남은시간 === 0 이면 타임종료!!! =>이거는 마운트시간이 늦어서 안돼!!!! 
            //==============이걸로 바꿔!!!!!======================================
            //현재시간>=셋팅시간 (현재시간이 지정 셋팅한 시간보다 크거나 같으면 종료  )
            //모두 초기화 일 시 분 초
    
             
            //////////타이머 확인//////////////////////////////////////////////
            //console.log('세일종료 카운트 남은시간');
            //console.log(`setId : ${setId}`);
            //console.log(Math.floor(end/(60*60*24*1000))); // 날짜 일
            //console.log(Math.floor(end/(60*60*1000)%24)); // 시간 24시간
            //console.log(Math.floor(end/(60*1000)%60)); // 시간 분
            //console.log(Math.floor(end/1000%60)); // 시간 초
            ///////////////////////////////////////////////////////////////////
    
            let eD = Math.floor(end/(60*60*24*1000)); // 날짜 일
            let eH = Math.floor(end/(60*60*1000)%24); // 시간 24시간
            let eM = Math.floor(end/(60*1000)%60);    // 시간 분
            let eS = Math.floor(end/1000%60);         // 시간 초
    
            //현재시간 >= 타임세일시간보다  => 끝나!!!!
            if(now >= start){
    
                clearInterval(setId);
                eD=0;
                eH=0;
                eM=0;
                eS=0;
                // $('.hours').text  (eH < 10 ? `0${eH}` : eH);
                // $('.minutes').text(eM < 10 ? `0${eM}` : eM);
                // $('.seconds').text(eS < 10 ? `0${eS}` : eS);
                setState({
                    ...state,
                    hours: eH < 10  ? `0${eH}` : eH,
                    minutes: eM < 10 ? `0${eM}` : eM,
                    seconds: eS < 10 ? `0${eS}` : eS
                })
            }   
            else{
                //보통상태 - > 바인딩 계속
                // $('.hours').text  (eH < 10 ? `0${eH}` : eH);
                // $('.minutes').text(eM < 10 ? `0${eM}` : eM);
                // $('.seconds').text(eS < 10 ? `0${eS}` : eS);
                setTimer({
                    ...timer,
                    hours:eH < 10 ? `0${eH}` : eH,
                    minutes:eM < 10 ? `0${eM}` : eM,
                    seconds:eS < 10 ? `0${eS}` : eS
                })
            }
    
    
            }
    
            setId = setInterval(saleTimer,1000);        //1초에 한번씩 saleTimer(); 함수 불러와 
    
    
    
        },[]);
    
    return (
        <section id="section4">
        <div className="container">
            <div className="gap">
                <div className="content">
                    <div className="left">
                        <ul>
                            <li>
                                <h2>일일특가</h2>
                            </li>
                            <li>
                                <h3>24시간 한정 특가</h3>
                            </li>
                            <li>
                                <span><img src="./images/intro/icon_timer.svg" alt="" /></span>
                                <span className='hours'>{timer.hours}</span>
                                <span> : </span>
                                <span className='minutes'>{timer.minutes}</span>
                                <span> : </span>
                                <span className='seconds'>{timer.seconds}</span>
                            </li>
                            <li>
                                <p>망설이면 늦어요!</p>
                            </li>
                        </ul>
                    </div>
                        <Section4SlideComponent 일일특가={state.일일특가}/>
                </div>
            </div>
        </div>
    </section>
    );
};

