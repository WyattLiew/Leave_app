import React, { Component } from 'react';
import * as moment from 'moment';
import SimpleReactValidator from 'simple-react-validator';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdCreate } from "react-icons/io";

import {
    Table,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';


class AdminPageTable extends Component {
  

    constructor() {
        super();
        this.state = {
          showError:0,
          modal: false,
          employee:[],

          //Edit employee
          individualEmployee:[],
          editId:'',
          editName:'',
          editEmail:'',
          editMobile:'',
          editDepartment:'',
          editDateJoined:null,
          editIsAdmin:'',
          editIsManagement:''
        }
        this.validator = new SimpleReactValidator();

        this.editToggle = this.editToggle.bind(this);
        this.cancelToggle = this.cancelToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.handleChangeCheckAdmin = this.handleChangeCheckAdmin.bind(this);
        this.handleChangeCheckManagement = this.handleChangeCheckManagement.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
      }
    
      componentDidMount() {
        this.getEmployee();
      }

    // Apply leave button toggle
    editToggle() {
      this.setState({
        showError:0,
        editName:'',
        editEmail:'',
        editMobile:'',
        editDepartment:'',
        editDateJoined:'',
        editIsAdmin:null,
        editIsManagement:null
      })
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
  }

// Admin check handler
handleChangeCheckAdmin = () => {
  console.log("1"+this.state.editIsAdmin);
  this.setState({
      editIsAdmin: !this.state.editIsAdmin,
  },()=> console.log(this.state.editIsAdmin));
}

// Management check handler
handleChangeCheckManagement = () => {
    this.setState({
        editIsManagement: !this.state.editIsManagement,
    });
}

// Name handler
handleChangeName(event) {
    this.setState({
        editName: event.target.value
    });
}

// Email handler
handleChangeEmail(event) {
    this.setState({
        editEmail: event.target.value
    });
}
// Mobile handler
handleChangeMobile(event) {
    this.setState({
        editMobile: event.target.value
    });
}

 // Department handler
 handleChangeDepartment(event) {
  this.setState({
      editDepartment: event.target.value.toUpperCase()
  });
}

// Submit handler
handleSubmit(event) {
  this.setState({
      showError:1
  });
  if (this.validator.allValid()) {
          var data = {
              id: this.state.editId,
              name: this.state.editName,
              email:this.state.editEmail,
              mobile:this.state.editMobile,
              department:this.state.editDepartment,
              isAdmin:this.state.editIsAdmin,
              isManagement:this.state.editIsManagement
          };
          fetch('/modified_employee_details',{
              method:'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data)
          }); 
          alert('You submitted the form and stuff!');
    } else {
      event.preventDefault();
      this.validator.showMessages();
      alert('Please check your details.');
      // rerender to show messages for the first time
      this.forceUpdate();
    }  
}

// Delete employee data
cancelToggle(key) {

  fetch(`/api/delete_individual_employee_data/${key}`,{
      method: 'DELETE'
  });
  window.location.reload();
}

/**
 * 
 *  [API function] below
 */

  //Get details
  getDetails(id){
    this.getIndividualEmployee(id);
  }

  // fire GET individual details
  getIndividualDetials = _ =>{
    this.state.individualEmployee.map(emp => 
      this.setState({
        editId:emp.id,
        editName:emp.employee_name.split(' ').join(''),
        editEmail:emp.employee_email,
        editMobile:emp.employee_mobile,
        editDepartment:emp.employee_dept,
        editDateJoined:emp.employee_date_hired,
        editIsAdmin:emp.isadmin,
        editIsManagement:emp.ismanagement
      })
    )
  }

  /**
   * 
   *   API below
   */

  // get all Employee
  getEmployee = _ => {
    fetch('/api/get_all_employee')
      .then(response => response.json())
      // .then(({data})=>{
      //   console.log(data);
      // })
      .then(response => this.setState({ employee: response.data}))
      .catch(err=>console.error(err));
  }

  // get individual Employee
  getIndividualEmployee = (employeeID) => {
    fetch(`/api/get_individual_employee/${employeeID}`)
      .then(response => response.json())
      // .then(({data})=>{
      //   console.log(data);
      // })
      .then(response => this.setState({ individualEmployee: response.data},()=>{
        this.getIndividualDetials();
      })).catch(err=>console.error(err));
  }
            

render() {
    return (
      <div>
        <Table className="leave_table" responsive>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Department</th>
                    <th>Date Hired</th>
                    <th>Role</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
                </thead>
                {this.state.employee.map(emp =>  
                
                <tbody key={emp.id} id={emp.id}>
                <tr>
                    <td>{emp.id}</td>
                    <td>{emp.employee_name}</td>
                    <td>{emp.employee_email}</td>
                    <td>{emp.employee_mobile}</td>
                    <td>{emp.employee_dept}</td>
                    <td>{moment(emp.employee_date_hired).format("LL")}</td>
                    <td>{emp.isadmin ? "Admin" : "User"}</td>
                    <td>{emp.ismanagement ? "Management" : "Employee" }</td>
                    <td><Row>
                      <Col  ><Button color="link" style={{color:"chartreuse"}}id={emp.id} onClick={()=>{(this.editToggle)(this.getDetails(emp.id))}}><IoMdCreate /></Button></Col>
                      <Col ><Button color="link" style={{color:"red"}}id={emp.id} onClick={() => {if(window.confirm('Delete this employee?')){this.cancelToggle(emp.id)};}}><FaTrashAlt /></Button></Col>                      
                      </Row></td>
                </tr>
                </tbody>
                )}
            </Table>
            
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader toggle={this.toggle} charCode="Y">Edit</ModalHeader>
                <ModalBody>
                {/** Error Message Here */}
                <FormGroup row hidden={this.state.showError===1 ? false : true}>
                    <Label for="name" sm={4}></Label>
                    <Col className="warning_text" sm={8}>{this.validator.message('name', this.state.editName, 'required|alpha')}</Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="name" sm={4}>Name</Label>
                    <Col sm={8}>
                        <Input type="text" name="name" placeholder="Name" onChange={this.handleChangeName} defaultValue={this.state.editName}  />   
                    </Col>
                </FormGroup>
                {/** Error Message Here */}
                <FormGroup row hidden={this.state.showError===1 ? false : true}>
                    <Label for="email" sm={4}></Label>
                    <Col className="warning_text" sm={8}>{this.validator.message('email', this.state.editEmail, 'required|email')}</Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input type="email" name="email" placeholder="Email" onChange={this.handleChangeEmail} defaultValue={this.state.editEmail} />   
                    </Col>
                </FormGroup>
                {/** Error Message Here */}
                <FormGroup row hidden={this.state.showError===1 ? false : true}>
                    <Label for="mobile" sm={4}></Label>
                    <Col className="warning_text" sm={8}>{this.validator.message('mobile', this.state.editMobile, 'required|phone')}</Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="mobile" sm={4}>Mobile</Label>
                    <Col sm={8}>
                        <Input type="number" name="mobile" placeholder="Contact number" onChange={this.handleChangeMobile} defaultValue={this.state.editMobile} />   
                    </Col>
                </FormGroup>
                {/** Error Message Here */}
                <FormGroup row hidden={this.state.showError===1 ? false : true}>
                    <Label for="department" sm={4}></Label>
                    <Col className="warning_text" sm={8}>{this.validator.message('department', this.state.editDepartment, 'required|alpha')}</Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="department" sm={4}>Department</Label>
                    <Col sm={8}>
                        <Input type="text" name="department" placeholder="Department .." onChange={this.handleChangeDepartment} defaultValue={this.state.editDepartment} />   
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="dateJoined" sm={4}>Date Joined</Label>
                    <Col sm={8}>
                    <Input
                        type="date"
                        name="dateHired"
                        id="dateJoined"
                        value={moment(this.state.editDateJoined).format('YYYY-MM-DD')}
                        readOnly
                    />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="isAdmin" sm={4}></Label>
                    <Col sm={{ size: 8 }}>
                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" id="isAdmin" checked={this.state.editIsAdmin || ''} onChange={this.handleChangeCheckAdmin} />{' '}
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
                            <Input type="checkbox" id="isManagement" checked={this.state.editIsManagement || ''} onChange={this.handleChangeCheckManagement} />{' '}
                            Is Management?
                        </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
                <Input type="text" name="id" value={this.state.id} readOnly hidden/>
            
                </ModalBody>
                <ModalFooter>
                    <Input type="submit" className="btn btn-primary" value="Save"/>{' '}
                    <Button color="secondary" onClick={this.editToggle}>Cancel</Button>
                </ModalFooter>
                </Form>
            </Modal>
          </div>
    );
}
}




export default AdminPageTable;