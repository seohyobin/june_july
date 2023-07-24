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
        const $slideWrap      = $('#section1 .slide-wrap');
        const $slide          = $('#section1 .slide');
        const $slideA         = $('#section1 .slide a');
        const $leftArrowBtn   = $('#section1 .left-arrow-btn'); //4
        const $rightArrowBtn  = $('#section1 .right-arrow-btn');//4
        const $currnetNumber  = $('#section1 .currnet-number');//5
        const $totalNumber    = $('#section1 .total-number');//5

        let cnt = 0;
        let n = $slide.length-2; //슬라이드 수!!! (25-3)

        let setId = 0; 
        

        //alert(n); -> 확인방법
        
        //1.메인슬라이드함수
            function mainSlide(){
                //console.log(cnt);
                $slideWrap.stop().animate({left:`${-100*cnt}%`},600,function(){
                    if(cnt>=n){
                        cnt = 0;
                    }
                    if(cnt<0){
                        cnt = n-1; //현재 23이라서 슬라이드 23개라서 1개 빼야해 -> 0~22 까지 카운트 돼!!!!->슬라이드는 0부터
                    }
                    $slideWrap.stop().animate({left:`${-100*cnt}%`},0); //초기화!!!!! 마지막만 0 으로 바꿔  -100을 써줭!!!!
                });//left 기준으로 100프로
                SlidepageEvent(); //페이지버튼 숫자 들어와!!! 슬라이드 들어갈때

                
            }


        //2-1.다음카운트함수
        function nextCount(){
            cnt++;
            mainSlide();
        }
        //2-2 이전카운트함수
        function prevCount(){
            cnt--;
            mainSlide();
        }

        //3.자동타이머함수
            function autoTimer(){
                clearInterval(setId);//setId가 오기전에 할당된건 다 날리고 새로운거 보내줘
                setId = setInterval(nextCount,3000); //nextCount를 3초에 한번씩 호출해!!!


                //////////////////////////얘는 필요없어 하는법만 알아뒁!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //타이머 setId 변수 모든 값들은 브라우저 저장소에서 관리한다. ->화면이 새로고침 되면 다 사라져
                //스토리지(저장소) 키 KEY = "" ;
                //const key = "SETID_SEC1_SLIDE_KEY";
                //sessionStorage.setItem(key,setId); //키, 보관된 아이디  // 셋아이템이 있어야 돼!!!!
                //////////////////////////얘는 필요없어 하는법만 알아뒁!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                
            }
    
            autoTimer(); //로딩시 실행!!!!

            //4.슬라이드 컨테이너에 마우스 오버시 슬라이드 일시정지
            $slideContainer.on({
                mouseenter(){
                    clearInterval(setId);
                    $leftArrowBtn.stop().fadeIn(500); //천천히 생겨  1초
                    $rightArrowBtn.stop().fadeIn(500); //천천히 생겨 1초
                },
                mouseleave(){
                    $leftArrowBtn.stop().fadeOut(500); //천천히 사라져 1초
                    $rightArrowBtn.stop().fadeOut(500); //천천히 사라져 1초
                    autoTimer(); //이거 불러와야지 슬라이드 시작
                },

            });

            //5.슬라이드 페이지 번호 클래스네임 설정하고 생성자지정 -> 그다음에 함수만들고

            function SlidepageEvent(){
                
                $currnetNumber.html(cnt+1 ===24 ? 1 : (cnt+1 ===0 ? n : cnt+1) );
                $totalNumber.html(n);
            }

            //6-1.다음화살버튼 클릭이벤트

            $rightArrowBtn.on({
                click(e){
                    e.preventDefault();
                    nextCount();
                }
            })
            //6-2.이전화살버튼 클릭이벤트
            $leftArrowBtn.on({
                click(e){
                    e.preventDefault();
                    prevCount();
                }
            })

            $slideA.on({
                click(e){
                    e.preventDefault();
                }
            })


    },[]);
    return (
        <main id='main' className='sub-page intro'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title hide"><h2>마켓컬리 메인 슬라이드</h2></div>
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
                                                            <li>{"마켓컬리"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide13">
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
                                                            <li><strong>[이상복명과]</strong> <em>{"계피빵 10개입"}</em></li>
                                                            <li></li>
                                                            <li><span className='rate-price'>{1===0 ? `` :`${Math.round(0.1*100)}%`}</span>{0.1 > 0 &&(<span className='pan-price'>{commaPrice(13000*(1-0.1))}</span>)}</li>
                                                            <li>{0.1===0? <span className='pan-price'>{commaPrice(13000)}</span> : <s>{commaPrice(13000)}</s> }</li>
                                                            <li>{"마켓컬리"}</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide14">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide15">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide16">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide17">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide18">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide19">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide0">
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
                                        <li className="slide slide1">
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
                                        <li className="slide slide5">
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
                                        <li className="slide slide6">
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
                                        <li className="slide slide7">
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
                                        <li className="slide slide8">
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
                                        <li className="slide slide9">
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
                                        <li className="slide slide10">
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
                                        <li className="slide slide11">
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
                                        <li className="slide slide12">
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
                                        <li className="slide slide13">
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
                                        <li className="slide slide14">
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
                                        <li className="slide slide15">
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
                                        <li className="slide slide16">
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
                                        <li className="slide slide17">
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
                                        <li className="slide slide18">
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
                                        <li className="slide slide19">
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
                                        <li className="slide slide0">
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
                                        <li className="slide slide1">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide2">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide3">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide4">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide5">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide6">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide7">
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
                                                            <li><strong>[곰표x삼삼해물]</strong> <em>쉐이크 잍! 해물 부침개</em></li>
                                                            <li>13,500원</li>
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
                        <div className="title"></div>
                        <div className="content"></div>
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



