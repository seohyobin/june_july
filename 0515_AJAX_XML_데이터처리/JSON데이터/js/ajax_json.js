//제이쿼리 ajax 제이슨 파일 처리
(($)=>{
    $('.member-hp-btn-json').on({
        click(e){
            e.preventDefault();

            $.ajax({
                url:'./data/member.json',
                type:'GET',
                dataType:'JSON',
                success(res){
                    //console.log(`AJAX 성공 :   ${res}`);

                    //연락처 테이블에 바인딩하기!!!
                    //res데이터 소스 가져오기

                    let txt='';
                    $.each(res.연락처,function(idx, item){
                        txt+= `<tr key ='${item.번호} '>`
                        txt+= `    <td>${item.번호}</td>`
                        txt+= `    <td>${item.이름}</td>`
                        txt+= `    <td>${item.휴대폰}</td>`
                        txt+= `</tr>`
                    });
                    $('.tbody-hp-json').append(txt);
                    
                },
                error(err){
                    //console.log(`AJAX 실패 :   ${err}`);
                }
            })
        }
    });

    $('.member-grade-btn-json').on({
        click(e){
            e.preventDefault();

            $.ajax({
                url:'./data/member.json',
                type:'GET',
                dataType:'JSON',

                success(res){
                 

                    $('.tbody-grade-json').empty();

                    let arr=[];

                   res.성적표.map(function(item,idx){
                        arr[idx]=[];
                        arr[idx][0]=item.번호;
                        arr[idx][1]=item.이름;
                        arr[idx][2]=item.국어;
                        arr[idx][3]=item.영어;
                        arr[idx][4]=item.수학;
                        arr[idx][5]=arr[idx][2]+arr[idx][3]+arr[idx][4];//총점
                        arr[idx][6]=Math.round(arr[idx][5]/3);
                        
                        if(arr[idx][6]>95){
                            arr[idx][7] ='A';
                        }
                        else if(arr[idx][6]>85){
                            arr[idx][7]='B';
                        }
                        else if(arr[idx][6]>75){
                            arr[idx][7]='C';
                        }
                        else if(arr[idx][6]>65){
                            arr[idx][7]='D';
                        }
                        else if(arr[idx][6]>55){
                            arr[idx][7]='E';
                        }
                        else {
                            arr[idx][7]='F';
                        }
                    });



                    let rank=1;
                    for(let i=0; i<arr.length; i++){
                        rank=1;
                        for(let j=0; j<arr.length; j++){
                            if(arr[i][6] < arr[j][6]){  
                                rank++;
                            }
                        }
                        arr[i][8]=rank;
                    }



                    let temp='';
                    for(let i=0; i<arr.length-1; i++){
                        for(let j=i+1; j<arr.length; j++ ){
                            if(arr[i][8]>arr[j][8]){
                                for(let k =0; k<arr[i].length; k++){
                                    temp=arr[i][k];
                                    arr[i][k]=arr[j][k];
                                    arr[j][k] = temp;
                                }
                            }
                        }
                    }

                    //2차원 배열
                    //console.log(arr);
                     for(let i=0; i<arr.length; i++){
                        $('.tbody-grade-json').append(`<tr data-key="${arr[i][0]}">`);
                
                        for(let j=0; j<arr[i].length; j++){
                             $('.tbody-grade-json').append(`<td>${arr[i][j]}</td>`);
                        }
                        $('.tbody-grade-json').append(`</tr>`);
                    }
            

                    //$('.tbody-grade-json').append(`<tr><td>${item.번호}</td><td>${item.이름}</td><td>${item.국어}</td><td>${item.영어}</td><td>${item.수학}</td><td>${arr[i][5]}</td><td>${arr[i][6]}</td><td>${arr[i][7]}</td><td>${arr[i][8]}</td></tr>`)

                    
                },
                error(err){
                 
                }
            })
        }
    });


})(jQuery);