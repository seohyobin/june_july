import React from 'react';
import $ from 'jquery';
import Section1Component from './introMain/Section1Component';
import Section2Component from './introMain/Section2Component';
import Section3Component from './introMain/Section3Component';
import Section4Component from './introMain/Section4Component';
import Section5Component from './introMain/Section5Component';
import Section6Component from './introMain/Section6Component';

export default function IntroMainComponent({SetViewProduct}){  
    return (
        // <Section1Component/>
        <main id='main' className='sub-page intro'>
            <Section1Component/>
            <Section2Component/>
            <Section3Component SetViewProduct={SetViewProduct}/>
            <Section4Component/>
            <Section5Component/>
            <Section6Component/>
        </main>
    );
};



