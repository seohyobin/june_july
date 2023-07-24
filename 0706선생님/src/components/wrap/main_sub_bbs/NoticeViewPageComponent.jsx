import React from 'react';
import './notice_scss/notice_view.scss';
import { ConfirmContext } from '../../../context/ConfirmContext';
// 쿼리 스트링 => 키(listNum)와 키값(item.NO)
// 파라미터 => 보내온 파라미터 데이터를 추출(검색)
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';


export default function NoticeViewPageComponent () {

    const [param, setParam] = useSearchParams();
    const listNum = param.get('listNum'); // 보내온 키를 이용 키값을 가져온다.

    const [state,setState] = React.useState({
        공지사항: {}
    });

    const {공지사항} = state;

    React.useEffect(()=>{
        let formData = new FormData();
        formData.append('idx', listNum);

        axios({
            url:'./data/notice_page/board.json',
            method:'GET',
            //method:'POST',
            data: formData // => 해당하는 글번호 키 
        })
        .then((res)=>{
            if(res.status===200){
                
                console.log( res.data.notice );
                
                let result = res.data.notice.filter((item) => item.NO===Number(listNum) );
                console.log( result[0] );

                res.data.notice.map((item) => {
                    if(item.NO===Number(listNum)){ //파라미터값이 문자로 전송받은거 변환
                        console.log( item.NO, item.제목 );
                    }
                })
                
                setState({
                    공지사항: result[0] //배열[0]
                })
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err );
        });
    },[]);



    const {ConfirmModalOkCancelOpen, isConfirmModalOkCancelResult} = React.useContext(ConfirmContext);

    React.useEffect(()=>{

        if(isConfirmModalOkCancelResult==='확인'){
           sessionStorage.removeItem('NOTICE_UPDATE')

           // 삭제하고자하는 키
           let formData = new FormData();
           formData.append('idx', listNum);

           axios({
                url:'./data/notice_page/board.json',
                method:'GET',
                //method:'POST',
                data: formData // => 해당하는 글번호 키 
            })
            .then((res)=>{
                if(res.status===200){
                    alert('삭제되었습니다.');
                    window.location.pathname = '/notice';    
                }

            })
            .catch((err)=>{
                console.log('AXIOS 실패!' + err );
            });
        }
        
    },[isConfirmModalOkCancelResult])


    // 글목록으로 이동
    const onClickNoticeList=(e)=>{
        e.preventDefault();
        window.location.pathname = '/notice';
    }

    // 글삭제
    const onClickDelete=(e)=>{
        e.preventDefault();
        ConfirmModalOkCancelOpen('공지사항 글을 삭제 하시겠습니까?');        
    }

    // 글수정
    const onClickUpdate=(e)=>{
        e.preventDefault();
        // 수정페이지로 이동
        window.location.pathname = '/notice_update';
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
                            <div className="right">{공지사항.제목}</div>
                        </li>
                        <li>
                            <div className="left">조회수</div>
                            <div className="right">{공지사항.조회수}</div>  
                        </li>
                        <li>
                            <div className="left">작성일</div>
                            <div className="right">{공지사항.날짜}</div>  
                        </li>
                        <li>
                            <div className="contents">
                                {공지사항.내용}                               
                            </div>
                        </li>
                    </ul>
                    <div className="button-box">
                        <div className="left">
                            <button onClick={onClickUpdate}>수정</button>
                            <button onClick={onClickDelete}>삭제</button>
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