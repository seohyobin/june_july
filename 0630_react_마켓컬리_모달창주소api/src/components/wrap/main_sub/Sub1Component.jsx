import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Sub1ComponentChild from './Sub1ComponentChild';
import './scss/sub1.scss';
import { useRef } from 'react';
import { LocalStorageContext } from '../../../context/LocalStorageContext';



export default function Sub1Component({setViewProduct}){
    const {setViewProducts}=React.useContext(LocalStorageContext);
    const [state,setState]= React.useState({
        신상품:[]
    });
    
    const [filter,setFilter]=React.useState([]);
    const onChangeFilter=(e)=>{
        if(e.target.checked===true){
            setFilter([...filter,e.target.value]);
        }
        else{
            setFilter([filter.filter((item)=>item !==e.target.value)]);

        }
    }   

    //신상품 가져오기
    const getNewProduct=()=>{
        axios({
            url:'./data/sub_page/product.json',
            method:'GET'
        })
        .then((res)=>{
            // console.log(res.data);
            // console.log(res.data.신상품);
            setState({
                ...state,
                신상품:res.data.신상품
            })
        })
        .catch((err)=>{
            console.log("err!!!!!!!!!!!!!!!!!!!",err);
        });
    }
    React.useEffect(()=>{
        getNewProduct();
    },[])

    ////////////////카테고리 아코디언 메뉴 구현///////////////////////////
    const [isClass,setIsClass]=React.useState([true,true,true,true,true]);
    const [subH,setSubH]=React.useState([0,0,0,0,0]);//서브메뉴 각각 높이 배열
    const subRef =React.useRef([]); //상태관리랑 비슷!! 배열은[]  current에 배열처리해!!
    
    //로딩시 서브메뉴 높이를 설정!!
    React.useEffect(()=>{
        subH.map((item, i)=>{
            subH[i] = subRef.current[i].offsetHeight;  // 서브메뉴 각각의 높이 설정값
        })
    },[]);


    // 카테고리 버튼 클릭 이벤트 5개 아코디언 구현
    const onClickCategory=(e, n)=>{
        e.preventDefault();
        if(isClass[n] === true){
            isClass[n] = false;
            subRef.current[n].style.height = `0px`;
        }
        else{
            isClass[n] = true;
            subRef.current[n].style.height = `${subH[n]}px`;
        }
        setIsClass([...isClass]);
    } 

    React.useEffect(()=>{
        //카테고리 클릭 이벤트 : 토글 기능
        //아코디언 메뉴
        // $('.category-btn').on({
        //     click(e){
        //         e.preventDefault();
        //         $(this).next().stop().slideToggle(); //여러번 누르면  버블링 발생 막아->.stop()

        //         $(this).toggleClass('on');

        //     }
        // });
        
    },[]);
    /////////////정렬!! 
    const onClickOrder=(e,value)=>{
        e.preventDefault();
        if(value === '추천순'){ ///추천순 오름차순
            setState({
                신상품:[...state.신상품.sort((a,b)=> (a.추천< b.추천) ? (-1) : ((a.추천> b.추천) ? (1) : (0)))]      //b.속성이름-a.속성이름 하면 내림차순  / a.속성이름-b.속성이름 오름차순       
            })
        }
        else if(value === '신상품순'){
            setState({
                신상품:[...state.신상품.sort((a,b)=> (a.제품코드< b.제품코드) ? (-1) : ((a.제품코드> b.제품코드) ? (1) : (0)))]      //b.속성이름-a.속성이름 하면 내림차순  / a.속성이름-b.속성이름 오름차순       
            })
        }
        else if(value === '판매처순'){
            setState({
                신상품:[...state.신상품.sort((a,b)=> (b.판매처< a.판매처) ? (-1) : ((b.판매처> a.판매처) ? (1) : (0)))]      //b.속성이름-a.속성이름 하면 내림차순  / a.속성이름-b.속성이름 오름차순       
            })
        }
        else if(value === '혜택순'){ //할인율이 높은거 먼저!! 내림차순
            setState({
                신상품:[...state.신상품.sort((a,b)=>b.할인율-a.할인율)]      //b.속성이름-a.속성이름 하면 내림차순  / a.속성이름-b.속성이름 오름차순       
            })
        }
        else if(value === '낮은가격순'){
            setState({
                신상품:[...state.신상품.sort((a,b)=>a.정가-b.정가)]      //b.속성이름-a.속성이름 하면 내림차순  / a.속성이름-b.속성이름 오름차순       
            })
        }
        else if(value === '높은가격순'){
            setState({
                신상품:[...state.신상품.sort((a,b)=>b.정가-a.정가)]      //b.속성이름-a.속성이름 하면 내림차순  / a.속성이름-b.속성이름 오름차순       
            })
        }
    }




    return (
        <main id='sub1'>
            <section id='section1'>
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <a href="!#"><img src="./images/sub1/0HpXehniZlRXiBeSfEFpPK8rSl35tGLPMUOwNNWK.png" alt="" /></a>
                        </div>
                    </div>
                </div>
            </section>
            <section id='section2'>
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>신상품</h2>
                        </div>
                        <div className="content">
                            <div className="left">
                                <div className="left-title">
                                    <strong>필터</strong>
                                    <span>
                                        <img src="./images/sub1/icon_format.svg" alt="" />
                                         <em>초기화</em>
                                    </span>
                                </div>
                                <div className="left-content">
                                    <div>
                                        <a onClick={(e) => onClickCategory(e,0)} href="!#" className={`category-btn category1 ${isClass[0] ? ' on' : ''}`}><span>카테고리</span><img src="./images/sub1/icon_arrow_up.svg" alt="" /></a>
                                        <div ref={(el) => (subRef.current[0]=el)} className="sub">
                                            {/*  div 박스 감싸고 ul  넣어 */}
                                            <ul>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'}  onChange={onChangeFilter}/>
                                                        샐러드 간편식
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk2' id='category1Chk2' value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk3' id='category1Chk3' value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk4' id='category1Chk4' value={'면·양념·오일'} />
                                                        면·양념·오일
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk5' id='category1Chk5' value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk6' id='category1Chk6' value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk7' id='category1Chk7' value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk8' id='category1Chk8' value={'생수·음료·우유·커피'} />
                                                        생수·음료·우유·커피
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk9' id='category1Chk9' value={'베이비·키즈·완구'} />
                                                        베이비·키즈·완구
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk11' id='category1Chk11' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk12' id='category1Chk12' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={(e) => onClickCategory(e,1)} href="!#" className={`category-btn category2 ${isClass[1] ? ' on' : ''}`}><span>브랜드</span><img src="./images/sub1/icon_arrow_up.svg" alt="" /></a>
                                        <div ref={(el) => (subRef.current[1]=el)} className="sub">
                                            {/*  div 박스 감싸고 ul  넣어 */}
                                            <ul>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'면·양념·오일'} />
                                                        면·양념·오일
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={(e) => onClickCategory(e,2)} href="!#" className={`category-btn category3 ${isClass[2] ? ' on' : ''}`}><span>가격</span><img src="./images/sub1/icon_arrow_up.svg" alt="" /></a>
                                        <div ref={(el) => (subRef.current[2]=el)} className="sub">
                                            {/*  div 박스 감싸고 ul  넣어 */}
                                            <ul>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'면·양념·오일'} />
                                                        면·양념·오일
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                    </label> 
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={(e) => onClickCategory(e,3)} href="!#" className={`category-btn category4 ${isClass[3] ? ' on' : ''}`}><span>혜택</span><img src="./images/sub1/icon_arrow_up.svg" alt="" /></a>
                                        <div ref={(el) => (subRef.current[3]=el)} className="sub">
                                            {/*  div 박스 감싸고 ul  넣어 */}
                                            <ul>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'면·양념·오일'} />
                                                        면·양념·오일
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                    </label> 
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={(e )=> onClickCategory(e,4)} href="!#" className={`category-btn category5 ${isClass[4] ? ' on' : ''}`}><span>유형</span><img src="./images/sub1/icon_arrow_up.svg" alt="" /></a>
                                        <div ref={(el) => (subRef.current[4]=el)} className="sub">
                                            {/*  div 박스 감싸고 ul  넣어 */}
                                            <ul>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'면·양념·오일'} />
                                                        면·양념·오일
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                    </label> 
                                                </li>
                                                <li>
                                                    <label htmlFor="category1Chk1">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                    </label> 
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="right-title">
                                    <strong>총 215건</strong>
                                    <span>
                                      <a href="!#" onClick={(e)=>onClickOrder(e,'추천순')} className='order-btn'><span>추천순</span> <img src="./images/sub1/icon_question.svg" alt="" /></a>
                                      <i>|</i>
                                      <a href="!#" onClick={(e)=>onClickOrder(e,'신상품순')} className='order-btn on'>신상품순</a>
                                      <i>|</i>
                                      <a href="!#" onClick={(e)=>onClickOrder(e,'판매처순')} className='order-btn'>판매처순</a>
                                      <i>|</i>
                                      <a href="!#" onClick={(e)=>onClickOrder(e,'혜택순')} className='order-btn'>혜택순</a>
                                      <i>|</i>
                                      <a href="!#" onClick={(e)=>onClickOrder(e,'낮은가격순')} className='order-btn'>낮은 가격순</a>
                                      <i>|</i>
                                      <a href="!#" onClick={(e)=>onClickOrder(e,'높은가격순')} className='order-btn'>높은 가격순</a>
                                    </span>
                                </div>
                                <div className="right-content">
                                    {/* state.신상품 => 하위 컴포넌트 프롭스로 데이터 내려주기 */}
                                    <Sub1ComponentChild 신상품={state.신상품} setViewProduct={setViewProduct}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

