import React from 'react';
import NoticeLeftNavComponent from './NoticeLeftNavComponent';
import './scss/notice_update.scss';
import {useSearchParams}from 'react-router-dom';
import axios from 'axios';

export default function NoticeUpdateFormPage(){
    const [param,setParam] = useSearchParams();
    let listNum=param.get('listNum');
    const [notice,setNotice]=React.useState({});

    React.useEffect(()=>{
        axios({
            url:'./data/notice_page/board.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                let result = res.data.notice.filter((item)=>item.NO === Number(listNum))
                setNotice(result[0])

                setState({
                    ...state,
                    contents:result[0].내용,
                    subject:result[0].제목
                });
            }
        })
        .catch((err)=>{
            console.log(`err ${err}`)

        })
    },[listNum])





    const [state,setState]=React.useState({
        subject:'',
        contents:''
    })
    const {subject,contents}=state;

    const onSubmitWrite=(e)=>{
        e.preventDefault();
    }

    //수정 시 입력 처리하는 함수
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
            
        })    
    }



        //목록
        const onClickNoticeList=(e)=>{
            e.preventDefault();
            window.location.pathname='/notice'
    
        }
    
        //저장
        const onClickNoticeSave= async (e)=>{
            e.preventDefault();
            //수정페이지로 이동
            window.location.pathname='/notice'
            sessionStorage.setItem('NOTICE_UPDATA',JSON.stringify(state));
        }

    return (
        <div id='noticeUpdate'>
            <div className="container">
                <div className="left">
                    <NoticeLeftNavComponent/>
                </div>
                <div className="right">
                    <div className="title">
                        <h2>공지사항 수정</h2>
                    </div>
                    <div className="content">
                        <form onSubmit={onSubmitWrite}>
                            <ul>

                                <li>
                                    <label htmlFor="subject">제목<i>*</i></label>
                                    <input autoComplete='off' onChange={onChangeSubject} type="text" name='subject' id='subject'  placeholder='제목을 입력하세요.' value={subject}/>
                                    
                                </li>
                                <li>
                                    <label htmlFor="subject">내용<i>*</i></label>
                                    <textarea onChange={onChangeContents} name="contents" id="contents" placeholder='내용을 수정하세요.' value={contents}>
                                    </textarea>
                                </li>
                            </ul>
                            <div className="button-box">
                                <div className="left">
                                    <button onClick={onClickNoticeSave}>저장</button>
                                    <button onClick={onClickNoticeList}>목록</button>
                                </div>  
                             </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};
