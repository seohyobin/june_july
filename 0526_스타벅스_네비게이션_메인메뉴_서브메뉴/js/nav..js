(($)=>{
    class nav{
        init(){
            this.header();
        }
        header(){
           const mainBtn=$('#header .main-btn');
           const sub =$('#header .sub');

           mainBtn.on({
            mouseenter(){
                sub.stop().slideUp(0);
                $(this).next().stop().slideDown(300);
            }
           })
     
        }
    }
    const newNav= new nav();
    newNav.init();
})(jQuery)