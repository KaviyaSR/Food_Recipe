import React from "react";
import { Menu, Icon } from "antd";
import { blob } from "d3-fetch";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function NavBar() {
  return (
    <>
    <div className="nav-bar">
   

  <ul className="nav-type">
  {/* <li style ={{float:'left'}}>
        Foodie Pie
     </li> */}
  <li className="nav-list-type" >About</li>
   <li className="nav-list-type" >Contact</li>
  <li className="nav-list-type" >Receipe</li>
  <li className="nav-list-type" >Home</li>
</ul>
     </div>
      
    </>
  );
}

export default NavBar;
