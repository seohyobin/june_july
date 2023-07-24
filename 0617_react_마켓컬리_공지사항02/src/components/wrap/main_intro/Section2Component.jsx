import React from 'react';
import './scss/section2.scss';
import axios from 'axios';

export default function Section2Component(){

    const [state,setState] = React.useState({
        이미지:''
    })

    
    const getDataAPI=()=>{
        axios({
            url:'./data/intro_page/section6_img.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    이미지:res.data.section2LinkImg
                })
            }
        })
        .catch((err)=>{
            console.log(`AXIOS err ${err}`);
        })
    }

    React.useEffect(()=>{
        getDataAPI();
    },[state.이미지])


    return (
        <section id='section2'>
        <div className="container">
            <div className="gap">
                <div className="title hide">
                    <h2>section2</h2>
                </div>
                <div className="content">
                    <a href="!#"><img src={`./images/intro/${state.이미지}`} alt="" /></a>
                </div>
            </div>
        </div>
    </section>
    );
};

