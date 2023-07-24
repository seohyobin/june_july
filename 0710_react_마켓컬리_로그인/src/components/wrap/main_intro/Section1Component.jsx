import React from 'react';
import $ from 'jquery';
import './scss/section1.scss';
import Section1SlideComponent from './Section1SlideComponent';
import axios from 'axios';

export default function Section1Component(){
    const [state, setState] = React.useState({
        slide: [],
        n: null
    });



    //슬라이드 데이터 가져오기!!!
    React.useEffect(()=>{
            //axios api 사용!!!
            axios({
                url:'./data/intro_page/section1.json',
                method:'GET'

            })
            .then((res)=>{

                // console.log(res.data);

                if(res.status===200){
                    setState({
                        ...state,
                        slide:res.data.slide,
                        n : (res.data.slide.length)-2
                    })
                }
            })
            .catch((err)=>{
                console.log(`axios 실패 err!!!!! ${err}`);

            })
    },[]);
    
    

    return (
        <section id="section1">
            <div className="container">
                <div className="gap">
                    <div className="title hide">
                        <h2>마켓컬리 메인 슬라이드</h2>
                    </div>
                    <div className="content">

                        <Section1SlideComponent slide = {state.slide}  n={state.n}/>

                    </div>  
                </div>
            </div>
        </section>
    );
};
