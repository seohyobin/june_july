(function($){

    const ajax = {
        init(){
            this.ajaxFn();
        },
        ajaxFn(){
            //버튼클릭이벤트
             $('.save').on({
             click(e){
             e.preventDefault();
                 //폼데이터
                 const formData= {
                     subject:$('#subject').val() ,
                     content:$('#content').val()
                 }
                //ajax 구현
                $.ajax({
                    url:'/dataSend', //@RequestMapping(value = "formData" , method= RequestMethod.POST)
                    type:'POST', //spring =>requestMethod.POST
                    data:formData, //입력상자 입력값
                    success(res){
                        console.log('ajax 성공' ,res);
                    },
                    error(err){
                        console.log('ajax 실패' ,err);
                    }
                });
             }
             })
        }
    }
    ajax.init();
})(jQuery);



