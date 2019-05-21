import React, { Component } from 'react';
import * as moment from 'moment';
import SimpleReactValidator from 'simple-react-validator';
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


class AdminPageLeave extends Component {


constructor() {
    super();
    this.state = {
        showError:0,
        modalLeave:false,
        modalEdit: false,
        employee:[],
        individualEmployee:[],
        editId:'',
        updatedDate:new Date(),

        // leave Details
        individualEmployeeLeaveDetails:[],

        // leave
        leave1_1:'',leave1_2:'',leave1_3:'',leave2_1:'',leave2_2:'',leave2_3:'',leave3_1:'',leave3_2:'',leave3_3:'',leave4_1:'',leave4_2:'',leave4_3:'',
        leave5_1:'',leave5_2:'',leave5_3:'',leave6_1:'',leave6_2:'',leave6_3:'',leave7_1:'',leave7_2:'',leave7_3:'',leave8_1:'',leave8_2:'',leave8_3:'',
        leave9_1:'',leave9_2:'',leave9_3:'',leave10_1:'',leave10_2:'',leave10_3:'',

        // edit leave
        individualEmployeeLeaveBalance:[]

    }
    this.validator = new SimpleReactValidator();

    this.editLeaveToggle = this.editLeaveToggle.bind(this);
    this.leaveToggle = this.leaveToggle.bind(this);
    this.handleSubmitNewLeave = this.handleSubmitNewLeave.bind(this);

    // leave 1
    this.handleChangeLeave1_1 = this.handleChangeLeave1_1.bind(this); this.handleChangeLeave1_2 = this.handleChangeLeave1_2.bind(this); this.handleChangeLeave1_3 = this.handleChangeLeave1_3.bind(this);
    // leave 2
    this.handleChangeLeave2_1 = this.handleChangeLeave2_1.bind(this); this.handleChangeLeave2_2 = this.handleChangeLeave2_2.bind(this); this.handleChangeLeave2_3 = this.handleChangeLeave2_3.bind(this);
    // leave 3
    this.handleChangeLeave3_1 = this.handleChangeLeave3_1.bind(this); this.handleChangeLeave3_2 = this.handleChangeLeave3_2.bind(this); this.handleChangeLeave3_3 = this.handleChangeLeave3_3.bind(this);
    // leave 4
    this.handleChangeLeave4_1 = this.handleChangeLeave4_1.bind(this); this.handleChangeLeave4_2 = this.handleChangeLeave4_2.bind(this); this.handleChangeLeave4_3 = this.handleChangeLeave4_3.bind(this);
    // leave 5
    this.handleChangeLeave5_1 = this.handleChangeLeave5_1.bind(this); this.handleChangeLeave5_2 = this.handleChangeLeave5_2.bind(this); this.handleChangeLeave5_3 = this.handleChangeLeave5_3.bind(this);
    // leave 6
    this.handleChangeLeave6_1 = this.handleChangeLeave6_1.bind(this); this.handleChangeLeave6_2 = this.handleChangeLeave6_2.bind(this); this.handleChangeLeave6_3 = this.handleChangeLeave6_3.bind(this);
    // leave 7
    this.handleChangeLeave7_1 = this.handleChangeLeave7_1.bind(this); this.handleChangeLeave7_2 = this.handleChangeLeave7_2.bind(this); this.handleChangeLeave7_3 = this.handleChangeLeave7_3.bind(this);
    // leave 8
    this.handleChangeLeave8_1 = this.handleChangeLeave8_1.bind(this); this.handleChangeLeave8_2 = this.handleChangeLeave8_2.bind(this); this.handleChangeLeave8_3 = this.handleChangeLeave8_3.bind(this);
    // leave 9
    this.handleChangeLeave9_1 = this.handleChangeLeave9_1.bind(this); this.handleChangeLeave9_2 = this.handleChangeLeave9_2.bind(this); this.handleChangeLeave9_3 = this.handleChangeLeave9_3.bind(this);
    // leave 10
    this.handleChangeLeave10_1 = this.handleChangeLeave10_1.bind(this); this.handleChangeLeave10_2 = this.handleChangeLeave10_2.bind(this); this.handleChangeLeave10_3 = this.handleChangeLeave10_3.bind(this);

    }

