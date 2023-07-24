import React from 'react';
import './notice_scss/notice_write.scss';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';

export default function NoticeUpdateFormPageComponent () {

    const [param, setParam] = useSearchParams();
    let listNum = param.get('listNum');
    const [notice, setNotice] = React.useState({});

    React.useEffect(()=>{
        axios({
            url:'./data/notice_page/board.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                let result = res.data.notice.filter((item)=>item.NO===Number(listNum));
                
                setNotice( result[0] ); // 객체 저장 => {}

                // 입력상자에 데이터가 저장 그리고 수정하면 저장하면된다. 수정
                setState({
                    ...state,
                    subject: result[0].제목,
                    contents: result[0].내용
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    },[listNum]);



    const [state, setState] = React.useState({
        subject:'',
        contents:''
    });
    const {subject, contents} = state;



    const onSubmitWrite=(e)=>{
        e.preventDefault();
        // axios()        
    }

    // 수정시 입력
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            subject: e.target.value
        })
    }
    // 수정시 입력
    const onChangeContents=(e)=>{
        setState({
            ...state,
            contents: e.target.value,
        })
    }

  
    // 저장
    const onClickSave = async (e) => {
        sessionStorage.setItem('NOTICE_UPDATE', JSON.stringify(state));
        window.location.pathname = '/notice';
    }

    // 목록
    const onClickNoticeList=(e)=>{
        e.preventDefault();
        window.location.pathname = '/notice';
    }


  

    return (
        <div id='noticeUpdate' className='noticeWrite'>
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

                            <div className="button-box update">
                                <button onClick={onClickSave}>저장</button>                                
                                <button onClick={onClickNoticeList}>목록</button>                                
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

