import React from 'react';
import './notice_scss/notice_write.scss';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';

export default function NoticeUpdateFormPageComponent () {



    const [param, setParam] = useSearchParams();

    const 번호   = param.get('번호'); // 보내온 키를 이용 키값을 가져온다.
    const 제목   = param.get('제목'); // 보내온 키를 이용 키값을 가져온다.
    const 내용   = param.get('내용'); // 보내온 키를 이용 키값을 가져온다.
    const 작성자 = param.get('작성자'); // 보내온 키를 이용 키값을 가져온다.
    const 작성일 = param.get('작성일'); // 보내온 키를 이용 키값을 가져온다.
    const 조회수 = param.get('조회수'); // 보내온 키를 이용 키값을 가져온다.
    let listNum = param.get('listNum');
    const [notice, setNotice] = React.useState({});

    React.useEffect(()=>{
        axios({
            url:'./data/notice_page/board.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                let result = res.data.notice.filter((item)=>item.NO===Number(번호));
                
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
    },[번호]);



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
        e.preventDefault();

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
                                    onChange={onChangeSubject} //입력상자에 키보드 입력 변화를 감지해서 적용
                                    type="text" 
                                    name='subject' 
                                    id='subject' 
                                    value={state.subject} 
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
                                    value={state.contents}
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

