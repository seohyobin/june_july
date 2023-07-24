import React from 'react';
import './notice_scss/notice_write.scss';
import {useSearchParams} from 'react-router-dom';

import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import axios from 'axios';
export default function NoticeWriteFormPageComponent () {
    const [param, setParam] = useSearchParams();

    const 번호   = param.get('번호'); // 보내온 키를 이용 키값을 가져온다.
    const 제목   = param.get('제목'); // 보내온 키를 이용 키값을 가져온다.
    const 내용   = param.get('내용'); // 보내온 키를 이용 키값을 가져온다.
    const [state, setState] = React.useState({
        subject:'',
        contents:'',
        bbsId:''
    });
    const {subject, contents} = state;

    const onSubmitWrite=(e)=>{

        axios({
            url:'/bbs/updateActionReact.jsp',
            method:'POST',
            data: {},
            params: {
               bbsId:번호,
               subject:state.subject,
               content:state.contents
            }
        })
        .then((res)=>{
           console.log( res );
           console.log( res.data );
            if(res.status===200){
                alert('수정전송결과 확인!');
                console.log( res.data );
            }

        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err );
        });
        e.preventDefault();
        // axios()        
    }

    const onChangeSubject=(e)=>{
        setState({
            ...state,
            subject: e.target.value,
        })
    }
    const onChangeContents=(e)=>{
        setState({
            ...state,
            contents: e.target.value,
        })
    }


    return (
        <div id='noticeWrite' className='noticeWrite'>
            <div className="container">
                <div className="left">
                    <NoticeLeftNavComponent/>
                </div>
                <div className="right">
                    <div className="title">
                        <h2>공지사항</h2>
                    </div>
                    <div className="content">
                        <form onSubmit={onSubmitWrite}>
                            <ul>
                                <li>
                                    <label htmlFor="subject">제목<i>*</i></label>
                                    <input 
                                    onChange={onChangeSubject}
                                    type="text" 
                                    name='subject' 
                                    id='subject' 
                                    value={subject} 
                                    placeholder='제목을 입력해 주세요' 
                                    />
                                </li>
                                <li>
                                    <label htmlFor="contents">내용<i>*</i></label>
                                    <textarea 
                                    onChange={onChangeContents}
                                    name="contents" 
                                    id="contents"  
                                    placeholder='내용을 입력해 주세요' 
                                    value={contents}
                                    ></textarea>
                                </li>
                            </ul> 

                            <div className="button-box">
                                <button type='submit'>등록</button> 
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

