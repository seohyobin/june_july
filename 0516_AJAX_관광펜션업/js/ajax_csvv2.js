(($)=>{
    



    $('.cultural-assets-csv2').on({
        click(e){
            e.preventDefault();

            $.ajax({
                url:'./data/관광.csv',
                type:'GET',
                dataType:'TEXT',
                success(res){
                    const result= res.split('\r\n');
                    let arr =[];

                    $.each(result,function(i,item){
                        arr[i]=[];
                        arr[i][0]=String(item.split(',')[8]);


                    });
                    
                    
                    let cnt=0;
                    let cnt1=0;
                    let cnt2=0;
                    let cnt3=0;

                    for(let i=0; i<arr.length; i++){

                        if(arr[i][0]==="휴업"){
                            cnt++;
                        }
                        if(arr[i][0]==="폐업"){
                            cnt1++;
                        }
                        if(arr[i][0]==="영업/정상"){
                            cnt2++;
                        }
                        if(arr[i][0]==="취소/말소/만료/정지/중지"){
                            cnt3++;
                        }
                    }
                
                    console.log(arr);
                 

                    //출력
                    // for(let i=0; i<arr.length; i++){
                    //     $('.tbody-cultural-assets-csv2').append(`<tr>`);
                    //     for(let j=0; j<arr[i].length; j++){
                    //         $('.tbody-cultural-assets-csv2').append(`<td>${arr[i][j]}</td>`);

                    //     }
                    //     $('.tbody-cultural-assets-csv2').append(`</tr>`);

                    // }

                    $('.tbody-cultural-assets-csv2').append("<tr>");
                    $('.tbody-cultural-assets-csv2').append(`<td>${cnt}</td><td>${cnt1}</td><td>${cnt2}</td><td>${cnt3}</td>`);
                    $('.tbody-cultural-assets-csv2').append("</tr>");
                },
                error(err){
                     console.log(`AJAX 실패 :   ${err}`);

                }
            })
        }
    });

    

})(jQuery);