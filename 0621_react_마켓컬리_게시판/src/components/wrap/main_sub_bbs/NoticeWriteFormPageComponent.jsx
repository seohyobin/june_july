import React from 'react';
import NoticeLeftNavComponent from './NoticeLeftNavComponent';
import './scss/notice_write.scss';
export default function NoticeWriteFormPageComponent(){
    const [state,setState]=React.useState({
        subject:'',
        contents:''
    })
    const {subject,contents}=state;
    const onSubmitWrite=(e)=>{
        e.preventDefault();
    }
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            subject:e.target.value
            
        })
    }
    const onChangeContents=(e)=>{
        setState({
            ...state,
            contents:e.target.value
            
        })    }



    return (
        <div id='noticeWrite'>
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
                                    <input onChange={onChangeSubject} type="text" name='subject' id='subject'  placeholder='제목을 입력하세요.' value={subject}/>
                                </li>
                                <li>
                                    <label htmlFor="subject">내용<i>*</i></label>
                                    <textarea onChange={onChangeContents} name="contents" id="contents" placeholder='내용을 입력하세요.' value={contents}></textarea>
                                </li>
                            </ul>
                            <div className="btn">
                                <button type='submit'>등록</button>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};
