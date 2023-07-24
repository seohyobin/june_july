import React from 'react';
import modal from './img/intro_modal_image.jpg';
import './go_top/scss/intro_modal.scss';
export default function IntroModal({introModalClose,IntroCookieClose}){

  const onClickModalClose=(e)=>{
    e.preventDefault();
    introModalClose();
  }
  const onClickCookieClose=(e)=>{
  e.preventDefault();
  IntroCookieClose('yes',7);
  introModalClose();
  }


    return (
      <div id="wrap">
        <div id="introModal">
          <div className="container">
              <div className="content">
                <img src={modal}alt="" />
                <div className="btn">
                  <button onClick={onClickCookieClose}>다시 안 보기</button>
                  <button onClick={onClickModalClose}>닫기</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
};

