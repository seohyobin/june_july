import React, { useEffect } from 'react';
import jQuery from 'jquery';


export default function Section1SlideComponent({slide,n}){

      
    return (
        <div className="slide_container">
            <div className="slide-view">
                <ul className="slide-wrap">


                    {
                        slide.map((item)=>{ 
                            return(
                                <li className="slide" key={item.idx}><a href="!#"><img src={item.src} alt="" /></a></li>
                                )
                        })

                    }
                  


                </ul>
            </div> 
            <a href="!#" className='left-arrow-btn'><img src="./images/intro/arrow_left.svg" alt="" /></a>
            <a href="!#" className='right-arrow-btn'><img src="./images/intro/arr_right.svg" alt="" /></a>
            <span className='page-count-box'>
                <em className='currnet-number'>1</em>
                <i>/</i>
                <em className='total-number'>{n}</em>
            </span>
        </div>
    );
};

