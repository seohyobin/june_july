//제이쿼리 ajax 제이슨 파일 처리
(($)=>{
    $('.patient-json').on({
        click(e){
            e.preventDefault();
            $.ajax({
                url:'./data/기관별환자.json',
                type:'GET', 
                dateType:'JSON',
                success(res){
              
                    let arr=[];
                    let txt='';
                    //console.log(`res ${res}` );
                    res.환자.map(function(item,i){
                        arr[i]=[];
                        arr[i][0]= item.기관코드;
                        arr[i][1]= item.기관명;
                        arr[i][2]= item.환자명;
                        arr[i][3]= item.성별;
                        arr[i][4]= item.나이;
                        arr[i][5]= item.입원기간;
                        arr[i][6]= item.기관위치;
                    })

                    txt+=`<tr>`
                    for(let i =0; i<arr.length; i++){
                        for(let j=0; j<arr[i].length; j++){
                            txt+=`<td>`+ arr[i][j]+`</td>`
                        }
                    txt+=`</tr>`
                    }
                    $('.tbody-patient-json').html(txt);
                },
                error(err){
                    console.log(`err ${err}` );

                }

            })
        }
    });
})(jQuery);