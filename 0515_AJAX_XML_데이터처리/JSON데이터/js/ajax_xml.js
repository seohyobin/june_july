
;(($)=>{

    $('.member-student-btn-xml').on({
        click(e){
            e.preventDefault();

           $.ajax({
            url:'./data/member.xml',
            type:'GET',
            dataType:'XML',
            success(res){

                let a =[];
                let txt='';
                //console.log( $(res).find('record').text());
                //줄단위 찾아서 검색한 후 해야지 돼!!!!
 
                $(res).find('record').each(function(idx,item){
                    //console.log(idx, $(item).find('field1').text(), $(item).find('field2').text() , $(item).find('field3').text() , $(item).find('field4').text(), $(item).find('field5').text());
                    console.log(idx,item);
                    a[idx]=[];
                    a[idx][0] = $(item).find('field1').text();
                    a[idx][1] = $(item).find('field2').text();
                    a[idx][2] = $(item).find('field3').text();
                    a[idx][3] = $(item).find('field4').text();
                    a[idx][4] = $(item).find('field5').text();
                    
                });
                //console.log(`res ${res}`);
                //출력
                txt +=`<tr>`
                    for(let i =0; i<a.length; i++){

                        for(let j =0; j<a[i].length; j++){
                            txt+=`<td>` + a[i][j] +`</td>`
                        }
                txt +=`</tr>`
                }
       
                $('.tbody-student-xml').html(txt);
            },
            error(err){
                console.log(`err ${err}`);

            }   
           });
        }
    });

})(jQuery);