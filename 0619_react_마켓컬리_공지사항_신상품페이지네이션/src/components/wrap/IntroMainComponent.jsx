import React from 'react';
import $ from 'jquery';
import Section1Component from './main_intro/Section1Component';
import Section2Component from './main_intro/Section2Component';
import Section3Component from './main_intro/Section3Component';
import Section4Component from './main_intro/Section4Component';
import Section5Component from './main_intro/Section5Component';
import Section6Component from './main_intro/Section6Component';

import { LocalStorageContext } from '../../context/LocalStorageContext';

export default function IntroMainComponent(){  

    const {setViewProduct}=React.useContext(LocalStorageContext);
    
    return (
        // <Section1Component/>
        <main id='main' className='sub-page intro'>
            <Section1Component/>
            <Section2Component/>
            <Section3Component setViewProduct={setViewProduct}/>
            <Section4Component setViewProduct={setViewProduct}/>
            <Section5Component setViewProduct={setViewProduct}/>
            <Section6Component/>
       
        </main>
    );
};



