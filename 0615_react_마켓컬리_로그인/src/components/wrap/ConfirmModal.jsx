import React from 'react';
import { ConfirmContext } from '../../context/ConfirmContext';


export default function ConfirmModal({}) {
    
    const {confirmModalClose,modal }=React.useContext(ConfirmContext);

    const onClickComfirmModalClose=(e)=>{
            e.preventDefault();
            confirmModalClose();
            //닫기메소드 호출 실행!!
    }
    
    return (
    <div id="confirmModal">
        <div className="wrap">
            <div className="container">
                <div className="content">
                    <div className="title-box">
                        <h1>{modal.confirmModalMsg}</h1>
                    </div>
                    <div className="button-box">
                        <button onClick={onClickComfirmModalClose}>확인</button>
                    </div>
                </div>
            </div>
        </div>
   </div>
    );
};
