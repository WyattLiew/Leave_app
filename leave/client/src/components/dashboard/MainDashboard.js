import React, { Component } from 'react';
import * as moment from 'moment';
import appleLeaveGuide from '../../images/leave_guide.png'
import { FiUserCheck,FiHelpCircle,FiX,FiCheck } from "react-icons/fi";
import {
    Jumbotron,
    Container,
    Button,
    Badge,
    Table,
    Collapse,
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Row
} from 'reactstrap';

class MainDashboard extends Component {

    constructor() {
        super();
        this.state = {
            periodId:'',
            employeeName:'',
            fromDate:'',
            toDate:'',
            numberOfDays:'',
            takenByThisMonth:[],
            allOff:[],

            collapse1: false,
            collapse2: false,
            collapse3: false,
            collapse4: false,
            name:'',
            balanceID:'',
            balance:'',
            taken:'',
            remaining:'',
            leavesBalance:[],
            leavesTaken:[],
            leavesTakenByMonth:[],
            isManagement:false,
            currentDate:new Date(),
            selectedMonth:moment(new Date()).format('MM YYYY'),
            selectedYear:moment(new Date()).format('YYYY'),
            id:''
        }
        this.toggleMessage1 = this.toggleMessage1.bind(this);
        this.toggleMessage2 = this.toggleMessage2.bind(this);
        this.toggleMessage3 = this.toggleMessage3.bind(this);
        this.toggleMessage4 = this.toggleMessage4.bind(this);

        this.handleChangeSelectedMonth = this.handleChangeSelectedMonth.bind(this);
      }

