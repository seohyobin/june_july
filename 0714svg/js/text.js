;(($)=>{
     //svg 애니메이션 구현
     //1.svg 내에 원형그래프를 가져온다
    const circle = $('.circle');
    const svgBox=$('.svgBox');
    //반응형 글자크기(0.14) = 숫자 글자크기 / svgBox 너비 
    //반응형 글자크기 적용 = 너비 * 0.14
    $('.number').css({fontSize:svgBox.innerWidth()*0.14 + 'px'})
    //원형 svg 길이 구하기 원둘레= 반지름*3.14
   
    
    //$('.circle')
    //단위길이 계산
    //100% => tot 길이 98% 길이 계산
    //98%  => tot*0.98 퍼센트 길이

    let tot = 0;
    let setId = 0;
    let cnt = 0; //증가값 
    let step = 10;
    let percent =0.98;
    let percentLenth = tot*percent;

    

    $.each(circle,function(idx,obj){
        tot = obj.getTotalLength()+7;
        obj.style.strokeDasharray = tot;
        obj.style.strokeDashoffset = tot; //간격이 벌어진 상태의 값 ->원둘레가 없다. 0이 될때까지 반복문
        
        
        setId = setInterval(function(){
            cnt+=step;
            if(cnt > percentLenth){
                clearInterval(setId);
            }
            else{//애니메이션 
                $(obj).css({strokeDashoffset:tot-cnt},300,function(){
                    $(obj).animate({strokeDashoffset:tot-cnt},600);
                },10);
                number.html(`${Math.ceil(cnt/tot*100)}%`)

            }

        },10);
        
    });
})(jQuery);