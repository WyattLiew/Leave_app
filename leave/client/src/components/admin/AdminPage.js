import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {
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

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        this.getLoginStatus();
        
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
            department: event.target.value
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
        fetch(`/api/get_account_valification`)
          .then(response => {
              if(response.ok && window){
                window.location.href="/login";
              }
            })
          .catch(err=>console.error(err));
    }
    
render() {
    return (
       <Container>
            <div>
            <h2><Button color="dark" onClick={this.applyToggle}>Create New</Button>  Employee Lists</h2>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <Form onSubmit={this.handleSubmit}>
                    <ModalHeader toggle={this.toggle} charCode="Y">New Employee</ModalHeader>
                    <ModalBody>
                    {/** Error Message Here */}
                    <FormGroup row hidden={this.state.showError===1 ? false : true}>
                    <Label for="name" sm={4}></Label>
                    <Col sm={8}>{this.validator.message('name', this.state.name, 'required|alpha')}</Col>
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
                    <Col sm={8}>{this.validator.message('email', this.state.email, 'required|email')}</Col>
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
                    <Col sm={8}>{this.validator.message('password', this.state.password, 'required|min:6')}</Col>
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
                    <Col sm={8}>{this.validator.message('password2', this.state.password2, 'required|min:6')}</Col>
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
                    <Col sm={8}>{this.validator.message('mobile', this.state.mobile, 'required|phone')}</Col>
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
                    <Col sm={8}>{this.validator.message('department', this.state.department, 'required|alpha')}</Col>
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
                    <Col sm={8}>{this.validator.message('dateHired', this.state.dateHired, 'required')}</Col>
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
       </Container>
    );
}
}




export default AdminPage;