import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

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
                                        <dd key={item.번호}>
                                                <span>{item.번호}</span>
                                                {/* 
                                                    searchParams() 활용! 
                                                    1.파라미터를 링크 태그에 직접 설정한다. 키=키값&키=키값
                                                    2.선언
                                                       import {useSearchParams} from 'react-router-dom';
                                                    3.변수 훅 사용
                                                        const  번호 = param.get('번호');
                                                        const  제목 = param.get('제목');
                                                        const  내용 = param.get('내용');
                                                        const  작성자 = param.get('작성자');    
                                                        const  작성일 = param.get('작성일');
                                                */}
                                                <Link to={`/notice_view?listNum=${item.번호}$제목=${item.제목}$내용=${item.내용}$작성자${item.작성자}&작성일${item.작성일}`}>  {/*쿼리스트링=> 파라미터 => 글보기 페이지 */}
                                                    <span>{item.제목}</span> 
                                                </Link>
                                                {/*
                                                    useLocation() 활용! 글 목록을 클릭해서 버튼이벤트 작성 후 리턴문 위에서 코딩하는 경우 
                                                    
                                                    1.선언
                                                        import {useLocation} from 'react-router-dom';
                                                    2.파라미터 값 state 설정
                                                        navigate('/idSearchResult', {state: {아이디: result.아이디, 가입일: result.가입일}});
                                                    3.훅 선언하고 변수 사용
                                                        useLocation() 글목록을 클릭해서 버튼이벤트 작성후 리턴문 위에서 코딩하는 경우
                                                        const location = useLocation(); 훅 Hook
                                                    4.변수 속성 이용 바인딩
                                                        location.state.아이디  바인딩binding       
                                                    
                                                    navigate('/idSearchResult', {state: {아이디: result.아이디, 가입일: result.가입일}}); 
                                                 */}
                                                <span>{item.작성자}</span>
                                                <span>{item.작성일}</span>
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

