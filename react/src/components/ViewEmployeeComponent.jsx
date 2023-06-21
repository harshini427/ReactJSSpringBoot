import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        })
    }

    renderUserImage = () => {
        if (this.state.employee.image) {
            return (
                <img
                    src={`data:image/jpeg;base64,${this.state.employee.image}`}
                    alt="User"
                    style={{ height: 100, width: 100, borderRadius: 0 }}
                />
            );
        }
        return null;
    };

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Employee name: </label>
                            <div> {this.state.employee.name}</div>
                        </div>
                        <div className="row">
                            <label> Employee department: </label>
                            <div> {this.state.employee.department}</div>
                        </div>
                        <div className="row">
                            <label> Employee sex: </label>
                            <div> {this.state.employee.sex}</div>
                        </div>
                        <div className="row">
                            <label> Employee salary: </label>
                            <div> {this.state.employee.salary}</div>
                        </div>
                        <div className="row">
                            <label> Employee dob: </label>
                            <div> {this.state.employee.dob}</div>
                        </div>
                        <div className="form-group">
                            <label>Image</label><br/>
                            {this.renderUserImage()}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent