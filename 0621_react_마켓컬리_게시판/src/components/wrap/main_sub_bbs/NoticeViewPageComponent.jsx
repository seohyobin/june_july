import React from 'react';
import './scss/notice_view.scss';
import { ConfirmContext } from '../../../context/ConfirmContext';
//쿼리스트링 => 키(listNum), 키값(item.NO)
//파라미터 = 보내온 파라미터 데이터를 추출(검색)
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';


export default function NoticeViewPageComponent () {

    const [param,setParam] = useSearchParams();
    const listNum = param.get('listNum');
    // console.log(listNum); //보내온 키 값 확인
    const [state,setState]=React.useState({
        notice:{}
    })
    const {notice} =state;

    React.useEffect(()=>{
        
        let formData=new FormData();
        formData.append('idx',listNum)
        axios({
            url:'./data/notice_page/board.json',
            method:'GET', // POST 해야해
            // data:formData //해당하는 글 번호
        })
        .then((res)=>{
            if(res.status===200){
                let result =  res.data.notice.filter((item)=>item.NO === Number(listNum));
            //   res.data.notice.map((item) => { //파라미터 값이 문자로 전송받음 , 변환 Number로 변환해 ==>MAP으로 뽑기
            //     if(item.NO === Number(listNum)){
            //         console.log(item.NO, item.제목)
            //     }
            //   });
                setState({
                    ...state,
                    notice:result[0]
                })
                console.log(result[0]);
            }
        })
        .catch((err)=>{
            console.log(`err ${err}`);

        })

    },[listNum])



    const {confirmModalMsgOKCanCleOpen,confirmModalMsgCancleCanCleClose,isConfirmModalOKCanCleResult} = React.useContext(ConfirmContext);

    React.useEffect(()=>{
        if(isConfirmModalOKCanCleResult === '확인'){
            sessionStorage.removeItem('NOTICE_UPDATA');

            let formData= new FormData();

            axios({
                url:'./data/notice_page/board.json',
                method:'GET',
                data:formData
            })
            .then((res)=>{
              if(res.status===200){
                alert('삭제되었습니다.');
                window.location.pathname='/notice';

                }
            })
            .catch((err)=>{
                console.log(`err ${err}`)
    
            })

        }
    },[isConfirmModalOKCanCleResult])

    //글목록으로 이동   
    const onClickNoticeList=(e)=>{
        e.preventDefault();
        window.location.pathname='/notice'

    }
    const onClickNoticeDelete=(e)=>{
        e.preventDefault();
        confirmModalMsgOKCanCleOpen('공지사항 글 삭제 하시겠습니까?');
    }

    //글수정
    const onClickUpdate=(e)=>{
        e.preventDefault();
        //수정페이지로 이동
        window.location.pathname='/notice_update'
    }

    return (
        <div id='noticeView'>
            <div className="container">
                <div className="title">
                    <h2>공지사항</h2>
                    <p>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</p>
                </div>

                
                    <div className="content">
                        <ul>
                            <li>
                                <div className="left">제목</div>
                                <div className="right">{notice.제목}</div>                            
                            </li>
                            <li>
                                <div className="left">작성자</div>
                                <div className="right">컬리</div>  
                            </li>
                            <li>
                                <div className="left">작성일</div>  
                                <div className="right">{notice.날짜}</div>  
                            </li>
                            <li>
                                <div className="contents">
                                    {/* 글내용 */}
                                    <p>
                                        {notice.내용}
                                    </p>
                                   
                                </div>
                            </li>
                        </ul>
                        <div className="button-box">
                                <div className="left">
                                    <button onClick={onClickUpdate}>수정</button>
                                    <button onClick={onClickNoticeDelete}>삭제</button>

                                </div>
                                <div className="right">
                                    <button onClick={onClickNoticeList}>목록</button>

                                </div>  
                        </div>
                    </div>
                

            </div>
        </div>
    );
};