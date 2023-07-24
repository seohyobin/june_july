import React from 'react';
import './go_top/scss/confirm_modal2.scss';
import { ConfirmContext } from '../../context/ConfirmContext';
import { useContext } from 'react';
export default function ConfirmModalOkCancle(){
 
    const {confirmModalMsgOKCanCleOpen,confirmModalMsgCancleCanCleClose,modal}=useContext(ConfirmContext);


    const onClickComfirmModalClose=(e,value)=>{
        e.preventDefault();
        if(value==='확인'){
            //삭제
            confirmModalMsgCancleCanCleClose(value);

        }
        else{
            //취소

        }
        confirmModalMsgCancleCanCleClose();

    }

    return (
        <div id="confirmModal2">
        <div className="wrap2">
            <div className="container">
                <div className="content">
                    <div className="title-box">
                        <h1>{modal.confirmMsgOKCancle}</h1>
                    </div>
                    <div className="button-box">
                    <button onClick={(e)=>onClickComfirmModalClose(e,"취소")}>취소</button>
                    <button onClick={(e)=>onClickComfirmModalClose(e,"확인")}>확인</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

