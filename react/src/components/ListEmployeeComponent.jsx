import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });

        });


    }
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id) {
        this.props.history.push(`/update-employee/${id}`);
    }
    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data })

        });
    }
    addEmployee() {
        this.props.history.push('/add-employee/_add');

    }

    renderUserImage = (employee) => {
        if (employee.image && typeof employee.image === 'string') {
            const blobData = atob(employee.image);
            const arrayBuffer = new ArrayBuffer(blobData.length);
            const uintArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < blobData.length; i++) {
                uintArray[i] = blobData.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            const base64String = URL.createObjectURL(blob);
            return (
                <img
                    src={base64String}
                    alt="User"
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                />
            );
        } else if (employee.image && Array.isArray(employee.image)) {
            const base64String = btoa(String.fromCharCode.apply(null, employee.image));
            return (
                <img
                    src={`data:image/jpeg;base64,${base64String}`}
                    alt="User"
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                />
            );
        }
        return null;
    };

    render() {
        return (
            <div>
                <h2 className="text-center" >Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-stripped table-borderd">

                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Employee name</th>
                                <th>Employee department</th>
                                <th>Employee sex</th>
                                <th>Employee salary</th>
                                <th>Employee dob</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{this.renderUserImage(employee)}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.department}</td>
                                            <td>{employee.sex}</td>
                                            <td>{employee.salary}</td>
                                            <td>{employee.dob}</td>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                            </td>

                                        </tr>

                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent