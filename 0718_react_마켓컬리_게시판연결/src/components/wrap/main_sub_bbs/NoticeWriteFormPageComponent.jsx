import React from 'react';
import './notice_scss/notice_write.scss';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import axios from 'axios';
import {GlobalContext} from '../../../context/GlobalContext';
export default function NoticeWriteFormPageComponent () {
    const {login, setLogin,signin, setSigin} = React.useContext(GlobalContext);

    const [state, setState] = React.useState({
        subject:'',
        contents:''
    });
    const {subject, contents} = state;

    const onClickWrite=(e)=>{
        e.preventDefault();
                   axios({
                url:'/bbs/writeActionReact.jsp',
                method: 'POST',
                data:{},
                params: {
                    "userId":'hyo111',
                    "subject": subject,
                    "content": contents
                }
            })
            .then((res)=>{
                if(res.status===200 && res.data===1){
                    alert('글이 등록되었습니다.')
                   window.location.pathname='/notice';
                } 
                else{
                    alert('글이 등록되지 않았습니다.')
                }  
                console.log(res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.log(`AXIOS 실패! ${err} `)
            });  
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
                        <form>
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
                                <button type='submit' onClick={onClickWrite}>등록</button> 
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

