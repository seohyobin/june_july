import React from 'react';
import $ from 'jquery';
import Section1Component from './introMain/Section1Component';
import Section2Component from './introMain/Section2Component';
import Section3Component from './introMain/Section3Component';
import Section4Component from './introMain/Section4Component';
import Section5Component from './introMain/Section5Component';
import Section6Component from './introMain/Section6Component';

export default function IntroMainComponent({setViewProduct}){  
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



