import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Section5SlideComponent from './Section5SlideComponent';
import './scss/section5.scss';

export default function Section5Component(){
    const [state,setState]=React.useState({
            n:0,
            뷰티특가:[]
    })

    const getDataAPI=()=>{
        axios({
            url:'./data/intro_page/section5.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                console.log(res.data);
                setState({
                    ...state,
                    뷰티특가:res.data.뷰티특가,
                    n:res.data.뷰티특가.length
                })
            } 
        })
        .catch((err)=>{
            console.log(`AXIOS err ${err}`);

        })
    }


        React.useEffect(()=>{
            getDataAPI();
        },[]);
        
    
        React.useEffect(()=>{
            const  $slideWrap = $ ('#section5 .right');
            $slideWrap.css({ width:`${(75* state.n)-5}%`})


        },[state.n])

    
    return (
        <section id="section5">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="left">
                            <ul>
                                <li>
                                    <h2>뷰티컬리페스타 특가🎉</h2>
                                </li>
                                <li>
                                    <h3>매일 쏟아지는 특가 찬스!</h3>
                                </li>
                                <li>
                                </li>
                                <li>
                                    <p>망설이면 늦어요!</p>
                                </li>
                            </ul>
                        </div>
                            <Section5SlideComponent 뷰티특가={state.뷰티특가}/>
                    </div>
                </div>
            </div>
        </section>
    );
};
