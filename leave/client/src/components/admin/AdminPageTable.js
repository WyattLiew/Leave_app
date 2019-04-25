import React, { Component } from 'react';
import * as moment from 'moment';
import {
    Table
} from 'reactstrap';

class AdminPageTable extends Component {

    constructor() {
        super();
        this.state = {
          employee:[]
        }
      }
    
      componentDidMount() {
        this.getEmployee();
      }

      getEmployee = _ => {
        fetch('/api/get_all_employee')
          .then(response => response.json())
          // .then(({data})=>{
          //   console.log(data);
          // })
          .then(response => this.setState({ employee: response.data}))
          .catch(err=>console.error(err));
      }
            

render() {
    return (
        <Table bordered>
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
                 </tr>
                
                </tbody>
                )}
            </Table>
    );
}
}




export default AdminPageTable;