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
        className="px-5"        //here in px, x is x-axis (Left, Right)
            >
          <NavbarBrand href="/">GamePatty</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>

                {/* Home */}
              <NavItem>
                <NavLink tag={ReactLink} to={"/"}>Home</NavLink>
              </NavItem>

                {/* About */}
              <NavItem>
                <NavLink tag={ReactLink} to={"/about"}>About</NavLink>
              </NavItem>

                {/* Services */}
              <NavItem>
                <NavLink tag={ReactLink} to={"/services"}>Services</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Instagram</DropdownItem>
                  <DropdownItem>Facebook</DropdownItem>
                  <DropdownItem divider />  {/*use divider for line in dropdown box*/}
                  <DropdownItem>Contact Us</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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