    componentDidMount() {
    this.getEmployee();
    }

// Update leave button toggle
editLeaveToggle() {
    this.setState({
    showError:0,
    leave1_1:'',
    leave1_2:'',
    leave1_3:''
    
    })
    this.setState(prevState => ({
    modalEdit: !prevState.modalEdit
    }));
}
// New leave button toggle
leaveToggle() {
this.setState({
    showError:0,
    leave1_1:'',leave1_2:'',leave1_3:'',leave2_1:'',leave2_2:'',leave2_3:'',leave3_1:'',leave3_2:'',leave3_3:'',leave4_1:'',leave4_2:'',leave4_3:'',
    leave5_1:'',leave5_2:'',leave5_3:'',leave6_1:'',leave6_2:'',leave6_3:'',leave7_1:'',leave7_2:'',leave7_3:'',leave8_1:'',leave8_2:'',leave8_3:'',
    leave9_1:'',leave9_2:'',leave9_3:'',leave10_1:'',leave10_2:'',leave10_3:''
    
})
this.setState(prevState => ({
    modalLeave: !prevState.modalLeave
}));
}



// leave1_1 handler
handleChangeLeave1_1(event) {
this.setState({
    leave1_1: event.target.value
});
}
handleChangeLeave1_2(event) {
this.setState({
    leave1_2: event.target.value
});
}
handleChangeLeave1_3(event) {
this.setState({
    leave1_3: event.target.value
});
}
// leave2_1 handler
handleChangeLeave2_1(event) {
this.setState({
    leave2_1: event.target.value
});
}
handleChangeLeave2_2(event) {
this.setState({
    leave2_2: event.target.value
});
}
handleChangeLeave2_3(event) {
this.setState({
    leave2_3: event.target.value
});
}
// leave3_1 handler
handleChangeLeave3_1(event) {
this.setState({
    leave3_1: event.target.value
});
}
handleChangeLeave3_2(event) {
this.setState({
    leave3_2: event.target.value
});
}
handleChangeLeave3_3(event) {
this.setState({
    leave3_3: event.target.value
});
}
// leave4_1 handler
handleChangeLeave4_1(event) {
this.setState({
    leave4_1: event.target.value
});
}
handleChangeLeave4_2(event) {
this.setState({
    leave4_2: event.target.value
});
}
handleChangeLeave4_3(event) {
this.setState({
    leave4_3: event.target.value
});
}
// leave5_1 handler
handleChangeLeave5_1(event) {
this.setState({
    leave5_1: event.target.value
});
}
handleChangeLeave5_2(event) {
this.setState({
    leave5_2: event.target.value
});
}
handleChangeLeave5_3(event) {
this.setState({
    leave5_3: event.target.value
});
}
// leave6_1 handler
handleChangeLeave6_1(event) {
this.setState({
    leave6_1: event.target.value
});
}
handleChangeLeave6_2(event) {
this.setState({
    leave6_2: event.target.value
});
}
handleChangeLeave6_3(event) {
this.setState({
    leave6_3: event.target.value
});
}
// leave7_1 handler
handleChangeLeave7_1(event) {
this.setState({
    leave7_1: event.target.value
});
}
handleChangeLeave7_2(event) {
this.setState({
    leave7_2: event.target.value
});
}
handleChangeLeave7_3(event) {
this.setState({
    leave7_3: event.target.value
});
}
// leave8_1 handler
handleChangeLeave8_1(event) {
this.setState({
    leave8_1: event.target.value
});
}
handleChangeLeave8_2(event) {
this.setState({
    leave8_2: event.target.value
});
}
handleChangeLeave8_3(event) {
this.setState({
    leave8_3: event.target.value
});
}
// leave9_1 handler
handleChangeLeave9_1(event) {
this.setState({
    leave9_1: event.target.value
});
}
handleChangeLeave9_2(event) {
this.setState({
    leave9_2: event.target.value
});
}
handleChangeLeave9_3(event) {
this.setState({
    leave9_3: event.target.value
});
}
// leave10_1 handler
handleChangeLeave10_1(event) {
this.setState({
    leave10_1: event.target.value
});
}
handleChangeLeave10_2(event) {
this.setState({
    leave10_2: event.target.value
});
}
handleChangeLeave10_3(event) {
this.setState({
    leave10_3: event.target.value
});
}



// Submit handler
handleSubmitNewLeave(event) {
this.setState({
    showError:1
});
if (this.validator.allValid()) {
        var data = {
            id: this.state.editId,
            year:moment(this.state.updatedDate).format("YYYY"),
            updatedDate:moment(this.state.updatedDate).format("LL"),
            leave1_1:this.state.leave1_1,leave1_2:this.state.leave1_2,leave1_3:this.state.leave1_3,
            leave2_1:this.state.leave2_1,leave2_2:this.state.leave2_2,leave2_3:this.state.leave2_3,
            leave3_1:this.state.leave3_1,leave3_2:this.state.leave3_2,leave3_3:this.state.leave3_3,
            leave4_1:this.state.leave4_1,leave4_2:this.state.leave4_2,leave4_3:this.state.leave4_3,
            leave5_1:this.state.leave5_1,leave5_2:this.state.leave5_2,leave5_3:this.state.leave5_3,
            leave6_1:this.state.leave6_1,leave6_2:this.state.leave6_2,leave6_3:this.state.leave6_3,
            leave7_1:this.state.leave7_1,leave7_2:this.state.leave7_2,leave7_3:this.state.leave7_3,
            leave8_1:this.state.leave8_1,leave8_2:this.state.leave8_2,leave8_3:this.state.leave8_3,
            leave9_1:this.state.leave9_1,leave9_2:this.state.leave9_2,leave9_3:this.state.leave9_3,
            leave10_1:this.state.leave10_1,leave10_2:this.state.leave10_2,leave10_3:this.state.leave10_3
        };
        fetch('/update_employee_new_details',{
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

/**
 * 
 *  [API function] below
 */

//Get details
getDetails(id){
this.getIndividualEmployee(id);
this.getIndividualEmployeeLeaveBalance(id);
}

// fire GET individual details
getIndividualDetials = _ =>{
this.state.individualEmployee.map(emp => 
    this.setState({
    editId:emp.id,
    // editName:emp.employee_name.split(' ').join(''),
    // editEmail:emp.employee_email,
    // editMobile:emp.employee_mobile,
    // editDepartment:emp.employee_dept,
    // editDateJoined:emp.employee_date_hired,
    //editIsAdmin:emp.isadmin,
    // editIsManagement:emp.ismanagement
    }));
}

//Get Leave details
getLeaveDetails(id){
    this.getIndividualEmployeeLeaveDetails(id);
    }



/**
 * 
 *   API below
 */

// get all Employee Details
getEmployee = _ => {
fetch('/api/get_all_employee')
    .then(response => response.json())
    // .then(({data})=>{
    //   console.log(data);
    // })
    .then(response => this.setState({ employee: response.data}))
    .catch(err=>console.error(err));
}

// get individual Employee Details
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

// get individual Employee Leave details
getIndividualEmployeeLeaveDetails = (employeeID) => {
    fetch(`/api/get_employee_all_leaves_balance/${employeeID}`)
        .then(response => response.json())
        // .then(({data})=>{
        //   console.log(data);
        // })
        .then(response => this.setState({ individualEmployeeLeaveDetails: response.data},()=>{
        this.getIndividualEmployee(employeeID);
        })).catch(err=>console.error(err));
    }

// get individual Employee leave balance
getIndividualEmployeeLeaveBalance = (employeeID) => {
    fetch(`/api/get_individual_employee_leave_balance/${employeeID}`)
        .then(response => response.json())
        // .then(({data})=>{
        //   console.log(data);
        // })
        .then(response => this.setState({ individualEmployeeLeaveBalance: response.data},()=>{
        console.log(this.state.individualEmployeeLeaveBalance)
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
                <th>Leaves</th>
                <th>Actions</th>
            </tr>
            </thead>
            {this.state.employee.map(emp =>  
            <tbody key={emp.id} id={emp.id}>
            <tr>
                <td>{emp.id}</td>
                <td>{emp.employee_name}</td>
                <td>
                <Button color="link" style={{color:"chartreuse"}}id={emp.id} onClick={()=>{(this.leaveToggle)(this.getLeaveDetails(emp.id))}} hidden={emp.isadmin ? true : false}><IoMdCreate /></Button>
                </td>
                <td><Row>
                    <Col  ><Button color="link" style={{color:"chartreuse"}}id={emp.id} onClick={()=>{(this.editLeaveToggle)(this.getDetails(emp.id))}} hidden={emp.isadmin ? true : false}><IoMdCreate /></Button></Col>                      
                    </Row></td>
            </tr>
            </tbody>
            )}
        </Table>
        
        <Modal isOpen={this.state.modalLeave} toggle={this.toggle} className={this.props.className}>
        {this.state.individualEmployeeLeaveDetails.length===0 ? 
        <Form onSubmit={this.handleSubmitNewLeave}>
            <ModalHeader toggle={this.toggle}>New User</ModalHeader>
            <ModalBody>
            <FormGroup row>
                <Label for="leave1_1" sm={4}>Annual Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave1_1" placeholder="Balance" onChange={this.handleChangeLeave1_1} defaultValue={this.state.leave1_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave1_2" placeholder="Taken" onChange={this.handleChangeLeave1_2} defaultValue={this.state.leave1_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave1_3" placeholder="Remaining" onChange={this.handleChangeLeave1_3} defaultValue={this.state.leave1_3}  />   </Col>
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave1_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave1_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave1_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave2_1" sm={4}>Childcare Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave2_1" placeholder="Balance" onChange={this.handleChangeLeave2_1} defaultValue={this.state.leave2_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave2_2" placeholder="Taken" onChange={this.handleChangeLeave2_2} defaultValue={this.state.leave2_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave2_3" placeholder="Remaining" onChange={this.handleChangeLeave2_3} defaultValue={this.state.leave2_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave1_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave1_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave1_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave3_1" sm={4}>National Service</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave3_1" placeholder="Balance" onChange={this.handleChangeLeave3_1} defaultValue={this.state.leave3_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave3_2" placeholder="Taken" onChange={this.handleChangeLeave3_2} defaultValue={this.state.leave3_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave3_3" placeholder="Remaining" onChange={this.handleChangeLeave3_3} defaultValue={this.state.leave3_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave3_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave3_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave3_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave4_1" sm={4}>Off In Lieu</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave4_1" placeholder="Balance" onChange={this.handleChangeLeave4_1} defaultValue={this.state.leave4_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave4_2" placeholder="Taken" onChange={this.handleChangeLeave4_2} defaultValue={this.state.leave4_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave4_3" placeholder="Remaining" onChange={this.handleChangeLeave4_3} defaultValue={this.state.leave4_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave4_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave4_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave4_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave5_1" sm={4}>Medical Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave5_1" placeholder="Balance" onChange={this.handleChangeLeave5_1} defaultValue={this.state.leave5_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave5_2" placeholder="Taken" onChange={this.handleChangeLeave5_2} defaultValue={this.state.leave5_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave5_3" placeholder="Remaining" onChange={this.handleChangeLeave5_3} defaultValue={this.state.leave5_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave5_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave5_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave5_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave6_1" sm={4}>Hospitalisation Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave6_1" placeholder="Balance" onChange={this.handleChangeLeave6_1} defaultValue={this.state.leave6_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave6_2" placeholder="Taken" onChange={this.handleChangeLeave6_2} defaultValue={this.state.leave6_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave6_3" placeholder="Remaining" onChange={this.handleChangeLeave6_3} defaultValue={this.state.leave6_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave6_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave6_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave6_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave7_1" sm={4}>Unpaid Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave7_1" placeholder="Balance" onChange={this.handleChangeLeave7_1} defaultValue={this.state.leave7_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave7_2" placeholder="Taken" onChange={this.handleChangeLeave7_2} defaultValue={this.state.leave7_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave7_3" placeholder="Remaining" onChange={this.handleChangeLeave7_3} defaultValue={this.state.leave7_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave7_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave7_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave7_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave8_1" sm={4}>Maternity Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave8_1" placeholder="Balance" onChange={this.handleChangeLeave8_1} defaultValue={this.state.leave8_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave8_2" placeholder="Taken" onChange={this.handleChangeLeave8_2} defaultValue={this.state.leave8_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave8_3" placeholder="Remaining" onChange={this.handleChangeLeave8_3} defaultValue={this.state.leave8_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave8_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave8_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave8_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave9_1" sm={4}>Parental Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave9_1" placeholder="Balance" onChange={this.handleChangeLeave9_1} defaultValue={this.state.leave9_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave9_2" placeholder="Taken" onChange={this.handleChangeLeave9_2} defaultValue={this.state.leave9_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave9_3" placeholder="Remaining" onChange={this.handleChangeLeave9_3} defaultValue={this.state.leave9_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave9_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave9_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave9_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave10_1" sm={4}>Shared Parental Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave10_1" placeholder="Balance" onChange={this.handleChangeLeave10_1} defaultValue={this.state.leave10_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave10_2" placeholder="Taken" onChange={this.handleChangeLeave10_2} defaultValue={this.state.leave10_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave10_3" placeholder="Remaining" onChange={this.handleChangeLeave10_3} defaultValue={this.state.leave10_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave10_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave10_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave10_3, 'required|integer')}</Col>
            </FormGroup>
            
            
            <Input type="text" name="id" value={this.state.editId} readOnly hidden/>
            <Input type="text" name="updatedDate" value={moment(this.state.updatedDate).format("LL")} readOnly hidden/>
            <Input type="text" name="year" value={moment(this.state.updatedDate).format("YYYY")} readOnly hidden/>
        
            </ModalBody>
            <ModalFooter>
                <Input type="submit" className="btn btn-primary" value="Save"/>{' '}
                <Button color="secondary" onClick={this.leaveToggle}>Cancel</Button>
            </ModalFooter>
            </Form>
        : <div>
        <ModalHeader toggle={this.toggle}>Leave Balance</ModalHeader>
        <ModalBody>
        <Table className="leave_table_main" responsive>
        <thead>
            <tr>
                {/* <th>Employee Id</th> */}
                <th>Leave Type</th>
                <th>Balance</th>
                <th>Taken</th>
                <th>Remaining</th>
            </tr>
            </thead>
            {this.state.individualEmployeeLeaveDetails.map(leave =>  
            
            <tbody key={leave.leave_balance_id} id={leave.leave_balance_id}>
            <tr>
                {/* <td>{leave.employee_id}</td> */}
                <td>{leave.leave_type}</td>
                <td>{leave.leave_balance}</td>
                <td>{leave.leave_taken}</td>
                <td>{leave.leave_remaining}</td>
            </tr>
            
            </tbody>
            )}
        </Table>
        </ModalBody>
        <ModalFooter>
                <Button color="secondary" onClick={this.leaveToggle}>Cancel</Button>
        </ModalFooter>
        </div>
    }

        </Modal>
        
        
        <Modal isOpen={this.state.modalEdit} toggle={this.toggle} className={this.props.className}>
        <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle} charCode="Y">Edit</ModalHeader>
            <ModalBody>
            <FormGroup row>
                <Label for="leave1_1" sm={4}>Annual Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave1_1" placeholder="Balance" onChange={this.handleChangeLeave1_1} defaultValue={this.state.leave1_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave1_2" placeholder="Taken" onChange={this.handleChangeLeave1_2} defaultValue={this.state.leave1_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave1_3" placeholder="Remaining" onChange={this.handleChangeLeave1_3} defaultValue={this.state.leave_1_3}  />   </Col>
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave1_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave1_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave1_3, 'required|integer')}</Col>
            </FormGroup>
                
            <FormGroup row>
                <Label for="leave2_1" sm={4}>Childcare Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave2_1" placeholder="Balance" onChange={this.handleChangeLeave2_1} defaultValue={this.state.leave2_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave2_2" placeholder="Taken" onChange={this.handleChangeLeave2_2} defaultValue={this.state.leave2_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave2_3" placeholder="Remaining" onChange={this.handleChangeLeave2_3} defaultValue={this.state.leave2_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave1_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave1_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave1_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave3_1" sm={4}>National Service</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave3_1" placeholder="Balance" onChange={this.handleChangeLeave3_1} defaultValue={this.state.leave3_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave3_2" placeholder="Taken" onChange={this.handleChangeLeave3_2} defaultValue={this.state.leave3_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave3_3" placeholder="Remaining" onChange={this.handleChangeLeave3_3} defaultValue={this.state.leave3_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave3_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave3_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave3_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave4_1" sm={4}>Off In Lieu</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave4_1" placeholder="Balance" onChange={this.handleChangeLeave4_1} defaultValue={this.state.leave4_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave4_2" placeholder="Taken" onChange={this.handleChangeLeave4_2} defaultValue={this.state.leave4_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave4_3" placeholder="Remaining" onChange={this.handleChangeLeave4_3} defaultValue={this.state.leave4_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave4_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave4_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave4_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave5_1" sm={4}>Medical Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave5_1" placeholder="Balance" onChange={this.handleChangeLeave5_1} defaultValue={this.state.leave5_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave5_2" placeholder="Taken" onChange={this.handleChangeLeave5_2} defaultValue={this.state.leave5_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave5_3" placeholder="Remaining" onChange={this.handleChangeLeave5_3} defaultValue={this.state.leave5_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave5_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave5_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave5_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave6_1" sm={4}>Hospitalisation Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave6_1" placeholder="Balance" onChange={this.handleChangeLeave6_1} defaultValue={this.state.leave6_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave6_2" placeholder="Taken" onChange={this.handleChangeLeave6_2} defaultValue={this.state.leave6_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave6_3" placeholder="Remaining" onChange={this.handleChangeLeave6_3} defaultValue={this.state.leave6_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave6_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave6_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave6_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave7_1" sm={4}>Unpaid Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave7_1" placeholder="Balance" onChange={this.handleChangeLeave7_1} defaultValue={this.state.leave7_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave7_2" placeholder="Taken" onChange={this.handleChangeLeave7_2} defaultValue={this.state.leave7_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave7_3" placeholder="Remaining" onChange={this.handleChangeLeave7_3} defaultValue={this.state.leave7_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave7_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave7_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave7_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave8_1" sm={4}>Maternity Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave8_1" placeholder="Balance" onChange={this.handleChangeLeave8_1} defaultValue={this.state.leave8_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave8_2" placeholder="Taken" onChange={this.handleChangeLeave8_2} defaultValue={this.state.leave8_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave8_3" placeholder="Remaining" onChange={this.handleChangeLeave8_3} defaultValue={this.state.leave8_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave8_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave8_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave8_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave9_1" sm={4}>Parental Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave9_1" placeholder="Balance" onChange={this.handleChangeLeave9_1} defaultValue={this.state.leave9_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave9_2" placeholder="Taken" onChange={this.handleChangeLeave9_2} defaultValue={this.state.leave9_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave9_3" placeholder="Remaining" onChange={this.handleChangeLeave9_3} defaultValue={this.state.leave9_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave9_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave9_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave9_3, 'required|integer')}</Col>
            </FormGroup>

            <FormGroup row>
                <Label for="leave10_1" sm={4}>Shared Parental Leave</Label>
                <Col sm={8}></Col>
                    <Col sm={4}><Input type="number" name="leave10_1" placeholder="Balance" onChange={this.handleChangeLeave10_1} defaultValue={this.state.leave10_1}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave10_2" placeholder="Taken" onChange={this.handleChangeLeave10_2} defaultValue={this.state.leave10_2}  />   </Col>
                    <Col sm={4}><Input type="number" name="leave10_3" placeholder="Remaining" onChange={this.handleChangeLeave10_3} defaultValue={this.state.leave10_3}  />   </Col> 
            </FormGroup>
            {/** Error Message Here */}
            <FormGroup row hidden={this.state.showError===1 ? false : true}>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Balance', this.state.leave10_1, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Taken', this.state.leave10_2, 'required|integer')}</Col>
                <Col className="warning_text" sm={4} style={{fontSize:'9px'}}>{this.validator.message('Remaining', this.state.leave10_3, 'required|integer')}</Col>
            </FormGroup>
            
            
            <Input type="text" name="id" value={this.state.editId} readOnly hidden/>
            <Input type="text" name="updatedDate" value={moment(this.state.updatedDate).format("LL")} readOnly hidden/>
            <Input type="text" name="year" value={moment(this.state.updatedDate).format("YYYY")} readOnly hidden/>
                
            </ModalBody>
            <ModalFooter>
                <Input type="submit" className="btn btn-primary" value="Save"/>{' '}
                <Button color="secondary" onClick={this.editLeaveToggle}>Cancel</Button>
            </ModalFooter>
            </Form>
        </Modal>
        </div>
);
}
}




export default AdminPageLeave;