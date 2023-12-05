import { MagnifyingGlass } from "phosphor-react";
import { Navbar, Button } from "keep-react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

export const Header = () => {
  const navigate = useNavigate()
  const authStatus = useSelector((state)=> state.auth.status)
  const navItems = [
    {
      name : "Home",
      slug : "",
      active : true,
  },
  {
    name : "Login",
    slug : "/login",
    active : !authStatus,
  },{
    name : "Sign Up",
    slug : "/Sign-up",
    active : !authStatus,
  },
  {
    name : "My Posts",
    slug : "/all-Blog",
    active : authStatus,
  },
  {
    name : "Make Post",
    slug : "/create-post",
    active : authStatus,
  }
]
  return (
    <Navbar fluid={true}>

      <Navbar.Container className="flex items-center justify-between overflow-x-hidden">
        <Navbar.Container className="flex items-center">
          {/* <Navbar.Divider></Navbar.Divider> */}
          <Navbar.Container
            tag="ul"
            className="lg:flex hidden items-center justify-around w-screen"
          >
            {navItems.map((item)=>
              (item.active ? (<button  key={item.name} onClick={()=> navigate(item.slug)} className="pb-10 black-400"><Navbar.Link key={item.name} />{item.name}</button> ): null )
            )}
          {authStatus ? <Logout/> : null}
          </Navbar.Container>
          <Navbar.Collapse collapseType="sidebar">
            <Navbar.Container tag="ul" className="flex flex-col gap-5">
            {navItems.map((item)=>
              (item.active ? (<button  key={item.name} onClick={()=> navigate(item.slug)} className="pb-10 black-400"><Navbar.Link key={item.name} />{item.name}</button> ): null )
            )}
            </Navbar.Container>
          </Navbar.Collapse>
        </Navbar.Container>

       
      </Navbar.Container>
    </Navbar>
  );
}
