import React from 'react';
import './go_top/css/goTop.css';
import $ from 'jquery';

export default function GoTopComponent(){

    
    React.useEffect(()=>{
        let sec1Top = $('#section1').offset().top;
        let gotopBtn = $('.gotop-btn');
        let goTop = $('#goTop');

        //스크롤이벤트  
       $(window).scroll(function(){
            if($(window).scrollTop()>=sec1Top){
                // goTop.stop().animate({bottom:50},300);
                goTop.stop().css({bottom:'50px'},600);

            }    
            else{
                //goTop.stop().animate({bottom:-50},300);
                goTop.stop().css({bottom:'-50px'},600);  

            }
        });

        //스무스 스크롤링
        gotopBtn.on({
            click(e){
                e.preventDefault();
                $('html, body ').stop().animate({scrollTop:0},600);
            }
        });

    })
    return (
        <div id='goTop'>
            <a href="#wrap" className='gotop-btn'>
                <img src="./images/gotop/다운로드.png"alt="" />
            </a>
        </div>
    );
};



