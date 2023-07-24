//제이쿼리 ajax 제이슨 파일 처리
(($)=>{
    $('.member-grade-btn-txt').on({
        click(e){
            e.preventDefault();

            $.ajax({
                url:'./data/member.txt',
                type:'GET',
                dataType:'TEXT',
                success(res){
                    alert("확인~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log(`AJAX 성공 :   ${res}`);
                    //1.줄단위로 분리하고 
                    //  줄끝을 검색 => \r\n

                    //2.칸단위로 분리한다.
                    //  필드 (칸)별로 분리작업
                    //  공백을 기준으로 분리한다.
                    //console.log(res.split('\r\n'));
                    const result = res.split('\r\n');
                    let arr=[];

                    $.each(result, function(i,item){

                        // console.log(idx,item.split(' ')[0] ); //공백을 기준으로 칸을 분리한다. 
                        // console.log(idx,item.split(' ')[1] ); //공백을 기준으로 칸을 분리한다. 
                        // console.log(idx,item.split(' ')[2] ); //공백을 기준으로 칸을 분리한다. 
                        // console.log(idx,item.split(' ')[3] ); //공백을 기준으로 칸을 분리한다. 
                        // console.log(idx,item.split(' ')[4] ); //공백을 기준으로 칸을 분리한다. 
                        arr[i]=[];
                        arr[i][0]= Number(item.split(' ')[0]);
                        arr[i][1]= String(item.split(' ')[1]);
                        arr[i][2]= Number(item.split(' ')[2]);
                        arr[i][3]= Number(item.split(' ')[3]);
                        arr[i][4]= Number(item.split(' ')[4]);
                        arr[i][5]= arr[i][2]+arr[i][3]+arr[i][4];
                        arr[i][6]=Math.round(arr[i][5]/3);
            

                    });
                    console.log(arr);


                    // //석차=>동등석차
                    let rank = 1;
                    for(let i=0; i<arr.length; i++){
                        rank=1;
                        for(let j=0; j<arr.length; j++){
                            if(arr[i][5] < arr[j][5]){
                                rank++;
                            }
                        }   
                        arr[i][7]=rank; 
                    }
                    
                    

                    //정렬=>평균점수의 오름차순으로 알고리즘]
                    let temp='';
                    for(let i=0; i<arr.length-1; i++){
                        for(let j =i+1; j<arr.length; j++){
                            if(arr[i][6] > arr[j][6]){

                                for(let k =0; k<arr[i].length; k++){
                                    temp=arr[i][k];
                                    arr[i][k]=arr[j][k];
                                    arr[j][k]=temp;
                                }
                            }
                        }
                    }

                    //출력바인딩
                    $('.tbody-grade-txt').empty();
                    for(let i=0; i<arr.length; i++){
                        $('.tbody-grade-txt').append(`<tr>`);
                        for(let j =0; j<arr[i].length; j++){
                            $('.tbody-grade-txt').append(`<td>${arr[i][j]}</td>`);

                        }
                        $('.tbody-grade-txt').append(`</tr>`);

                    }

                 
                },
                error(err){
                    console.log(`AJAX 실패 :   ${err}`);
                }
            })
        }
    });



})(jQuery);