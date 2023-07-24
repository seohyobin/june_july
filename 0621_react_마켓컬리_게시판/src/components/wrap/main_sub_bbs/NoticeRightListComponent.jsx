import React from 'react';
import { Link } from 'react-router-dom';


export default function NoticeRightListComponent({notice}){

    const [list, setList] =React.useState(5); //한 화면에 보여질 목록 수
    const [pageNumber, setPageNumber] =React.useState(1); //페이지 번호
    const [groupPage, setGroupPage] =React.useState(5); //그룹 번호 그룹1(1~5) 그룹2(6~10) 그룹3(11~15) 그룹4(16~20)
    const [cnt,setCnt]=React.useState(1); //페이지번호 그룸의 카운트!!

    const [startNum,setStartNum] = React.useState((cnt-1)*groupPage);
    const [endNum,setEndNum] = React.useState(startNum+groupPage );



    //페이지번호 클릭 이벤트
    const onClickPageNum=(e,num)=>{
        e.preventDefault();
        setPageNumber(num);
    }

    //다음 그룹 페이지 클릭 카운트
    const onClickNextGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }

    //이전 그룹 페이지 클릭 카운트
    const onClickprevGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    //그룹 시작번호 설정 =>cnt , groupPage 값 변경이 있거나 설정되었다면 시작번호 설정 실행
    React.useEffect(()=>{
        setStartNum((cnt-1)*groupPage);
    },[cnt,groupPage]);

    //그룹 끝번호 설정
    React.useEffect(()=>{
        setEndNum(startNum+groupPage); //on이벤트
        setPageNumber(startNum+1);
    },[startNum,groupPage]);


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
                            notice.map((item,idx)=>{
                                if(Math.ceil((idx+1)/list) === pageNumber){ //클릭 버튼 번호 전달 1(100~86) , 2(85~70)
                                    return(
                                        <dd key={item.NO}>
                                            <Link to={`/notice_view?listNum=${item.NO}`}>  {/* 글보기 페이지 */}
                                                <span>{item.NO}</span>
                                                <span>{item.제목}</span> 
                                                <span>컬리</span>
                                                <span>{item.날짜}</span>
                                            </Link>
                                        </dd>
                                    )
                                }
                            })
                        }
                    </dl>


                    <div className="page-button-box">
                        {cnt>1 && <a href='#!'className='prev-btn' onClick={onClickprevGroup}>&lt;</a>}                        
                        {   
                                (()=>{

                                    let arr = [] //페이지번호와 a태그 모드 저장된 배열변수
                            
                                    for(let i=startNum; i<endNum; i++){
                                        if(i<Math.round(notice.length/list)){
                                            arr= [...arr, <a  key={i} data-key={`num${i}`} href='!#' className={pageNumber === (i+1) ? 'on' :''} onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a>]
                                        }
                                        //arr.push( <a onClick={(e)=>onClickPageNum(e, (i+1))} href='!#'>{i+1}</a>); 
                                        //push도 가능!!!이것도 가능 하지만 상태변수의 배열을 변경하려면 정규표현식써 이거는 쓰지마!!!
                                    }

                                    return arr;

                                })()
                        }
                        {cnt < notice.length/list/groupPage && <a href='#!' className='next-btn' onClick={onClickNextGroup}>&gt;</a>}                    
                    </div>
                </div>
            </div>
        </div>
    );
};

