import React from 'react';
import $ from 'jquery';
import './scss/section3.scss';
import Section3SlideComponent from './Section3SlideComponent';
import axios from 'axios';



    //판매가격 정가 콤마형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        } 
    }

export default function Section3Component({setViewProduct}){

    //1.상태관리 변수 지정
    const [state,setState] = React.useState({
        상품:[],
        n:0
    });

    //2.AXIOS 외부 데이터 상품 가져오기 상태관리 배열 변수, 상품수n에 에 데이터 저장하기 
    React.useEffect(()=>{
        axios({
            url:'./data/intro_page/section3.json',
            method:'GET'
        })
        .then((res)=>{
            //console.log(res.data);
            if(res.status===200){
                setState({
                    ...state,
                    상품:res.data.상품,
                    n:res.data.상품.length //롤링 아니라서 -1 안했엉~
                })
            }

        })
        .catch((err)=>{
            console.log(`axios 오류 err ${err}`);

        })

    },[state. 상품 ])
    //3.React.useEffect() 상품수 등록(n)되면 즉시 슬라이드 전체 너비 설정하기 ==>밑에
    //4.상태변수 데이터를 자식 컴포넌트에 내려준다.
    //5.자식컴포넌트는 비구조화로 받아서 탬플릿 요소에 반복처리 바인딩한다.
    
    

    return (
        <section id="section3">
            <Section3SlideComponent 상품={state.상품} n={state.n} setViewProduct={setViewProduct}/>
         </section>
    );
};

