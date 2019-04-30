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
            isHidden:true,
            isUser:false,
            isAdmin:false,
            isOpen: false
        };
      }

      componentDidMount() {
       this.getUserStatus();
       this.getAdminStatus();
      }

      handleLogout() {
        this.getLogout();
      }

    checkUserStatus(isUser,isAdmin) {
        if(!isAdmin && isUser){
        this.setState({isHidden:false});
        }else if(isUser && isAdmin){
            this.setState({isHidden:true});
        }else{
            this.getLogout();
            this.setState({isHidden:true,isUser:false,isAdmin:false});
            window.location.href="/";
        }
    }

    // signout app
    getLogout = _ => {
        fetch(`/logout`)
          .then(response => {
              if(response.ok && window){
                window.location.href="/";
              }
            })
          .catch(err=>console.error(err));
    }

    // Check user status for nav bar
    getUserStatus = _ => {
        fetch(`/api/check_user_status`)
          .then(response => {
              if(response){
                this.setState({isUser: true,isAdmin:false},()=>{this.checkUserStatus(this.state.isUser,this.state.isAdmin)});
              }
        }).catch(err=>console.error("Error Here: "+err));
    }

    // Check user status for nav bar
    getAdminStatus = _ => {
        fetch(`/api/check_user_status_admin`)
          .then(response => {
              if(response){
                this.setState({isUser: true,isAdmin:true},()=>{this.checkUserStatus(this.state.isUser,this.state.isAdmin)});
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
                                <NavLink href="/MainDashboard" hidden={this.state.isHidden}>Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/LeavePage" hidden={this.state.isHidden}>Leave</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar hidden={this.state.isHidden}>
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
                                <NavLink href="/"  hidden={this.state.isUser ? true : false}>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.handleLogout} hidden={this.state.isAdmin ? false: true}>Signout</NavLink>
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