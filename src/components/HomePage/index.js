import React from 'react';
import { Layout } from 'antd';
import NavBar from './NavBar'
import Content from './Content'



function HomePage (){

    return (

        <section className='container'>
         
<NavBar/>
<Content/>
        </section>



    )

}


export default HomePage;