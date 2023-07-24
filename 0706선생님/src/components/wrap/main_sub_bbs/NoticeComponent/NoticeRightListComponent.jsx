import React from "react";
import {Link} from 'react-router-dom';

export default function NoticeRightListComponent({notice}) {
    
    const [list] = React.useState(6);  // 한화면에 보여질 목록개수
    const [pageNumber, setPageNumber] = React.useState(1); // 페이지번호
    const [groupPage] = React.useState(7); // 페이지번호 그룹1(1(1~5) 그룹2(6!~10) 그룹3(11~15) 그룹4(16~20))
    const [cnt, setCnt] = React.useState(1); // 페이지번호 그룹 1

    const [startNum, setStartNum] = React.useState(); // 그룹 시작 번호
    const [endtNum, setEndtNum] = React.useState();  // 그룹 끝 번호

    //  페이지번호 클릭 이벤트
    const onClickPageNum=(e, num)=>{
        e.preventDefault();
        setPageNumber(num);
    }

    // 그룹페이지 클릭  다음카운트 이벤트
    const onClickNextGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }

    // 그룹페이지 클릭  이전카운트 이벤트
    const onClickPrevGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // 그룹 시작번호 설정 => cnt 또는 groupPage 값 변경이 있거나 설정되었다면 시작번호 설정 실행
    React.useEffect(()=>{
        setStartNum( (cnt-1)*groupPage );
    },[cnt, groupPage]);

    // 그룹 끝번호 설정
    React.useEffect(()=>{
        setEndtNum( startNum + groupPage );
    },[startNum, groupPage]);
    
    // 그룹 시작페이지 설정 => 그룹페이지 이동시 그룹의 첫페이지 설정
    React.useEffect(()=>{
        setPageNumber(startNum+1);
    },[endtNum, startNum]);

    return (
        <div id='noticeRight'>
            <div className="container">
                <div className="title">
                    <h3>공지사항<span>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</span></h3>
                </div>           
                <div className="content">
                    <dl>
                        <dt>
                            <span>번호</span>
                            <span>제목</span>
                            <span>작성자</span>
                            <span>작성일</span>
                        </dt>                        

                        {
                            notice.map((item, idx)=>{ // 100개 => 0 1 2 3 4  .. 99

                                if( Math.ceil((idx+1)/list) === pageNumber ){ // 클릭번튼 번호 전달 1(100~86) 2(85~70) 3 4 5 6 7

                                    return(
                                        
                                            <dd key={item.번호} data-key={item.번호}>
                                                <Link to={`/notice_view?listNum=${item.번호}`}>  {/* 글보기 페이지 */}
                                                    <span>{item.번호}</span>
                                                    <span>{item.제목}</span>
                                                    <span>{item.작성자}</span>
                                                    <span>{item.작성일}</span>
                                                </Link>
                                            </dd>
                                    )
                                 }
                            })        

                        }
                    </dl>

                    <div className="page-button-box">

                        { cnt > 1 && <a  href="!#"  className="prev-btn" onClick={onClickPrevGroup}>&lt;</a> }
                        {
                           (()=>{
                                let arr = [];  // 페이지번호와 a 태그 모두 저장된 배열변수
                                for(let i=startNum; i<endtNum; i++){                                    
                                    if(i<Math.ceil(notice.length/list)){ // 100/6
                                        arr = [...arr,  <a key={i} data-key={`num${i}`}  className={pageNumber===(i+1)?'on':null}  href="!#" onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a> ]
                                        // arr.push( <a href="!#" onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a> );
                                    }
                                }
                                return  arr                                                                      
                           })() 
                        }                         
                        {cnt < Math.ceil(notice.length/list/groupPage) && <a href="!#" className="next-btn"  onClick={onClickNextGroup}>&gt;</a>}

                    </div>    

                </div>
            </div>
        </div>
    );
};