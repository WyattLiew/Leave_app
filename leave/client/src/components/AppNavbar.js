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
    constructor() {
        super();
        this.state = {
            isHidden:true,
            isUser:false,
            isAdmin:false,
            isOpen: false,

            userStatus:[]
        }

        this.toggle = this.toggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
      }

      componentDidMount() {
       this.getUserStatus();
      }

      handleLogout() {
        this.getLogout();
      }

    loadingStatus() {
        this.state.userStatus.map(status => 
            this.setState({
                isUser:status.isUser,      
                isAdmin:status.isAdmin        
        },()=>{this.checkUserStatus(this.state.isUser,this.state.isAdmin)}));
    }

    checkUserStatus(isUser,isAdmin) {
        if(!isAdmin && isUser){
        this.setState({isHidden:false});
        }else if(isUser && isAdmin){
            this.setState({isHidden:true});
        }else{
            //this.getLogout();
            //this.setState({isHidden:true,isUser:false,isAdmin:false});
            //window.location.href="/";
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
            .then(response => response.json())
            .then(response => this.setState({ userStatus: response.data},()=>{
                this.loadingStatus();
            })).catch(err=>console.error(err));
        }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }


render() {
    return (
        <div>
            <Navbar style={{backgroundColor:'#262626'}} dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="#">Helios Distribution</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/MainDashboard" style={{color:'white'}} hidden={this.state.isHidden}>Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/LeavePage" style={{color:'white'}} hidden={this.state.isHidden}>Leaves</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar hidden={this.state.isHidden}>
                                <DropdownToggle nav caret style={{color:'white'}}>Profile</DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem header>Personal</DropdownItem>
                                <DropdownItem href="/HistoryPage">History</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleLogout}>Signout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="/" style={{color:'white'}} hidden={this.state.isUser ? true : false}>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/" onClick={this.handleLogout} style={{color:'white'}} hidden={this.state.isAdmin ? false: true}>Signout</NavLink>
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