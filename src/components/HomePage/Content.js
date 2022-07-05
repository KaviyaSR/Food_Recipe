import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {getRandomReceipes} from './actions';
import { connect } from "react-redux";
function Content(props) {
  const {dispatch}=props
  const getReceipe =() =>{
    dispatch(getRandomReceipes());
  }
  return (
    <div className="content-homepage">
      <div> Get out of the routine</div>
      <p>
        <strong>ReceipeNity</strong> , the social network that inspires your
        menus <br /> and revolutionizes your shopping.
      </p>
      <Link to="/receipes">
        <Button
          className="content-button"
          shape="round"
          size="large"
          onClick={getReceipe}
          icon={<ArrowRightOutlined />}
        >
          Get Receipes
        </Button>
      </Link>
    </div>
  );
}

export default connect(({ randomReceipes}) => ({
  randomReceipes
}))(Content);
