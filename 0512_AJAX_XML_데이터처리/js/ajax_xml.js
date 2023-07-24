
;(($)=>{
   
    $.ajax({
        url:'./data/member.xml',
        type:'GET',
        success(res){ //xml 데이터 파라미터 값에서 검색 list -> name
            // console.log(res);
            // console.log($(res).find('list'));
            // console.log($(res).find('name').text());
            // console.log($(res).find('kor').text());
            // console.log($(res).find('eng').text());
            // console.log($(res).find('mat').text());
            //제이쿼리 each()
            //a-> idx
            //b-> item  => map 함수랑 반대!!!
            $(res).find('list').each(function(a,b){
                // console.log(a,b);
            });

            $(res).find('list').each(function(idx,item){
                // console.log(idx,item);   
            });

            //배열처리
            let arr=[];
            let txt ='';
            let rank =1;
            $(res).find('list').each(function(i,item){
                // console.log(i, $(item).find('name').text());
                // console.log(i, $(item).find('kor').text());
                // console.log(i, $(item).find('eng').text());
                // console.log(i, $(item).find('mat').text());
                arr[i]=[];
                arr[i][0]=$(item).find('name').text();//이름
                arr[i][1]= Number($(item).find('kor').text());//이름
                arr[i][2]= Number($(item).find('eng').text());//이름
                arr[i][3]= Number($(item).find('mat').text());//이름
                arr[i][4]= arr[i][1] + arr[i][2]+ arr[i][3]; //총점
                arr[i][5]= Math.round( arr[i][4]/3 );//평균
                //console.log(arr);

                //abcde 학점
                if(arr[i][5] >=95){
                    arr[i][6]='A';
                }
                else if (arr[i][5] >=85){
                    arr[i][6]='b';
                }
                else if (arr[i][5] >=75){
                    arr[i][6]='c';
                }
                else if (arr[i][5] >=65){
                    arr[i][6]='d';
                }
       

            //석차  처음부터 끝까지 전체 비교
            for(let  i=0; i<arr.length; i++){
                rank = 1;
                 for(let j=0; j<arr.length; j++){
                        if(arr[i][5] < arr[j][5]){
                            rank++;
                        }
                 }
                 arr[i][7] = rank;
             }

             //정렬하기!!! 석차 순위별~ 오름차순

             let imsi = '';
             //처음부터 마지막 사람 전까지!!!
             for(let  i=0; i<arr.length-1; i++){ // 처음부터 마지막-1 비교!!
                 for(let j=i+1; j<arr.length; j++){ // i+1 => 다음 사람 /// 두번째부터 마지막까지 이거 계속 반복
                      //석차로 순위별 정렬 
                      if(arr[i][7] > arr[j][7]){ //내림차순 < 이걸로!!!

                        for(let k =0; k<=7; k++){ //
                            imsi = arr[i][k];
                            arr[i][k]=arr[j][k]
                            arr[j][k]=imsi;
                        }


                        // arr[i][1]=arr[j][1]
                        // arr[j][1]=imsi;

                        // arr[i][2]=arr[j][2]
                        // arr[j][2]=imsi;

                        // arr[i][3]=arr[j][3]
                        // arr[j][3]=imsi;

                        // arr[i][4]=arr[j][4]
                        // arr[j][4]=imsi;

                        // arr[i][5]=arr[j][5]
                        // arr[j][5]=imsi;
                        
                        // arr[i][6]=arr[j][6]
                        // arr[j][6]=imsi;
                        
                        // arr[i][7]=arr[j][7]
                        // arr[j][7]=imsi;

                      }
                 }
             }




            });




            for(let  i=0; i<arr.length; i++){

               txt += " <tr> ";
                for(let j=0; j<arr[i].length; j++){
           
                    txt+= "<td>"+ arr[i][j] + "</td>";
          
                }
                txt += " </tr>";
            }

            //화면에 바인딩!!!
            //$('table tbody').append(txt);
            $('table tbody').html(txt); //같은거!!!

        },
        err(err){

        }

    });

})(jQuery);