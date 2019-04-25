import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from 'reactstrap';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            isUser:false,
            isOpen: false
        };
      }

      componentDidMount() {
       this.getUserStatus();
      }

      handleLogout() {
        this.getLogout();
      }

    getLogout = _ => {
        fetch(`/logout`)
          .then(response => {
              if(response.ok && window){
                window.location.href="/login";
              }
            })
          .catch(err=>console.error(err));
    }

    // Check user status for nav bar
    getUserStatus = _ => {
        fetch(`/api/check_user_status`)
          .then(response => {
              if(response){
                this.setState({isUser: true});
              }
        }).catch(err=>console.error("Error Here: "+err));
    }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }


render() {
    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Helios</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/" hidden={this.state.isUser ? false : true}>Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/LeavePage" hidden={this.state.isUser ? false : true}>Leave</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar hidden={this.state.isUser ? false : true}>
                                <DropdownToggle nav caret>Profile</DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem header>Personal</DropdownItem>
                                <DropdownItem href="/HistoryPage">History</DropdownItem>
                                <DropdownItem>Settings</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleLogout}>Signout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="/login"  hidden={this.state.isUser ? true : false}>Login</NavLink>
                            </NavItem>
                        </Nav>
                    
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
}


export default AppNavbar;