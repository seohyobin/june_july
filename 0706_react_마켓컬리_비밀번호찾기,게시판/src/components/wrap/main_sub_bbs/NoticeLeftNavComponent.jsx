import React from 'react';
import './scss/notice_left.scss';

export default function NoticeLeftNavComponent(){
    return (
        <div id='noticeLeft'>
            <div className="container">
                <div className="title">
                    <h2>고객센터</h2>
                </div>
                <nav className='nav'>
                        <ul>
                            <li><a className='on' href="#!">공지사항</a></li>
                            <li><a href="#!">자주하는 질문</a></li>
                            <li><a href="#!">1:1 문의</a></li>
                            <li><a href="#!">대량주문 문의</a></li>
                        </ul>
                    </nav>
                    <div className="bottom">
                        <a href="!#">
                            <span>도움이 필요하신가요 ?</span><br />
                            <em>1:1 문의하기</em>
                        </a>
                    </div>
            </div>
        </div>
    );
};
