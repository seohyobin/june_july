import React from 'react';
import './go_top/scss/page404.scss';
import gif from './img/404/Robin Davey.gif';
import gif2 from './img/404/Pop a molly.gif';
import gif3 from './img/404/Top 10 animated 404 pages.gif';



export default function Error404pageComponent(){
    return (
        <div id="wrap">
            <div id='page404'>
                <h1><img src={gif} alt="" /></h1>
                <h2>PAGE NOT FOUND</h2>
            </div>
        </div>

    );
};

;