import React, { Component } from 'react';
import * as moment from 'moment';
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

import LeaveBalance from './LeavePageTable';

class LeavePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          isHalfDayChecked: false,
          leaveTypeValue:0,
          currentDate: new Date(),
          fromLeave: new Date(),
          toLeave:new Date(),
          msgWrongYear:"",
          daysCount: 0,
          reason:"",
          leavesBalance:[],
          balanceID:0,
          balance:0,
          taken:0,
          remaining:0,
          id:0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeCheckHalfDay = this.handleChangeCheckHalfDay.bind(this);
        this.handleChangeDays = this.handleChangeDays.bind(this);
        this.handleChangeLeaveType = this.handleChangeLeaveType.bind(this);
        this.handleChangeReason = this.handleChangeReason.bind(this);
        this.applyToggle = this.applyToggle.bind(this);
    }

    componentDidMount() {
        this.getDaysCount();
        this.getLoginStatus();
        this.getUserId();
    }
    
    // Start date handler
    handleChangeStart(event) {
        this.setState({
          fromLeave: event.target.value
        }, () => this.getDaysCount());
      }
      
    // End date handler
    handleChangeEnd(event) {
        this.setState({
          toLeave: event.target.value
        }, () => this.getDaysCount());
    }

    // Half day check handler
    handleChangeCheckHalfDay = () => {
        this.setState({
            isHalfDayChecked: !this.state.isHalfDayChecked,
        },()=> this.getDaysCount());
    }

    // Day count handler
    handleChangeDays(event) {

        const startDate = moment(this.state.fromLeave);
        const timeEnd = moment(this.state.toLeave);
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);
        let totalDays = diffDuration.days();

        if(event.target.value > totalDays +1 || event.target.value <0 ) {
            alert("Please calculate the day applied properly.");
        } else {
            this.setState({daysCount:event.target.value});
        }
    }

    // Reason handler
    handleChangeReason(event) {
        this.setState({
            reason: event.target.value
        })
    }

    // Leave Type handler
    handleChangeLeaveType(event) {
        this.setState({
            leaveTypeValue:event.target.value
        },()=> this.getLeaves(this.state.id,this.state.leaveTypeValue));
    }

    // Apply leave button toggle
    applyToggle() {
        this.setState({
            daysCount: 0,
            leaveTypeValue:0,
            remaining:0,
            taken:0,
            balanceID:0,
            reason:""
        });
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    // Get Balance
    getBalance = _ =>{

    this.state.leavesBalance.map(leaves =>
            this.setState({
                balanceID: leaves.leave_balance_id,
                balance:leaves.leave_balance,
                taken:leaves.leave_taken,
                remaining:leaves.leave_remaining
            },()=>{
            console.log("ID "+this.state.balanceID,"B "+this.state.balance,"R "+this.state.remaining, "T "+this.state.taken);
            })
        )
    }


    // Calculate days applied
    getDaysCount = _ =>{
        console.log(this.state.fromLeave);
        console.log(this.state.toLeave);

        this.setState({            
            daysCount: 0
         });
        const startDate = moment(this.state.fromLeave);
        const timeEnd = moment(this.state.toLeave);
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);

        console.log("StartDate"+startDate);
        console.log("EndDate"+timeEnd);
        console.log("Total Duration in millis:", diffDuration.asMilliseconds());
        console.log("Days:", diffDuration.days());
        console.log("Years:", diffDuration.years());
        console.log("Months:", diffDuration.months());
        console.log("Hours:", diffDuration.hours());
        console.log("Minutes:", diffDuration.minutes());
        console.log("Seconds:", diffDuration.seconds());
       
        var totalDays = diffDuration.days();
        console.log("Days:", moment(startDate).days());

        //this.getBalance();

        // Check years
       if(diffDuration.years() >=1){
        this.setState({msgWrongYear:"*Please check the year you've selected."});
       }else if(diffDuration.years() ===0){
           this.setState({msgWrongYear:""});
        }
       // Check is Half day?
       if(diffDuration.days() === 0 && timeEnd!=null) {
        if(!this.state.isHalfDayChecked){
            this.setState({            
                daysCount: 1
            });
        } else {
            this.setState({            
                daysCount: 0.5
             });
        }
       }
       // Check is from date if greater than to date
       else if(diffDuration.days()<=0) {
        this.setState({msgWrongYear:"*Please check the date you've selected."});
       }
       else if(diffDuration.months()>=1) {
        this.setState({msgWrongYear:"*Please check the date you've selected."});
       }
       // no error
       else {
        this.setState({            
            daysCount: totalDays +1
         });
        }
    }


    // Submit handler
    handleSubmit(event) {
        // Calculation of Leave taken and remaining
        var calTakenLeave = Number(this.state.taken);
        var calRemainingLeave = Number(this.state.remaining);
        var calDaysCount = Number(this.state.daysCount);
        var leaveTypeSelected = this.state.leaveTypeValue;
        //var calLeaveBalance = Number(this.state.balance);

        let totalDaysTaken = calTakenLeave + calDaysCount;
        let totalDaysRemaining = calRemainingLeave - calDaysCount;
        
        
        console.log("Taken"+totalDaysTaken);
        console.log("Remaining"+totalDaysRemaining);
        console.log("leave_type "+leaveTypeSelected);
        
        if(calDaysCount>calRemainingLeave && leaveTypeSelected !=="7") {
            event.preventDefault();
            alert("Please make sure you have enough leave to take.");
        }else if(leaveTypeSelected ==="7") {
            this.setState({
                taken: totalDaysTaken,
                remaining: 0,
                balance:0
            },()=>{
                var data = {
                    balanceID: this.state.balanceID,
                    leaveType: this.state.leaveTypeValue,
                    fromDate: this.state.fromLeave,
                    toDate: this.state.toLeave,
                    reason: this.state.reason,
                    days:this.state.daysCount,
                    currentDate: this.state.currentDate,
                    taken: this.state.taken,
                    remaining:this.state.remaining,
                    id:this.state.id
                };
                fetch('/apply-leave',{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
            });
        }else{
            this.setState({
                taken: totalDaysTaken,
                remaining: totalDaysRemaining
            },()=>{
                var data = {
                    balanceID: this.state.balanceID,
                    leaveType: this.state.leaveTypeValue,
                    fromDate: this.state.fromLeave,
                    toDate: this.state.toLeave,
                    reason: this.state.reason,
                    days:this.state.daysCount,
                    currentDate: this.state.currentDate,
                    taken: this.state.taken,
                    remaining:this.state.remaining,
                    id:this.state.id
                };
                fetch('/apply-leave',{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
            });
        }
        


        //     console.log(this.state.taken,this.state.remaining);
        //     var data = {
        //         leaveType: this.state.leaveTypeValue,
        //         fromDate: this.state.fromLeave,
        //         toDate: this.state.toLeave,
        //         reason: this.state.reason,
        //         days:this.state.daysCount,
        //         currentDate: this.state.currentDate,
        //         taken: this.state.taken,
        //         remaining:this.state.remaining
        //     };
        //     console.log(data);
            
        //     var request = new Request('/apply-leave',{
        //         method:'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(data)
        //     });
        //     fetch(request).then(function(response){
        //         //response.json()
        //         // .then(function(data){
                    
        //         // })
        //     })
        // });
    }

    getLeaves = (id,leaveType) => {
        fetch(`http://localhost:3000/api/get_leaves_balance/${id}/${leaveType}`)
          .then(response => response.json())
        //   .then(({data})=>{
        //     console.log(data);
        //   })
          .then(response => this.setState({ leavesBalance: response.data},()=>{
              this.getBalance();
          })).catch(err=>console.error(err));
    }

    getLoginStatus = _ => {
        fetch(`/api/get_account_valification`)
          .then(response => {
              if(response.ok && window){
                window.location.href="/";
              }
            })
          .catch(err=>console.error(err));
    }

    getUserId = _ => {
        fetch(`/api/check_user_id`).then(response => response.json())
        .then(response => this.setState({ id: response.data},()=>{console.log(this.state.id);
        }))
        .catch(err=>console.error(err));
    }
    
render() {
    return (
       <Container>
            <div>
            <h2><Button color="dark" onClick={this.applyToggle}>Apply</Button>  Leave Balance</h2>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <Form onSubmit={this.handleSubmit}>
                    <ModalHeader toggle={this.toggle} charCode="Y">Apply for a leave</ModalHeader>
                    <ModalBody>
                    <FormGroup row>
                        <Label for="leaveTypeSelect" sm={4}>Select leave type</Label>
                        <Col sm={8}>
                            <select value={this.state.leaveTypeValue} name="leaveType" id="leaveTypeSelect" onChange={this.handleChangeLeaveType}> 
                                <option value="0">Select your leave</option>
                                <option value="1">Annual Leave</option>
                                <option value="2">Childcare Leave</option>
                                <option value="3">National Service</option>
                                <option value="4">Off in liue</option>
                                <option value="5">Medical Leave</option>
                                <option value="6">Hospitalisation Leave</option>
                                <option value="7">Unpaid Leave</option>
                            </select>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="leavefromDate" sm={4}>From date</Label>
                        <Col sm={8}>
                        <Input
                            type="date"
                            name="fromDate"
                            id="leavefromDate"
                            placeholder="date placeholder"
                            selected={this.state.fromLeave}
                            onChange={this.handleChangeStart}
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="leavetoDate" sm={4}>To date</Label>
                        <Col sm={8}>
                        <Input
                            type="date"
                            name="toDate"
                            id="leavetoDate"
                            placeholder="date placeholder"
                            selected ={this.state.toLeave}
                            onChange={this.handleChangeEnd}
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="isHalfday" sm={4}></Label>
                        <Col sm={{ size: 8 }}>
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="isHalfday" checked={this.state.isHalfDayChecked} onChange={this.handleChangeCheckHalfDay} disabled={this.state.fromLeave===this.state.toLeave ? false : true}/>{' '}
                                Half day?
                            </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="daysApplied" sm={4}>Days Applied</Label>
                        <Col sm={8}>
                            <Input type="number" step="any" name="days" value={this.state.daysCount} onChange={this.handleChangeDays}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="reason" sm={4}>Reason</Label>
                        <Col sm={8}>
                            <Input type="textarea" name="reason" placeholder="Cannot be null" onChange={this.handleChangeReason} />   
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}></Label>
                        <Col sm={8}>
                            <p style={{color:'red'}}>{this.state.msgWrongYear}</p>
                        </Col>
                    </FormGroup>
                     
                    <Input type="number" step="any" name="taken" value={this.state.taken} readOnly/>
                    <Input type="number" step="any" name="remaining" value={this.state.remaining} readOnly/>
                    <Input type="text" name="currentDate" value={moment(this.state.currentDate).format("LL")} readOnly/>
                    <Input type="text" name="balanceID" value={this.state.balanceID} readOnly/>
                    <Input type="text" name="id" value={this.state.id} readOnly/>
                
                    </ModalBody>
                    <ModalFooter>
                        <Input type="submit" className="btn btn-primary" value="Apply"/>{' '}
                        <Button color="secondary" onClick={this.applyToggle}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
      </div>
      <LeaveBalance />
       </Container>
    );
}
}




export default LeavePage;