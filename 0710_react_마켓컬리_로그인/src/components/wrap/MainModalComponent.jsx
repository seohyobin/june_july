import React from 'react';
import './go_top/scss/main-modal.scss';
import { GlobalContext } from '../../context/GlobalContext';

export default function MainModalComponent(){
const {mainModal,mainModalshowOut,mainModalAyearshowOut}=React.useContext(GlobalContext);
    const onClickModalClose=(e)=>{
        e.preventDefault();
        mainModalshowOut();
    }
    const onClickModalAYearClose=(e)=>{
        e.preventDefault();
        mainModalAyearshowOut();
       
    }
    React.useEffect(()=>{
        console.log(new Date(1719714475470));
    },[])


    return (
        <div id='mainModal'>
            <div className="container">
                <div className="content">
                    <div className="modal">
                        <div className="img-box">
                            <img src="./images/intro/modal.jpg" alt="" />
                        </div>
                        <div className="button-box">
                            <button onClick={onClickModalAYearClose}>다시 안 보기</button>
                            <button onClick={onClickModalClose}>닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

