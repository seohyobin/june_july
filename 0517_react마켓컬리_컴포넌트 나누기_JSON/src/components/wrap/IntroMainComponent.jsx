import React from 'react';
import $ from 'jquery';
import Section1Component from './introMain/Section1Component';
import Section2Component from './introMain/Section2Component';
import Section3Component from './introMain/Section3Component';
import Section4Component from './introMain/Section4Component';

export default function IntroMainComponent(){  
    return (
        // <Section1Component/>
        <main id='main' className='sub-page intro'>
            <Section1Component/>
            <Section2Component/>
            <Section3Component/>
            <Section4Component/>
        </main>
    );
};



