import React, { Component } from 'react';
import * as moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import {
    Container,
    Button,
    Table
} from 'reactstrap';

class HistoryPage extends Component {

    constructor() {
        super();
        this.state = {
          leaves:[],
          indLeaves:[],
          leavesBalance:[],
          employeeID:0,
          leaveTypeCode:0,
          daysCount:0,
          leaveApproval:0,
          balanceID:0,
          currentDate:new Date(),
          remaining:0,
          taken:0,
          id:0
        }
        this.cancelToggle = this.cancelToggle.bind(this);
      }
    
      componentDidMount() {
        this.getLoginStatus();
        this.getUserId();
        //this.getAllLeaves(this.state.id);
        
      }

      componentDidUpdate() {
        
        //this.getLeaveTakenHistory();
        //this.cancelToggle();
        //console.log("Updated: ","ID 2 "+this.state.employeeID,"LT "+this.state.leaveTypeCode,"DC "+this.state.daysCount, "LA "+this.state.leaveApproval);

      }

      // Check Login status
      getLoginStatus = _ => {
        fetch(`/api/get_account_valification`)
          .then(response => {
              if(response.ok && window){
                window.location.href="/";
              }
            })
          .catch(err=>console.error(err));
    }

    // get user id
    getUserId = _ => {
        fetch(`/api/check_user_id`).then(response => response.json())
        .then(response => this.setState({ id: response.data},()=>{
            this.getAllLeaves(this.state.id);
        }))
        .catch(err=>console.error(err));
    }

      // get all leave history
      getAllLeaves = (id) => {
        fetch(`http://localhost:3000/api/get_leaves_taken/${id}`)
          .then(response => response.json())
          .then(response => this.setState({ leaves: response.data}))
          .catch(err=>console.error(err));
      }

      // get individual leave (for cancel purpose)
      getLeaves = (leave_id) => {
        fetch(`http://localhost:3000/api/get_leaves_taken_cancel/${leave_id}`)
          .then(response => response.json())
          .then(response => this.setState({ indLeaves: response.data},()=>{
            this.getLeaveTakenHistory();
          })).catch(err=>console.error(err));
      }

      // Get leave Balance
      getLeavesBalance = (employeeID,leaveType) => {
        fetch(`http://localhost:3000/api/get_leaves_balance/${employeeID}/${leaveType}`)
          .then(response => response.json())
          .then(response => this.setState({ leavesBalance: response.data},()=>{
              this.getBalance();
          })).catch(err=>console.error(err));
    }

      // Get leave History to setState
      getLeaveTakenHistory = _ =>{
        this.state.indLeaves.map(leave =>
            this.setState({
                employeeID: leave.employee_id,
                leaveTypeCode:leave.leave_type_code,
                daysCount:leave.number_of_days,
                leaveApproval:leave.leave_approval_code
            },()=>{
                this.getLeavesBalance(this.state.employeeID,this.state.leaveTypeCode);
                //console.log("ID "+this.state.employeeID,"LT "+this.state.leaveTypeCode,"DC "+this.state.daysCount, "LA "+this.state.leaveApproval);
            })
        )
      }

    // Get Leave Balance to setState
    getBalance = _ =>{

        this.state.leavesBalance.map(leaves =>
            this.setState({
                balanceID: leaves.leave_balance_id,
                taken: leaves.leave_taken,
                remaining: leaves.leave_remaining,
                employeeID: leaves.employee_id
            },()=>{
            //Calculation of Leave taken and remaining
            var calTakenLeave = Number(this.state.taken);
            var calRemainingLeave = Number(this.state.remaining);
            var calDaysCount = Number(this.state.daysCount);
            var leaveTypeSelected = this.state.leaveTypeCode;
                
            let totalDaysTaken = calTakenLeave - calDaysCount;
            let totalDaysRemaining = calRemainingLeave + calDaysCount;
                
                if(leaveTypeSelected ===7 || leaveTypeSelected===3){
                    this.setState({
                        taken: totalDaysTaken,
                        remaining:0
                    },()=>{
                        var data = {
                            employeeID: this.state.employeeID,
                            balanceID: this.state.balanceID,
                            leaveType: this.state.leaveTypeCode,
                            days: this.state.daysCount,
                            currentDate: this.state.currentDate,
                            taken: this.state.taken,
                            remaining:this.state.remaining
                        };
                        fetch('/api/update_leaves_taken/',{
                            method:'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })
                    });
                }else {
                    this.setState({
                        taken: totalDaysTaken,
                        remaining: totalDaysRemaining
                    },()=>{
                        var data = {
                            employeeID: this.state.employeeID,
                            balanceID: this.state.balanceID,
                            leaveType: this.state.leaveTypeCode,
                            days:this.state.daysCount,
                            currentDate: this.state.currentDate,
                            taken: this.state.taken,
                            remaining:this.state.remaining
                        };
                        fetch('/api/update_leaves_taken/',{
                            method:'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })
                    });
                }
            })
        )
    }

    async cancelToggle(key) {
        let id = key;
        await this.getLeaves(id);

        await fetch(`/api/delete_leaves_taken/${key}`,{
            method: 'DELETE'
        });
        
       await setTimeout(() => window.location.reload(), 1500) ;
      }



    render(){
        return (
            <Container>
                <h2 className="history_table_h2 h2-align">Leave History</h2>
                <Table className="leave_table" responsive>
                    <thead>
                        <tr>
                            {/* <th>Employee Id</th> */}
                            <th>Leave Type</th>
                            <th>Dates</th>
                            <th>Day(s) Applied</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        {this.state.leaves.map(leave =>  
                        
                        <tbody key={leave.leave_period_id} id={leave.leave_period_id}>
                        <tr>
                            {/* <td>{leave.employee_id}</td> */}
                            <td>{leave.leave_type}</td>
                            <td>{moment(leave.leave_from_date).format("DD MMM")} - {moment(leave.leave_to_date).format("DD MMM, YYYY")}</td>
                            <td>{leave.number_of_days + " day(s)"}</td>
                            <td>{leave.reason}</td>
                            <td>{leave.leave_status}</td>
                            <td><Button color="link" style={{color:"red"}} id={leave.leave_period_id} onClick={() => {if(window.confirm('Are you sure you want to cancel your request?')){this.cancelToggle(leave.leave_period_id)};}} hidden={leave.leave_approval_code===1 ? false : true}><FaTrashAlt /></Button></td>
                        </tr>
                        
                        
                        </tbody>
                    )}
                </Table>
            </Container>
        );
    }
}

export default HistoryPage;