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
  Badge,
  Popover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';
import userContext from '../context/userContext';
import { doLogout } from '../auth';
import { BASE_URL } from '../services/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const CustomNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const userContextData = useContext(userContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

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

    const togglePopover = () => {
      setPopoverOpen(!popoverOpen);
    };
  
    const handleNotificationClick = () => {
      // Handle notification click, e.g., navigate to notifications page
      navigate('/notifications');
      setPopoverOpen(false); // Close the popover after clicking
    };
    

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
              {/* <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/services"}>Careers</NavLink>
              </NavItem> */}

                {/* Projects */}
              <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/projects"}>Projects</NavLink>
              </NavItem>

                {/* Contacts */}
              <NavItem className="px-4">
                <NavLink tag={ReactLink} to={"/contact"}>Contact</NavLink>
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
                            <NavItem className="px-3">
                            <NavLink >
                                ADMIN
                            </NavLink>
                            </NavItem>


                              {/* Notification Bell Icon */}
                              {/* <NavItem className="px-3">
                                <NavLink className="hand-cursor" id="bellPopover" onClick={togglePopover}>
                                <FontAwesomeIcon icon={faBell} size="lg"/> */}
                                  { /* badge for notifications count */}
                                  {/* <Badge color="danger" className="ms-1">1</Badge>
                                </NavLink> */}

                                {/* Notification Popover */}
                                {/* <Popover placement="bottom" isOpen={popoverOpen} target="bellPopover" toggle={togglePopover}>
                                  <PopoverHeader>Notifications</PopoverHeader>
                                  <PopoverBody>
                                    <p>New notification!</p>
                                    <Button color="primary" onClick={handleNotificationClick}>
                                      View
                                    </Button>
                                  </PopoverBody>
                                </Popover>
                              </NavItem> */}

                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          Add Items
                        </DropdownToggle>
                        <DropdownMenu right>

                          <DropdownItem tag={ReactLink} to={"/admin/add-tag"}>Add Tag</DropdownItem>
                          <DropdownItem tag={ReactLink} to={"/admin/add-category"} >Add Category</DropdownItem>
                          {/* <DropdownItem divider /> */}
                          <DropdownItem tag={ReactLink} to={"/admin/add-clients"} >Add Client</DropdownItem>
                          <DropdownItem tag={ReactLink} to={"/admin/dashboard"}>Add Game</DropdownItem>
                          <DropdownItem tag={ReactLink} to={"/admin/messages"}>Messages</DropdownItem>

                        </DropdownMenu>
                      </UncontrolledDropdown>

                        {/* Logout */}
                            <NavItem className="px-3">
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