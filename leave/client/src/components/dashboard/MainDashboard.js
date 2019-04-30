import React, { Component } from 'react';
import * as moment from 'moment';
import {
    Container,
    Button,
    Table
} from 'reactstrap';

class MainDashboard extends Component {

    constructor() {
        super();
        this.state = {
          leavesTaken:[],
          isManagement:false,
          currentDate:new Date()
        }
      }

      componentDidMount() {
        this.getLoginStatus();
        this.getUserRoles();
        this.getAllLeaves();
      }

    // approve leave
    async approveToggle(periodID,employeeID) {
    //let id = key;
    //await this.getLeaves(id);
    var data = {
        employeeID: employeeID,
        leavePeriodID: periodID,
        leaveApprovalCode: '2'
    }

    await fetch(`/api/update_leaves_taken_approval`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    
    await setTimeout(() => window.location.reload(), 1500) ;
    }

// Reject leave
async rejectToggle(periodID,employeeID) {
    var data = {
        employeeID: employeeID,
        leavePeriodID: periodID,
        leaveApprovalCode: '3'
    }

    await fetch(`/api/update_leaves_taken_approval`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    
    await setTimeout(() => window.location.reload(), 1500) ;
    }


// get all leave history
getAllLeaves = _ => {
    fetch(`http://localhost:3000/api/get_all_leaves_taken`)
      .then(response => response.json())
      .then(response => this.setState({ leavesTaken: response.data}))
      .catch(err=>console.error(err));
  }

  // get login status
  getLoginStatus = _ => {
    fetch(`/api/get_account_valification`)
      .then(response => {
          if(response.ok && window){
            window.location.href="/";
          }
        })
      .catch(err=>console.error(err));
}

// get user roles (management)
getUserRoles = _ => {
    fetch(`/api/check_user_management`).then(response => response.json())
    .then(response => this.setState({ isManagement: response.data}))
    .catch(err=>console.error(err));
}
    
render() {
    return (
        <Container>
            <div hidden={this.state.isManagement ? false : true}>
            <h2>My Actions</h2>
            <h6>My leave approvals</h6>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Number of Days</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {this.state.leavesTaken.map(leave =>  
                        
                        <tbody key={leave.leave_period_id} id={leave.leave_period_id}>
                        <tr>
                            <td>{leave.employee_name}</td>
                            <td>{moment(leave.leave_from_date).format("LL")}</td>
                            <td>{moment(leave.leave_to_date).format("LL")}</td>
                            <td>{leave.number_of_days}</td>
                            <td>{leave.reason}</td>
                            <td>
                                <Button color="primary" size="sm" id={leave.leave_period_id} onClick={() => {if(window.confirm('Are you sure you want to approve the following leave?')){this.approveToggle(leave.leave_period_id,leave.id)};}} hidden={leave.leave_approval_code===1 ? false : true}>Approve</Button> {' '}
                                <Button color="danger" size="sm" id={leave.leave_period_id} onClick={() => {if(window.confirm('Are you sure you want to reject the following leave?')){this.rejectToggle(leave.leave_period_id,leave.id)};}} hidden={leave.leave_approval_code===1 ? false : true}>Reject</Button>
                            </td>
                            
                        </tr>
                        
                        </tbody>
                        )}
                    </Table>
            </div>   
            <br></br>
        <h2>Who's off</h2>
        <h6>{moment(this.state.currentDate).format("LL")}</h6>
        <Table bordered>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Number of Days</th>
                        </tr>
                        </thead>
                        {/* {this.state.leavesTaken.map(leave =>  
                        
                        <tbody key={leave.leave_period_id} id={leave.leave_period_id}>
                        <tr>
                            <td>{leave.employee_name}</td>
                            <td>{moment(leave.leave_from_date).format("LL")}</td>
                            <td>{moment(leave.leave_to_date).format("LL")}</td>
                            <td>{leave.number_of_days}</td>
                            <td>{leave.reason}</td>
                            <td>
                                <Button color="primary" size="sm" id={leave.leave_period_id} onClick={() => {if(window.confirm('Are you sure you want to approve the following leave?')){this.approveToggle(leave.leave_period_id,leave.id)};}} hidden={leave.leave_approval_code===1 ? false : true}>Approve</Button> {' '}
                                <Button color="danger" size="sm" id={leave.leave_period_id} onClick={() => {if(window.confirm('Are you sure you want to reject the following leave?')){this.rejectToggle(leave.leave_period_id,leave.id)};}} hidden={leave.leave_approval_code===1 ? false : true}>Reject</Button>
                            </td>
                            
                        </tr>
                        
                        </tbody>
                        )} */}
                    </Table>
        </Container>
    );
}

}

export default MainDashboard;