//제이쿼리 ajax 제이슨 파일 처리
(($)=>{
    $('.cultural-donor-xml').on({
        click(e){
            e.preventDefault();
            $.ajax({
                url:'./data/donor.xml',
                type:'GET', 
                dateType:'XML',
                success(res){
                    let arr=[]; 
                    let txt2='';
                    //console.log(`res ${res}` );
                    $(res).find('DATA_RECORD').each(function(i,item){
                        console.log(i,item);
                        arr[i]=[];
                        arr[i][0]=$(item).find('DONOR_NAME').text();
                        arr[i][1]=$(item).find('TITLE').text();
                        arr[i][2]=$(item).find('AGE_INFO').text();
                        arr[i][3]=$(item).find('LINE_DESC').text();
                        arr[i][4]=$(item).find('REGISTER_DATE').text();
                        arr[i][5]=$(item).find('MODITY_DATE').text();
                        arr[i][6]=$(item).find('MOVIE_CD').text();
                        arr[i][7]=$(item).find('FILE_FMAT').text();
                        arr[i][8]=$(item).find('FILE_SIZE_MB').text();
                        arr[i][9]=$(item).find('KOGLCD').text();
                    });

                    txt2+=`<tr>`
                    for(let i =0; i<arr.length; i++){
                        for(let j=0; j<arr[i].length; j++){
                            txt2+=`<td>`+ arr[i][j]+`</td>`
                        }
                        txt2+=`</tr>`
                    }
                    $('.tbody-cultural-donor-xml').html(txt2);
                },
                error(err){
                    //console.log(`err오류 ${err}` );

                }

            })
        }
    });
})(jQuery);