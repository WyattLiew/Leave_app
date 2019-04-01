import React, { Component } from 'react';
import {
    Table
} from 'reactstrap';

class LeavePage extends Component {

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
        fetch(`http://localhost:3000/api/get_leaves/${id}`)
          .then(response => response.json())
          // .then(({data})=>{
          //   console.log(data);
          // })
          .then(response => this.setState({ leaves: response.data}))
          .catch(err=>console.error(err));
      }
    
    //   getLeaves = _ => {
    //     fetch('http://localhost:3000/api/get_all_leaves')
    //       .then(response => response.json())
    //       // .then(({data})=>{
    //       //   console.log(data);
    //       // })
    //       .then(response => this.setState({ leaves: response.data}))
    //       .catch(err=>console.error(err));
    //   }
    
    // renderLeave = ({ leave_balance_id, employee_id, leave_type_code, year_number,updated, leave_balance,leave_taken,
    //     leave_remaining }) => 
    //     <Table bordered>
    //         <thead>
    //             <tr>
    //                 <th>Employee Id</th>
    //                 <th>Leave Type</th>
    //                 <th>Year</th>
    //                 <th>Updated</th>
    //                 <th>Balance</th>
    //                 <th>Taken</th>
    //                 <th>Remaining</th>
    //             </tr>
    //             </thead>
    //             {this.state.leaves.map(leave=>
    //              <tbody key={leave_balance_id} id={leave_balance_id}>
    //              <tr>
    //                  <td>{leave.employee_id}</td>
    //                  <td>{leave.leave_type_code}</td>
    //                  <td>{leave.year_number}</td>
    //                  <td>{leave.updated}</td>
    //                  <td>{leave.leave_balance}</td>
    //                  <td>{leave.leave_taken}</td>
    //                  <td>{leave.leave_remaining}</td>
    //              </tr>
    //             </tbody>)}
    //         </Table>
            

render() {
    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Leave Type</th>
                    <th>Year</th>
                    <th>Updated</th>
                    <th>Balance</th>
                    <th>Taken</th>
                    <th>Remaining</th>
                </tr>
                </thead>
                {this.state.leaves.map(leave=>
                 <tbody key={leave.leave_balance_id} id={leave.leave_balance_id}>
                 <tr>
                     <td>{leave.employee_id}</td>
                     <td>{leave.leave_type_code}</td>
                     <td>{leave.year_number}</td>
                     <td>{leave.updated}</td>
                     <td>{leave.leave_balance}</td>
                     <td>{leave.leave_taken}</td>
                     <td>{leave.leave_remaining}</td>
                 </tr>
                </tbody>)}
            </Table>
    );
}
}




export default LeavePage;