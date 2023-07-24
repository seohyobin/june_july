import React from 'react';
import deleveryinfo from './img/quick/deliveryInfo.webp';
import './go_top/scss/quick_manu.scss'
import $ from 'jquery';
import up from './img/quick/icon_arrow_up.svg';
import down from './img/quick/icon_arrow_down.svg';
import recently from'./img/quick/9af3ae99-2fe6-4610-8be6-e0ce8052dc80.jpg';

export default function QuickMenuComponent(){
    const [state, setState] = React.useState({
        isfixed:false,
        viewProduct:false,
        
    });

    React.useEffect(()=>{
        let quickMenu = $('#quickMenu');
        let sec1Top= $('#section1').offset().top+40;
        let isfixed = false;

        console.log(quickMenu.height());

        $(window).scroll(function(){
            if($(window).scrollTop() >= sec1Top){
                isfixed=true;
                quickMenu.css({marginTop:-quickMenu.height()/2});
            }
            else{
                isfixed=false;
                quickMenu.css({marginTop:0});

            }

            setState({
                ...state,
                isfixed:isfixed
            })
        });


    },[])

//스크롤 이벤트 동작시 스크롤 탑 값이 섹션1의 탑값에 도달하면
//fixed로 구현한다.
    
    return (

        <div id='quickMenu' className={state.isfixed ? ' on' : ''} >
            <ul>
                <li>
                    <a href="!#"><img src={deleveryinfo} alt="" /></a>
                </li>
                <li>
                    <span><a href="!#">등급별혜택</a></span> 
                    <span><a href="!#">레시피</a></span>
                </li>
                <li className='recently-view-product'>

                { state.viewProduct &&
                    (
                        <div>
                            <span><a href="!#"><img src={up} alt="" /></a></span> 
                            <h3>최근 본 상품</h3>
                            <div className="wrap-box">
                                <ul className='recently-view'>
                                    <li><a href="!#"><img src={recently} alt="" /></a></li>
                                    <li><a href="!#"><img src={recently} alt="" /></a></li>
                                    <li><a href="!#"><img src={recently} alt="" /></a></li>
                                    <li><a href="!#"><img src={recently} alt="" /></a></li>
                                    <li><a href="!#"><img src={recently} alt="" /></a></li>
                                    <li><a href="!#"><img src={recently} alt="" /></a></li>
                                </ul>
                            </div>
                            <span><a href="!#"><img src={down} alt="" /></a></span> 
                        </div>
                    )
                }
               
                </li>
            </ul>
        </div>
    );
};

