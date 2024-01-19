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

const CustomNavbar = () => {

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
          

          <NavLink tag={ReactLink} to={"/"} className="d-flex align-items-center">
            <img className='my-2' src={BASE_URL+'/games/image/gamePattyLogo.png'} style={{maxWidth:'250px'}} alt="Logo" />
          </NavLink>

          {/* <img className='my-2' src={BASE_URL+'/games/image/gamePattyLogo.png'} style={{maxWidth:'250px'}} /> */}
          {/* <NavbarBrand href="/">GamePatty</NavbarBrand> */}
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="nav-text me-auto" navbar>

                {/* About */}
              <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/about"}>About</NavLink>
              </NavItem>

                {/* News */}
              <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/about"}>News</NavLink>
              </NavItem>

                {/* Careers */}
              <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/services"}>Careers</NavLink>
              </NavItem>

                {/* Projects */}
              <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/services"}>Projects</NavLink>
              </NavItem>

                {/* Contacts */}
              <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/services"}>Contact</NavLink>
              </NavItem>

              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Instagram</DropdownItem>
                  <DropdownItem>Facebook</DropdownItem>
                  <DropdownItem divider />  
                  <DropdownItem>Contact Us</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
            
            {/* Right Side navbar */}
            <Nav navbar>

                {/* If user logged in */}
                {
                    userContextData.user.login && (
                        <>
                        {/* User name */}
                            <NavItem>
                            <NavLink >
                                ADMIN
                            </NavLink>
                            </NavItem>

                        {/* Add Tag */}
                            <NavItem>
                            <NavLink tag={ReactLink} to={"/admin/add-tag"}>
                                Add Tag
                            </NavLink>
                            </NavItem>

                        {/* Add Category */}
                            <NavItem>
                            <NavLink tag={ReactLink} to={"/admin/add-category"}>
                                Add Category
                            </NavLink>
                            </NavItem>

                        {/* Add Client Testimony */}
                            <NavItem>
                            <NavLink tag={ReactLink} to={"/admin/add-clients"}>
                                Add Client
                            </NavLink>
                            </NavItem>

                        
                        {/* Add Game */}
                            <NavItem>
                            <NavLink tag={ReactLink} to={"/admin/dashboard"}>
                                Add Game
                            </NavLink>
                            </NavItem>

                        {/* Logout */}
                            <NavItem>
                                <NavLink onClick={logout}>
                                Logout
                                </NavLink>
                            </NavItem>
                        </>
                    )
                }

            </Nav>

          </Collapse>
        </Navbar>
      </div>
    )

}

export default CustomNavbar;