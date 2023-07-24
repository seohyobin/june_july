import React from 'react';
import NoticeLeftNavComponent from './NoticeLeftNavComponent';
import NoticeRightListComponent from './NoticeRightListComponent';
import './scss/notice.scss';
import { GlobalContext } from '../../../context/GlobalContext';
import axios from 'axios'; 

export default function NoticeComponent(){
    //관리자 로그인 했을때 로그인 화면 글쓰기 가능하다.
    const {isAdmin}=React.useContext(GlobalContext);
    const [state, setState] =React.useState({
        notice:[]
    })

        React.useEffect(()=>{
            axios({ 
                url:'./data/notice_page/board.json',
                method:'GET'
            })
            .then((res)=>{
                if(res.status===200){
                    setState({
                        ...state,
                        notice:res.data.notice
                    })
                    console.log(res);
                    console.log(res.data);
                 }
            })
            .catch((err)=>{
                console.log(`err ${err}`);
            })
        },[])



    const onClickWrite=(e)=>{
        e.preventDefault();
        window.location.pathname='/notice_write'
    }

    return (
        <div id='notice'>
            <div id="container">
                <NoticeLeftNavComponent/>
                <NoticeRightListComponent notice={state.notice}/>
                

            </div>
            {isAdmin&&

                <div className="button-box">
                    <button onClick={onClickWrite}>글쓰기</button>
                </div>

                }
        </div>
    );
};

