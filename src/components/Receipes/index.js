import React,{useEffect} from 'react';
import {getRandomReceipes} from './actions';
import {Button} from 'antd';
import { connect } from 'react-redux';

function Receipes (props){
     const {dispatch,randomReceipes}=props
    // useEffect(() => {
    //     dispatch(getRandomReceipes());
    //   }, []);
   
  const get=()=>{
     dispatch(getRandomReceipes());
    console.log( randomReceipes)
  }

    return <Button onClick={get}>Hello World</Button>
}


export default connect(({ randomReceipes}) => ({
  randomReceipes
}))(Receipes);