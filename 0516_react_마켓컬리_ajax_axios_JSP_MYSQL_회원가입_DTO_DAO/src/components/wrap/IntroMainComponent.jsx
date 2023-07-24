import React from 'react';
import $ from 'jquery';

export default function IntroMainComponent(){  



    //판매가격 정가 콤마형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        } 
    }
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
        let n = $slide.length-2;
        let setId = 0;
        //1.메인
        function mainSlide(){
            $slideWrap.stop().animate({left :`${-100*cnt}%`},600,function(){
                if(cnt >= n){
                    cnt = 0;
                }
                if(cnt < 0 ){
                    cnt = n-1; // 0~22까지 하나 빼!!!
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
            $currnetNumber.html(cnt+1);
            $totalNumber.html(n);
        }
    },[]);

    //section2 슬라이드

    React.useEffect(()=>{
        const $slideContainer = $('#section2 .slide-container');
        const $slideWrap = $('#section2 .slide-wrap');
        const $slide = $('#section2 .slide-wrap .slide');
        const $leftArrorwBtn = $('#section2 .left-arrorw-btn');
        const $rightArrorwBtn = $('#section2 .right-arrorw-btn');

        let cnt =0;
        let n = ($slide.length-16)/4;  //(36-16)/4 => 5묶음 


        //1.메인슬라이드

        function mainSlide(){
            $slideWrap.stop().animate({left:`${-100*cnt}%`},600,function(){
                    if(cnt >=5){
                        cnt=0;
                    }
                    if(cnt < 0){
                        cnt = n-1;
                    }

                $slideWrap.stop().animate({left:`${-100*cnt}%`},0)
            });
        }
        //2-1.다음카운트
        function nextCount(){
            cnt++;
            mainSlide();
        }
        //2-2.이전카운트
        function prevCount(){
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

    },[]);

    //section3 24시간 일일특가 타이머
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
            $('.hours').text  (eH < 10 ? `0${eH}` : eH);
            $('.minutes').text(eM < 10 ? `0${eM}` : eM);
            $('.seconds').text(eS < 10 ? `0${eS}` : eS);
        }
        else{
            //보통상태 - > 바인딩 계속
            $('.hours').text  (eH < 10 ? `0${eH}` : eH);
            $('.minutes').text(eM < 10 ? `0${eM}` : eM);
            $('.seconds').text(eS < 10 ? `0${eS}` : eS);
        }


        }

        setId = setInterval(saleTimer,1000);        //1초에 한번씩 saleTimer(); 함수 불러와 



    },[]);


  

    return (
        <main id='main' className='sub-page intro'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>마켓컬리 메인 슬라이드</h2>
                        </div>
                        <div className="content">
                            <div className="slide_container">
                                <div className="slide-view">
                                    <ul className="slide-wrap">
                                        {/* li.slide$@0*23>a[href=!#]>img[src=./images/intro/intro_main_slide$$@1.jpg] */}
                                        <li className="slide slide22"><a href="!#"><img src="./images/intro/intro_main_slide23.jpg" alt="" /></a></li>
                                        <li className="slide slide0"> <a href="!#"><img src="./images/intro/intro_main_slide05.jpg" alt="" /></a></li>
                                        <li className="slide slide1" ><a href="!#"><img src="./images/intro/intro_main_slide01.jpg" alt="" /></a></li>
                                        <li className="slide slide2" ><a href="!#"><img src="./images/intro/intro_main_slide02.jpg" alt="" /></a></li>
                                        <li className="slide slide3" ><a href="!#"><img src="./images/intro/intro_main_slide04.jpg" alt="" /></a></li>
                                        <li className="slide slide4" ><a href="!#"><img src="./images/intro/intro_main_slide03.jpg" alt="" /></a></li>
                                        <li className="slide slide5" ><a href="!#"><img src="./images/intro/b07fb444-30a1-422a-a97b-b27d435c484a.jpg" alt="" /></a></li>
                                        <li className="slide slide6" ><a href="!#"><img src="./images/intro/intro_main_slide07.jpg" alt="" /></a></li>
                                        <li className="slide slide7" ><a href="!#"><img src="./images/intro/intro_main_slide08.jpg" alt="" /></a></li>
                                        <li className="slide slide8" ><a href="!#"><img src="./images/intro/intro_main_slide09.jpg" alt="" /></a></li>
                                        <li className="slide slide9" ><a href="!#"><img src="./images/intro/intro_main_slide10.jpg" alt="" /></a></li>
                                        <li className="slide slide10"><a href="!#"><img src="./images/intro/intro_main_slide11.jpg" alt="" /></a></li>
                                        <li className="slide slide11"><a href="!#"><img src="./images/intro/intro_main_slide12.jpg" alt="" /></a></li>
                                        <li className="slide slide12"><a href="!#"><img src="./images/intro/intro_main_slide13.jpg" alt="" /></a></li>
                                        <li className="slide slide13"><a href="!#"><img src="./images/intro/intro_main_slide14.jpg" alt="" /></a></li>
                                        <li className="slide slide14"><a href="!#"><img src="./images/intro/intro_main_slide15.jpg" alt="" /></a></li>
                                        <li className="slide slide15"><a href="!#"><img src="./images/intro/intro_main_slide16.jpg" alt="" /></a></li>
                                        <li className="slide slide16"><a href="!#"><img src="./images/intro/intro_main_slide17.jpg" alt="" /></a></li>
                                        <li className="slide slide17"><a href="!#"><img src="./images/intro/intro_main_slide18.jpg" alt="" /></a></li>
                                        <li className="slide slide18"><a href="!#"><img src="./images/intro/intro_main_slide19.jpg" alt="" /></a></li>
                                        <li className="slide slide19"><a href="!#"><img src="./images/intro/intro_main_slide20.jpg" alt="" /></a></li>
                                        <li className="slide slide20"><a href="!#"><img src="./images/intro/intro_main_slide21.jpg" alt="" /></a></li>
                                        <li className="slide slide21"><a href="!#"><img src="./images/intro/intro_main_slide22.jpg" alt="" /></a></li>
                                        <li className="slide slide22"><a href="!#"><img src="./images/intro/intro_main_slide23.jpg" alt="" /></a></li>
                                        <li className="slide slide0"  ><a href="!#"><img src="./images/intro/intro_main_slide01.jpg" alt="" /></a></li>
                                    </ul>
                                </div> 
                                <a href="!#" className='left-arrow-btn'><img src="./images/intro/arrow_left.svg" alt="" /></a>
                                <a href="!#" className='right-arrow-btn'><img src="./images/intro/arr_right.svg" alt="" /></a>
                                <span className='page-count-box'>
                                    <em className='currnet-number'>1</em>
                                    <i>/</i>
                                    <em className='total-number'>23</em>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id='sectionTopBanner'>
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>sectionTopBanner</h2>
                        </div>
                        <div className="content">
                            <a href="!#"><img src="./images/intro/intro_banner.jpg" alt="" /></a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>이 상품 어때요?</h2>
                        </div>
                        <div className="content">
                            <div className="slide-container">
                                <div className="slide-view">
                                    <ul className="slide-wrap">
                                        <li className="slide slide12">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img13.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide13">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img14.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide14">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img15.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide15">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img16.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide16">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img17.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide17">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img18.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide18">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img19.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide19">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img20.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>    
                                        <li className="slide slide0">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img01.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                            <ul>
                                                                <li>샛별배송</li>
                                                                <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                                <li></li>
                                                                <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                                <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                                <li>{"후기"}</li>
                                                            </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide1">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img02.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                            <ul>
                                                                <li>샛별배송</li>
                                                                <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                                <li></li>
                                                                <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                                <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                                <li>{"후기"}</li>
                                                            </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide2">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img03.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide3">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img04.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide4">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img05.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide5">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img06.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide6">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img07.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide7">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img08.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide8">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img09.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide9">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img10.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                         <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide10">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img11.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide11">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img12.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide12">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img13.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide13">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img14.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide14">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img15.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide15">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img16.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide16">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img17.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide17">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img18.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide18">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img19.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide19">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img20.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide0">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img01.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                            <ul>
                                                                <li>샛별배송</li>
                                                                <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                                <li></li>
                                                                <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                                <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                                <li>{"후기"}</li>
                                                            </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide1">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img02.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                            <ul>
                                                                <li>샛별배송</li>
                                                                <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                                <li></li>
                                                                <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                                <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                                <li>{"후기"}</li>
                                                            </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide2">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img03.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide3">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img04.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide4">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img05.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide5">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img06.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide6">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img07.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide7">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img08.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="!#" className='left-arrorw-btn'><img src="./images/intro/icon_arr_left_black.svg" alt="" /></a>
                <a href="!#" className='right-arrorw-btn'><img src="./images/intro/icon_arr_left_black.svg" alt="" /></a>
            </section>
            <section id="section3">
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
                                        <span className='hours'>{}</span>
                                        <span> : </span>
                                        <span className='minutes'>{}</span>
                                        <span> : </span>
                                        <span className='seconds'>{}</span>
                                    </li>
                                    <li>
                                        <p>망설이면 늦어요!</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="right">
                                <ul>
                                    <li className="slide slide0">
                                        <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                    <img src="./images/intro/img01.jpg" alt="" />
                                                    <span>
                                                        <img src="./images/sub1/icon_cart.svg" alt="" />
                                                    </span>
                                                </div>
                                                <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                        <li className="slide slide1">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img02.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                            <ul>
                                                                <li>샛별배송</li>
                                                                <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                                <li></li>
                                                                <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                                <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                                <li>{"후기"}</li>
                                                            </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide2">
                                            <div className="col-gal">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src="./images/intro/img03.jpg" alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>샛별배송</li>
                                                            <li><strong>[이상복명과]</strong> <em>"계피빵 10개입"</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{0.1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"후기"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section4">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section5">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section6">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section7">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section8">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section9">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section10">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
        </main>
    );
};



