import React from 'react';
import axios from 'axios';
import Sub4ComponentChild from './Sub4ComponentChild';


export default function Sub4Component(){
  const [state,setState]= React.useState({
    특가혜택:[]
 });

 //특가혜택 가져오기
 const getNewProduct=()=>{
     axios({
         url:'./data/product.json',
         method:'GET'
     })
     .then((res)=>{
         // console.log(res.data);
         // console.log(res.data.특가혜택);
         setState({
             ...state,
             특가혜택:res.data.특가혜택
         })
     })
     .catch((err)=>{
         console.log("err!!!!!!!!!!!!!!!!!!!",err);
     });
 }
 React.useEffect(()=>{
     getNewProduct();
 },[])
    return (
      <main id="sub4">
        <div id="special">
            <div className="container">
                <div className="gap">
                    <div className="title hide" >
                      
                    </div>
                    <div className="content">
                        < Sub4ComponentChild 특가혜택={state.특가혜택}/>
                    </div>
                </div>
            </div>
        </div>
      </main>
      
    );
};
