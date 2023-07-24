//제이쿼리 ajax 제이슨 파일 처리
(($)=>{
    $('.trash-txt').on({
        click(e){
            e.preventDefault();
            $.ajax({
                url:'../data/서울특별시 _동대문구_쓰레기종량제봉투_판매소_20230228.txt',
                type:'GET', 
                dateType:'TEXT',
                success(res){
                    const result=res.split('\r\n');
                    let arr=[];
                    let txt='';
                    //console.log(`res ${res}` );
                    $.each(result, function(i,item){
                        arr[i]=[];
                        arr[i][0]=Number(item.split('')[0]);
                        arr[i][1]=String(item.split(' ')[1]);
                        arr[i][2]=String(item.split(' ')[2]);
                        arr[i][3]=String(item.split(' ')[3]);
                        arr[i][4]=String(item.split(' ')[4]);
                        arr[i][5]=String(item.split(' ')[5]);
                    })

                    txt+=`<tr>`
                    for(let i =0; i<arr.length; i++){
                        for(let j=0; j<arr[i].length; j++){
                            txt+=`<td>`+ arr[i][j]+`</td>`
                        }
                    txt+=`</tr>`
                    }
                    $('.tbody-trash-txt').html(txt);
                },
                error(err){
                    //console.log(`err ${err}` );

                }

            })
        }
    });
})(jQuery);