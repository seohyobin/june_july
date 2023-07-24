// 제이쿼리 

// ECMA5
(function(){})(jQuery);

// ECMA6
(()=>{})(jQuery);

// AJAX => JSON 데이터 처리 구현
(($)=>{
    
    $('.member-hp-btn').on({
        click(e){
            e.preventDefault();
            
            $.ajax({
                url:'./data/member.json',
                type:'GET',
                dataType:'JSON', //XML, CSV, TXT, JSON
                success(res){
                    let txt = '';
                    $.each(res.연락처, function(idx, item){ // 1행씩 txt에 저장
                        txt+=`<tr data-key='${item.번호}'>`
                        txt+=`    <td>${item.번호}</td>`
                        txt+=`    <td>${item.이름}</td>`
                        txt+=`    <td>${item.휴대폰}</td>`
                        txt+=`</tr>`
                    });

                    // $('.tbody').append( txt );
                    $('.tbody-hp').html( txt );
                },
                error(err){
                    console.log(`AJAX 실패! ${err}`);
                }
            });

        }
    });


    // 성적표
    $('.member-grade-btn').on({
        click(e){
            e.preventDefault();
            
            $.ajax({
                url:'./data/member.json',
                type: 'GET',
                dataType: 'JSON',
                success(res){
                    // console.log(`AJAX 성공!`);
                    // console.log( res.성적표 );

                    // $.each(res.성적표, function(idx, item){
                    //     console.log( idx, item );
                    // });
                    $('.tbody-grade').empty(); // 내용 지우기

                    // 1. 원시 데이터 가져오기 번호 이름 국어, 영어, 수학
                    // 2. 2차원 배열에 저장하기
                    // 3. 총점, 평균 계산 처리
                    // 4. 석차를 구한다.
                    // 5. 정렬을 구현한다. 순위별 오름차순(평균성적내림차순)
                    // 6. 출력 바인딩

                    // [STEP-1] ////////////////////////////////////////////
                    // 1. 원시 데이터 가져오기 번호 이름 국어, 영어, 수학
                    // 2. 2차원 배열에 저장하기
                    // 3. 총점, 평균 계산 처리
                    let student = [];
                    res.성적표.map(function(item, idx){
                        student[idx] = []; // 2차원 배열 선언
                        student[idx][0] = item.번호;   // 번호
                        student[idx][1] = item.이름;   // 이름
                        student[idx][2] = item.국어;   // 국어
                        student[idx][3] = item.영어;   // 영어
                        student[idx][4] = item.수학;   // 수학
                        student[idx][5] = student[idx][2]+student[idx][3]+student[idx][4];   // 총점
                        student[idx][6] = Math.round(student[idx][5]/3);                     // 평균
                    });
                    
                     // [STEP-2] ////////////////////////////////////////////
                     // 4. 석차를 구한다.
                     //    석차=1;
                     //    내평균점수와 우리반 전체 평균점수 비교 나보다 크면 석차=석차+1
                     let 석차=1;
                     for(let i=0; i<student.length; i++){
                        석차=1;
                        for(let j=0; j<student.length; j++){
                           if(student[i][6] < student[j][6]){
                                석차++;
                           } 
                        }
                        student[i][7] = 석차;  //석차
                     }
                    
                     // 2차원배열
                    //  console.log( student );

                    // [STEP-3] ////////////////////////////////////////////
                    // 정렬알고리즘 구현(Ascending & Descending)
                    // 순위의 오름차순 ASC (평균점수의 내림차순 DESC)    
                    // 본인 (i=0) ~ (i=50-1)의 순위를 나 다음(j=i+1) ~ i=50 사람부터 마지막까지 비교한다. 알고리즘
                    let imsi = '';
                    for(let i=0; i<student.length-1; i++){  // i = 0 ~ n-1
                        for(let j=i+1; j<student.length; j++){  // j = 0+1 ~ n
                            if( student[i][7] > student[j][7] ){
                                for(let k=0; k<student[i].length; k++){  // k = 0 ~ 7  
                                    imsi =  student[i][k];
                                    student[i][k] = student[j][k];
                                    student[j][k] = imsi;
                                }
                            }
                        }
                    }


                    // [STEP-4] ////////////////////////////////////////////
                    // 출력 바인딩 구현
                    // 행열(2차원 배열) 
                    for(let i=0; i<student.length; i++){  // 줄(Row)
                        $('.tbody-grade').append(`<tr data-key="${student[i][0]}">`);
                        for(let j=0; j<student[i].length; j++){ // 칸(Column)
                            $('.tbody-grade').append(`<td>${student[i][j]}</td>`);
                        }
                        $('.tbody-grade').append(`</tr>`);
                    }
                    


                    // $('.tbody-grade').append(`<tr><td>${item.번호}</td><td>${item.이름}</td><td>${item.국어}</td><td>${item.영어}</td><td>${item.수학}</td></tr>`);
                    // $('.tbody-grade').listview("refresh"); // 바인딩 새로고침

                },
                error(err){
                    console.log(`AJAX 실패! ${err}`);
                },
            });
        }
    });

    

})(jQuery);