      componentDidMount() {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
        window.history.go(1);
        };
        this.getLoginStatus();
        this.getUserRoles();
        this.getUserId();
        this.getAllLeaves();
        this.getLeaveByMonth(this.state.selectedMonth);
      }

    // toggle Message
    toggleMessage1() {
        this.setState(state => ({
            collapse1: !state.collapse1
        }));
    }
    toggleMessage2() {
        this.setState(state => ({
            collapse2: !state.collapse2
        }));
    }
    toggleMessage3() {
        this.setState(state => ({
            collapse3: !state.collapse3
        }));
    }
    toggleMessage4() {
        this.setState(state => ({
            collapse4: !state.collapse4
        }));
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

// Selected Months handler
handleChangeSelectedMonth(event) {
    this.setState({
        selectedMonth:event.target.value
    },()=>this.checkLeave());
}

// Get Balance
getBalance = _ =>{
    this.state.leavesBalance.map(leaves =>
        this.setState({
            name:leaves.employee_name,
            balanceID: leaves.leave_balance_id,
            balance:leaves.leave_balance,
            taken:leaves.leave_taken,
            remaining:leaves.leave_remaining
        },()=>{
        console.log(this.state.name,"ID "+this.state.balanceID,"B "+this.state.balance,"R "+this.state.remaining, "T "+this.state.taken);
        })
    )
}

checkLeave(){
    this.getLeaveByMonth(this.state.selectedMonth);
}


// get all leave history
getAllLeaves = _ => {
    fetch(`http://localhost:3000/api/get_all_leaves_taken`)
      .then(response => response.json())
      .then(response => this.setState({ leavesTaken: response.data}))
      .catch(err=>console.error(err));
  }

  // get all leave by the months
getLeaveByMonth = (month) => {
    fetch(`http://localhost:3000/api/get_all_leaves_taken_by_month/${month}`)
      .then(response => response.json())
      .then(response => this.setState({ leavesTakenByMonth: response.data}))
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

// Get individual leave balance
getIndividualLeaves = (id) => {
    fetch(`http://localhost:3000/api/get_main_leaves_balance/${id}/${1}`)
      .then(response => response.json())
    //   .then(({data})=>{
    //     console.log(data);
    //   })
      .then(response => this.setState({ leavesBalance: response.data},()=>{
          this.getBalance();
      })).catch(err=>console.error(err));
}

// get user id
getUserId = _ => {
    fetch(`/api/check_user_id`).then(response => response.json())
    .then(response => this.setState({ id: response.data},()=>{
        this.getIndividualLeaves(this.state.id)
    }))
    .catch(err=>console.error(err));
}
    
render() {
    return (
        <Container>
            <Jumbotron>
            <h2 className="display-4">Welcome Back, {this.state.name} <FiUserCheck className="display-4"/></h2>
            <h5 >{moment(this.state.currentDate).format("DD MMM, YYYY")}</h5>
            <hr className="my-2" />
            <h6>Your annual leave balance :</h6>
        <br></br>
            <Row>
                <Col xs="12" md="4"> <h4><Badge color="secondary">{this.state.balance}</Badge></h4>Total Leaves Accured</Col>
                <Col xs="12" md="4"><h4><Badge color="secondary">{this.state.taken}</Badge></h4>Leaves Used</Col>
                <Col xs="12" md="4"><h4><Badge color="secondary">{this.state.remaining}</Badge></h4>Leaves Remaining</Col>
            </Row>
            </Jumbotron>

            <div hidden={this.state.isManagement ? false : true}>
            <Jumbotron>
            <h2>My Actions</h2>
            <h6>My leave approvals</h6>
            <br></br>
            {this.state.leavesTaken.length !==0 ?
                <Table className="leave_table_main" responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Dates</th>
                            <th>Days</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {this.state.leavesTaken.map(leave =>  
                        
                        <tbody key={leave.leave_period_id} id={leave.leave_period_id}>
                        <tr>
                            <td>{leave.employee_name}</td>
                            <td>{moment(leave.leave_from_date).format("DD")} - {moment(leave.leave_to_date).format("DD MMM, YYYY")}</td>
                            <td>{leave.number_of_days + " day(s)"}</td>
                            <td>{leave.reason}</td>
                            <td><Row>
                                <Col xs="6" md="3"><Button color="dark" style={{color:"chartreuse"}} size="sm" id={leave.leave_period_id} onClick={() => {if(window.confirm('Are you sure you want to approve the following leave?')){this.approveToggle(leave.leave_period_id,leave.id)};}} hidden={leave.leave_approval_code===1 ? false : true}><FiCheck /></Button></Col>
                                <Col xs="6" md="3"><Button color="dark" style={{color:"red"}} size="sm"  id={leave.leave_period_id} onClick={() => {if(window.confirm('Are you sure you want to reject the following leave?')){this.rejectToggle(leave.leave_period_id,leave.id)};}} hidden={leave.leave_approval_code===1 ? false : true}><FiX /></Button></Col>
                            </Row></td>
                            
                        </tr>
                        
                        </tbody>
                        )}
                    </Table> : <h4>No Record Found..</h4> }
                    </Jumbotron>
            </div>   
        <Row>
        <Col xs="12" md="7" sm="7">
        <Jumbotron >
        <h4 className="display-5">Things you might not know <FiHelpCircle/></h4>
        <div>
                <Button color="info" onClick={this.toggleMessage3} style={{ marginBottom: '1rem',marginTop: '1rem'  }}>How to apply leave?</Button>
                <Collapse isOpen={this.state.collapse3}>
                    <Card style={{ marginBottom: '1rem'}}>
                        <CardBody>
                        <img style={{height: '350px', width: '100%'}} src={appleLeaveGuide} alt="guide" />
                        <p className="lead">Leave > New Leave Application > Apply</p>
                        <p className="lead"><strong>3.</strong> Only select dates that you want to use leaves on and the date before your return to work.</p>
                        <p className="lead"><strong>4.</strong> Please calculate properly number of days you've applied, if holiday's dates or weekend are listed in a range you've applied. The <strong>Days Applied</strong> should adjust accordingly.</p>
                        <p className="lead"><strong>For Example:</strong> 17th - 18th(Friday and Saturday), Your working hours on Saturdays are 9am to 1pm. If you take leave on a Saturday, it is counted as a half day of leave. <strong>Days Applied</strong> should put 1.5 instead of 2.</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
            <div>
                <Button color="info" onClick={this.toggleMessage4} style={{ marginBottom: '1rem' }}>How to cancel leave?</Button>
                <Collapse isOpen={this.state.collapse4}>
                    <Card style={{ marginBottom: '1rem'}}>
                        <CardBody>
                        <p className="lead">Profile > History > Cancel</p>
                        <p className="lead">Once your request have been Approved, you cannot cancel your leave by yourself.</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        <div>
                <Button color="info" onClick={this.toggleMessage1} style={{ marginBottom: '1rem'}}>Treatment of unused annual leave entitlement</Button>
                <Collapse isOpen={this.state.collapse1}>
                    <Card style={{ marginBottom: '1rem'}} >
                        <CardBody>
                        <p className="lead">You were entitled to x days of annual leave from January to December 2018. Only x days unused annual leave entitlement from January to December 2018 will be carried forward to 2019. If the unused annual leave entitlement from 2018 is not used by 31 December 2019, it can be forfeited.</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
            <div>
                <Button color="info" onClick={this.toggleMessage2} style={{ marginBottom: '1rem' }}>If annual leave is used up (unpaid leave)</Button>
                <Collapse isOpen={this.state.collapse2}>
                    <Card style={{ marginBottom: '1rem'}}>
                        <CardBody>
                        <p className="lead">You can apply for unpaid leave (also known as no-pay leave) if you are not eligible for paid annual leave or have used up your paid annual leave. Unpaid leave is subject to approval from your employer.</p>
                        <p className="lead">If you take more paid annual leave than you are entitled to, the excess leave is treated as unpaid leave, and your employer can deduct your salary accordingly. Your employer should therefore keep a record of all your leave applications, whether paid or unpaid.</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </Jumbotron>
    </Col>

        <Col xs="12" md="5" sm="5">
        <Jumbotron >
        <h2>Who's off</h2>
        <Row>
        <Col xs="6" md="6"><h6>{moment(this.state.currentDate).format("DD MMM, YYYY")}</h6></Col>
        <Form>
        <FormGroup row>
                <Col sm={8}>
                    <select value={this.state.selectedMonth} name="months"  onChange={this.handleChangeSelectedMonth}> 
                        <option value={`00 ${this.state.selectedYear}`}>Select Month</option>
                        <option value={`01 ${this.state.selectedYear}`}>January</option>
                        <option value={`02 ${this.state.selectedYear}`}>February</option>
                        <option value={`03 ${this.state.selectedYear}`}>March</option>
                        <option value={`04 ${this.state.selectedYear}`}>April</option>
                        <option value={`05 ${this.state.selectedYear}`}>May</option>
                        <option value={`06 ${this.state.selectedYear}`}>June</option>
                        <option value={`07 ${this.state.selectedYear}`}>July</option>
                        <option value={`08 ${this.state.selectedYear}`}>August</option>
                        <option value={`09 ${this.state.selectedYear}`}>September</option>
                        <option value={`10 ${this.state.selectedYear}`}>October</option>
                        <option value={`11 ${this.state.selectedYear}`}>November</option>
                        <option value={`12 ${this.state.selectedYear}`}>December</option>
                    </select>
                </Col>
            </FormGroup>
        </Form>
        </Row>
        <br></br>
        {this.state.leavesTakenByMonth.length !==0 ? 
        <Table className="leave_table_main" responsive>
                <thead>
                        <tr>
                            <th>Name</th>
                            <th>Dates</th>
                            <th>Days</th>
                        </tr>
                        </thead>
                        {this.state.leavesTakenByMonth.map(leave =>

                        
                        <tbody key={leave.leave_period_id} id={leave.leave_period_id} >
                        <tr>
                            <td>{leave.employee_name}</td>
                            <td>{moment(leave.leave_from_date).format("DD MMM")} - {moment(leave.leave_to_date).format("DD MMM, YYYY")}</td>
                            <td>{leave.number_of_days + " day(s)"}</td>
                        </tr>
                        
                        </tbody>
                        )}
                    
                    </Table> : <h4>No Record Found..</h4> }
                    </Jumbotron>
                    </Col>
                    </Row>
                    </Container>
        
    );
}

}

export default MainDashboard;