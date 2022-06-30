import React from 'react';
import {
  ArrowRightOutlined
} from '@ant-design/icons';
import{Button} from 'antd';
function Content (){

    return (

      <div className='content-homepage'>
       <div>  Get out of the routine</div>

         <p>
          <strong>ReceipeNity</strong> , the social network that inspires your
           menus and revolutionizes your shopping.
         </p>
         <Button
         className="content-button"
         shape="round"
         size='large'
         icon={<ArrowRightOutlined />}
         >
           Get Receipes
           </Button>
      </div>


    )

}


export default Content;