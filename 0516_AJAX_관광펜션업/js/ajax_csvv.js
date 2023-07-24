(($)=>{

    
    $('.cultural-assets-csv').on({
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
                        arr[i][0]=String(item.split(',')[0]);
                        arr[i][1]=String(item.split(',')[1]);   
                        arr[i][2]=String(item.split(',')[5]);
                        arr[i][3]=String(item.split(',')[8]);
                        arr[i][4]=String(item.split(',')[9]);
                        arr[i][5]=String(item.split(',')[18]);
                        arr[i][6]=String(item.split(',')[17]);
                        arr[i][7]=String(item.split(',')[49]);
                    });
                    console.log(arr);

                    let cnt=0;
                    let cnt1=0;
                    let cnt2=0;
                    let cnt3=0;

                    for(let i=0; i<arr.length; i++){

                        if(arr[i][3]==="휴업"){
                            cnt++;
                        }
                        if(arr[i][3]==="폐업"){
                            cnt1++;
                        }
                        if(arr[i][3]==="영업/정상"){
                            cnt2++;
                        }
                        if(arr[i][3]==="취소/말소/만료/정지/중지"){
                            cnt3++;
                        }
                    }
                

                    //출력
                    $('.tbody-cultural-assets-csv').empty();
                    for(let i=0; i<arr.length; i++){
                        $('.tbody-cultural-assets-csv').append(`<tr>`);
                        for(let j=0; j<arr[i].length; j++){
                            $('.tbody-cultural-assets-csv').append(`<td>${arr[i][j]}</td>`);

                        }
                        $('.tbody-cultural-assets-csv').append(`</tr>`);

                    }
                },
                error(err){
                     console.log(`AJAX 실패 :   ${err}`);

                }
            })
        }
    });

})(jQuery);