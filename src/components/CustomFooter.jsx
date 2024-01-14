import  { useContext, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import userContext from '../context/userContext';
import { doLogout } from '../auth';
import { BASE_URL } from '../services/helper';

const CustomFooter = () => {

    const [isOpen, setIsOpen] = useState(false);
    const userContextData = useContext(userContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    ///Logout
    const logout = () => {

      //call from backend
      doLogout(() => {

        //logout
        setLogin(false);
        userContextData.setUser({
          data:null,
          login:false
        });

        navigate("/login");
      })
    }

    const toggle = () =>
    {
        setIsOpen(!isOpen);
    }
    

    return(
        <div>
        <Navbar
        color="dark"
        dark
        expand="md"
        fixed=""
        className="px-3"        //here in px, x is x-axis (Left, Right)
            >
        

          {/* <img className='my-2' src={BASE_URL+'/games/image/gamePattyLogo.png'} style={{maxWidth:'250px'}} /> */}
          <NavbarBrand><h6>Copyright @ 2012 - 2024 // GamePatty (PTY) LTD</h6></NavbarBrand>

            <Nav className="nav-text ms-auto" navbar>

                {/* About */}
              <NavItem className="mr-5">
                <NavLink tag={ReactLink} to={"/about"}> <h6>PRIVACY POLICY</h6> </NavLink>
              </NavItem>

                {/* About */}
              <NavItem className="mr-5">
                <NavLink >//</NavLink>
              </NavItem>
              
                {/* About */}
              <NavItem className="mr-5">
                <NavLink tag={ReactLink} to={"/about"}><h6>TERMS OF USE</h6></NavLink>
              </NavItem>

            </Nav>

        </Navbar>
      </div>
    )

}

export default CustomFooter;