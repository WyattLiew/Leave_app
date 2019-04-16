import React, { Component } from 'react';
import * as moment from 'moment';
import {
    Container,
    Table
} from 'reactstrap';

class HistoryPage extends Component {

    constructor() {
        super();
        this.state = {
          leaves:[],
          id:`${1}`
        }
      }
    
      componentDidMount() {
        this.getLeaves(this.state.id);
      }

      getLeaves = (id) => {
        fetch(`http://localhost:3000/api/get_leaves_taken/${id}`)
          .then(response => response.json())
          // .then(({data})=>{
          //   console.log(data);
          // })
          .then(response => this.setState({ leaves: response.data}))
          .catch(err=>console.error(err));
      }



    render(){
        return (
            <Container>
                <h2>Leave History</h2>
                <br></br>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Leave Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Day(s) Applied</th>
                            <th>Reason</th>
                            <th>Result</th>
                        </tr>
                        </thead>
                        {this.state.leaves.map(leave =>  
                        
                        <tbody key={leave.leave_period_id} id={leave.leave_period_id}>
                        <tr>
                            <td>{leave.employee_id}</td>
                            <td>{leave.leave_type}</td>
                            <td>{moment(leave.leave_from_date).format("LL")}</td>
                            <td>{moment(leave.leave_to_date).format("LL")}</td>
                            <td>{leave.number_of_days}</td>
                            <td>{leave.reason}</td>
                            <td>{leave.leave_status}</td>
                        </tr>
                        
                        </tbody>
                    )}
                </Table>
            </Container>
        );
    }
}

export default HistoryPage;