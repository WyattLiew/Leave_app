    import React, { Component } from 'react';
    import SimpleReactValidator from 'simple-react-validator';
    import { IoIosAddCircleOutline } from "react-icons/io";
    import {
        TabContent, TabPane, Nav, NavItem, NavLink,Row,
        Container,
        Form,
        FormGroup,
        Label,
        Col,
        Button,
        Input,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter
    } from 'reactstrap';

    import EmployeeList from './AdminPageTable';
    import EmployeeLeave from './AdminPageLeave';

    class AdminPage extends Component {

        constructor(props) {
            super(props);
            this.state = {
            activeTab: '1',
            isAdmin:false,
            modal: false,
            showError:0,
            isAdminChecked: false,
            isManagementChecked: false,
            dateHired:'',
            name:'',
            email:'',
            mobile:'',
            department:'',
            password:'',
            password2:''
            }
            this.validator = new SimpleReactValidator();

            this.tabToggle = this.tabToggle.bind(this);

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChangeJoinDate = this.handleChangeJoinDate.bind(this);
            this.handleChangeCheckAdmin = this.handleChangeCheckAdmin.bind(this);
            this.handleChangeCheckManagement = this.handleChangeCheckManagement.bind(this);
            this.handleChangeName = this.handleChangeName.bind(this);
            this.handleChangeEmail = this.handleChangeEmail.bind(this);
            this.handleChangeMobile = this.handleChangeMobile.bind(this);
            this.handleChangePassword = this.handleChangePassword.bind(this);
            this.handleChangePassword2 = this.handleChangePassword2.bind(this);
            this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
            this.applyToggle = this.applyToggle.bind(this);
        }

        componentDidMount() {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function () {
            window.history.go(1);
            };

            this.getLoginStatus();
        }

        tabToggle(tab) {
            if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
            }
        }

        // Start date handler
        handleChangeJoinDate(event) {
            this.setState({
            dateHired: event.target.value
            });
        }

        // Admin check handler
        handleChangeCheckAdmin = () => {
            this.setState({
                isAdminChecked: !this.state.isAdminChecked,
            });//,()=> this.getDaysCount());
        }

        // Management check handler
        handleChangeCheckManagement = () => {
            this.setState({
                isManagementChecked: !this.state.isManagementChecked,
            });
        }


        // Name handler
        handleChangeName(event) {
            this.setState({
                name: event.target.value
            });
        }

        // Email handler
        handleChangeEmail(event) {
            this.setState({
                email: event.target.value
            });
        }
        // Mobile handler
        handleChangeMobile(event) {
            this.setState({
                mobile: event.target.value
            });
        }
        // Password handler
        handleChangePassword(event) {
            this.setState({
                password: event.target.value
            });
        }
        // Password 2 handler
        handleChangePassword2(event) {
            this.setState({
                password2: event.target.value
            });
        }
        // Department handler
        handleChangeDepartment(event) {
            this.setState({
                department: event.target.value.toUpperCase()
            });
        }

        // Apply leave button toggle
        applyToggle() {
            this.setState({
            showError:0,
            isAdminChecked: false,
            isManagementChecked: false,
            dateHired:'',
            name:'',
            email:'',
            mobile:'',
            department:'',
            password:'',
            password2:''

            });
            this.setState(prevState => ({
            modal: !prevState.modal
            }));
            this.validator.hideMessages();
        }


        // Submit handler
        handleSubmit(event) {
            this.setState({
                showError:1
            });
            if (this.validator.allValid()) {
                if(this.state.password === this.state.password2){
                    var data = {
                        name: this.state.name,
                        email:this.state.email,
                        mobile:this.state.mobile,
                        department:this.state.department,
                        password:this.state.password,
                        password2:this.state.password2,
                        dateHired:this.state.dateHired,
                        isAdmin:this.state.isAdminChecked,
                        isManagement:this.state.isManagementChecked
                    };
                    fetch('/register',{
                        method:'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    }); 
                    alert('You submitted the form and stuff!');

                }else{
                event.preventDefault();
                alert('password doesn\'t match');
                }
            } else {
                event.preventDefault();
                this.validator.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }  
        }

        // Check Login status
        getLoginStatus = _ => {
            fetch(`/api/get_account_valification_admin`)
            .then(response => {
                if(response.ok && window){
                    window.location.href="/";
                }
                })
            .catch(err=>console.error(err));
        }

        
    render() {
        return (
        <Container>
                <Nav tabs>
            <NavItem>
                <NavLink
                active ={ this.state.activeTab === '1'}
                onClick={() => { this.tabToggle('1'); }}
                >
                Employee Lists
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                active={ this.state.activeTab === '2' }
                onClick={() => { this.tabToggle('2'); }}
                >
                Leave Management
                </NavLink>
            </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <Row>
                <Col sm="12">
                <div>
                <h2 className="leave_table_h2" style={{marginTop:'30px'}}><Button color="primary" onClick={this.applyToggle}><IoIosAddCircleOutline style={{fontSize:'x-large'}}/> Create New Employee</Button>  Employee Lists</h2>
                    <h5 style={{color:'#4afb4a'}}>**Click on Leave Management for more details. </h5>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={this.toggle} >New Employee</ModalHeader>
                        <ModalBody>
                        {/** Error Message Here */}
                        <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <Label for="name" sm={4}></Label>
                        <Col className="warning_text" sm={8}>{this.validator.message('name', this.state.name, 'required|alpha')}</Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={4}>Name</Label>
                            <Col sm={8}>
                                <Input type="text" name="name" placeholder="Name" onChange={this.handleChangeName} />   
                            </Col>
                        </FormGroup>
                        {/** Error Message Here */}
                        <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <Label for="email" sm={4}></Label>
                        <Col className="warning_text" sm={8}>{this.validator.message('email', this.state.email, 'required|email')}</Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={4}>Email</Label>
                            <Col sm={8}>
                                <Input type="email" name="email" placeholder="Email" onChange={this.handleChangeEmail} />   
                            </Col>
                        </FormGroup>
                        {/** Error Message Here */}
                        <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <Label for="password" sm={4}></Label>
                        <Col className="warning_text" sm={8}>{this.validator.message('password', this.state.password, 'required|min:6')}</Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={4}>Passowrd</Label>
                            <Col sm={8}>
                                <Input type="password" name="password" placeholder="*********" onChange={this.handleChangePassword} autoComplete="off" />   
                            </Col>
                        </FormGroup>
                        {/** Error Message Here */}
                        <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <Label for="password2" sm={4}></Label>
                        <Col className="warning_text" sm={8}>{this.validator.message('password2', this.state.password2, 'required|min:6')}</Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password2" sm={4}>Confirm Password</Label>
                            <Col sm={8}>
                                <Input type="password" name="password2" placeholder="Confirm Password" onChange={this.handleChangePassword2} autoComplete="off"/>   
                            </Col>
                        </FormGroup>
                        {/** Error Message Here */}
                        <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <Label for="mobile" sm={4}></Label>
                        <Col className="warning_text" sm={8}>{this.validator.message('mobile', this.state.mobile, 'required|phone')}</Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="mobile" sm={4}>Mobile</Label>
                            <Col sm={8}>
                                <Input type="number" name="mobile" placeholder="Contact number" onChange={this.handleChangeMobile} />   
                            </Col>
                        </FormGroup>
                        {/** Error Message Here */}
                        <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <Label for="department" sm={4}></Label>
                        <Col className="warning_text" sm={8}>{this.validator.message('department', this.state.department, 'required|alpha')}</Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="department" sm={4}>Department</Label>
                            <Col sm={8}>
                                <Input type="text" name="department" placeholder="Department .." onChange={this.handleChangeDepartment} />   
                            </Col>
                        </FormGroup>
                        {/** Error Message Here */}
                        <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <Label for="dateHired" sm={4}></Label>
                        <Col className="warning_text" sm={8}>{this.validator.message('dateHired', this.state.dateHired, 'required')}</Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="dateJoined" sm={4}>Date Joined</Label>
                            <Col sm={8}>
                            <Input
                                type="date"
                                name="dateHired"
                                id="dateJoined"
                                placeholder="date placeholder"
                                selected={this.state.dateHired}
                                onChange={this.handleChangeJoinDate}
                            />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="isAdmin" sm={4}></Label>
                            <Col sm={{ size: 8 }}>
                                <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="isAdmin" checked={this.state.isAdminChecked} onChange={this.handleChangeCheckAdmin} />{' '}
                                    Is Admin?
                                </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="isManagement" sm={4}></Label>
                            <Col sm={{ size: 8 }}>
                                <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="isManagement" checked={this.state.isManagementChecked} onChange={this.handleChangeCheckManagement} />{' '}
                                    Is Management?
                                </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}></Label>
                            <Col sm={8}>
                                <p style={{color:'red'}}>{this.state.msgWrongYear}</p>
                            </Col>
                        </FormGroup>
                    
                        </ModalBody>
                        <ModalFooter>
                            <Input type="submit" className="btn btn-primary" value="Create"/>{' '}
                            <Button color="secondary" onClick={this.applyToggle}>Cancel</Button>
                        </ModalFooter>
                        </Form>
                    </Modal>
        </div>
        <EmployeeList />
                </Col>
                </Row>
            </TabPane>
            <TabPane tabId="2">
                <Row>
                <Col sm="12">
                <h2 className="leave_table_h2" style={{marginTop:'30px'}}>Leave Management</h2>
                <h5 style={{color:'#4afb4a'}}>**Please add entitlements for each user. </h5>
                <EmployeeLeave/>
                </Col>
                </Row>
            </TabPane>
            </TabContent>
        </Container>
        );
    }
    }




    export default AdminPage;

