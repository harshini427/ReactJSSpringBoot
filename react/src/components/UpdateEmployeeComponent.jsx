// import { withRouter, Link } from 'react-router-dom';
// import React, { Component } from 'react';
// import EmployeeService from '../services/EmployeeService';
// import { useParams } from 'react-router-dom';

// export function withRouterComponent(Children) {
//   return (props) => {
//     const match = { params: useParams() };
//     return <Children {...props} match={match} />;
//   };
// }

// class UpdateEmployeeComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: this.props.match.params.id,
//       Name: '',
//       department: '',
//       salary: '',
//       sex: '',
//       dob: '',
//       image: '',
//     };
//     this.updateEmployee = this.updateEmployee.bind(this);
//   }

//   componentDidMount() {
//     EmployeeService.getEmployeeById(this.state.id).then((res) => {
//       let employee = res.data;
//       this.setState({
//         Name: employee.Name,
//         department: employee.department,
//         salary: employee.salary,
//         sex: employee.sex,
//         dob: employee.dob,
//         image: employee.image,
//       });
//     });
//   }

//   saveOrUpdateEmployee(e) {
//     e.preventDefault();
//     let employee = {
//       name: this.state.name,
//       department: this.state.department,
//       sex: this.state.sex,
//       salary: this.state.salary,
//       dob: this.state.dob,
//       image: this.state.image
//     };

//     if (this.state.id === '_add') {
//       EmployeeService.createEmployee(employee).then((res) => {
//         this.props.history.push('/employees');
//       });
//     } else {
//       EmployeeService.saveOrUpdateEmployee(employee, this.state.id).then((res) => {
//         this.props.history.push('/employees');
//       });
//     }
//   }

//   changenameHandler(event) {
//     this.setState({ name: event.target.value });
//   }

//   changedepartmentHandler(event) {
//     this.setState({ department: event.target.value });
//   }

//   changesexHandler(event) {
//     this.setState({ sex: event.target.value });
//   }

//   changesalaryHandler(event) {
//     this.setState({ salary: event.target.value });
//   }

//   changedobHandler(event) {
//     this.setState({ dob: event.target.value });
//   }

//   cancel() {
//     this.props.history.push('/employees');
//   }

//   getTitle() {
//     if (this.state.id === '_add') {
//       return <h3 className="text-center">Employee Details</h3>;
//     } else {
//       return <h3 className="text-center">Update Employee</h3>;
//     }
//   }

//   handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const base64String = event.target.result.split(",")[1];
//       this.setState({ image: base64String });
//     };

//     reader.onerror = (error) => {
//       console.log("Error: ", error);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   renderUserImage = () => {
//     if (this.state.image) {
//       return (
//         <img
//           src={`data:image/jpeg;base64,${this.state.image}`}
//           alt="User"
//           style={{ height: 70, width: 70, borderRadius: 50 }}
//         />
//       );
//     }
//     return null;
//   };

//   render() {
//     return (
//       <div>
//         <br />
//         <div className="container">
//           <div className="row">
//             <div className="card col-md-6 offset-md-3 offset-md-3">
//               {this.getTitle()}
//               <div className="card-body">
//                 <form>
//                   <div className="form-group">
//                     <label>Name</label>
//                     <input
//                       placeholder="Full Name"
//                       name="name"
//                       className="form-control"
//                       value={this.state.name}
//                       onChange={this.changenameHandler}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Department</label>
//                     <select
//                   placeholder="Department"
//                   name="department"
//                   className="form-control"
//                   value={this.state.department}
//                   onChange={this.changedepartmentHandler}
//                   required>
//                   <option>None</option>
//                   <option>Sales</option>
//                   <option>HR</option>
//                   <option>Manager</option>
//                   <option>Accounts</option>
//                 </select>
//                     {/* <input
//                       placeholder="Department"
//                       name="department"
//                       className="form-control"
//                       value={this.state.department}
//                       onChange={this.changedepartmentHandler}
//                     /> */}
//                   </div>
//                   <div className="form-group">
//                     <label>Sex</label>
//                     <div>
//                     <label>
//                     <input
//                       type="radio"
//                       name="sex"
//                       value="Male"
//                       checked={this.state.sex === 'Male'}
//                       onChange={(e) => this.setState({ sex: e.target.value })}
//                       required
//                     />{' '}
//                     Male
//                   </label>
//                   <label style={{ marginLeft: '30px' }}>
//                     <input
//                       type="radio"
//                       name="sex"
//                       value="Female"
//                       checked={this.state.sex === 'Female'}
//                       onChange={(e) => this.setState({ sex: e.target.value })}
//                     />{' '}
//                     Female
//                   </label>
//                     </div>
//                     {/* <input
//                       placeholder="Sex"
//                       name="sex"
//                       className="form-control"
//                       value={this.state.sex}
//                       onChange={this.changesexHandler}
//                     /> */}
//                   </div>
//                   <div className="form-group">
//                     <label>Salary</label>
//                     <input
//                       placeholder="Salary"
//                       name="salary"
//                       className="form-control"
//                       value={this.state.salary}
//                       onChange={this.changesalaryHandler}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Date of Birth</label>
//                     <input
//                       placeholder="Date of Birth"
//                       name="dob"
//                       type='date'
//                       className="form-control"
//                       value={this.state.dob}
//                       onChange={this.changedobHandler}
//                     />
//                   </div>
//                   <div className="form-group" >
//                     <label>Image</label>
//                     <input type="file" accept="image/*" onChange={this.handleImageChange} className="form-control" required />
//                     {this.renderUserImage()}
//                     <small className="form-text ">Upload a profile picture for the user.</small>
//                   </div>
//                   <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>
//                     Save
//                   </button>
//                   <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: '10px' }}>
//                     Cancel
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(UpdateEmployeeComponent);





import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import "./UpdateEmployeeComponent.css";

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id || '_add',
            name: '',
            department: '',
            sex: '',
            salary: '',
            dob: '',
            image: ''
        };

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changedepartmentHandler = this.changedepartmentHandler.bind(this);
        this.changesexHandler = this.changesexHandler.bind(this);
        this.changesalaryHandler = this.changesalaryHandler.bind(this);
        this.changedobHandler = this.changedobHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== '_add') {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    name: employee.name,
                    department: employee.department,
                    sex: employee.sex,
                    salary: employee.salary,
                    dob: employee.dob,
                    image: employee.image
                });
            });
        }
    }

    updateEmployee(e) {
        e.preventDefault();
        let employee = {
            name: this.state.name,
            department: this.state.department,
            sex: this.state.sex,
            salary: this.state.salary,
            dob: this.state.dob,
            image: this.state.image
        };

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then((res) => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
                this.props.history.push('/employees');
            });
        }
    }

    changenameHandler(event) {
        this.setState({ name: event.target.value });
    }

    changedepartmentHandler(event) {
        this.setState({ department: event.target.value });
    }

    changesexHandler(event) {
        this.setState({ sex: event.target.value });
    }

    changesalaryHandler(event) {
        this.setState({ salary: event.target.value });
    }

    changedobHandler(event) {
        this.setState({ dob: event.target.value });
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Employee Details</h3>;
        } else {
            return <h3 className="text-center">Update Employee</h3>;
        }
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const base64String = event.target.result.split(",")[1];
            this.setState({ image: base64String });
        };

        reader.onerror = (error) => {
            console.log("Error: ", error);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    renderUserImage = () => {
        if (this.state.image) {
            return (
                <img
                    src={`data:image/jpeg;base64,${this.state.image}`}
                    alt="User"
                    style={{ height: 70, width: 70, borderRadius: 50 }}
                />
            );
        }
        return null;
    };

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            placeholder="Full Name"
                                            name="name"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.changenameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Department</label>
                                        <select
                                            placeholder="Department"
                                            name="department"
                                            className="form-control"
                                            value={this.state.department}
                                            onChange={this.changedepartmentHandler}
                                            required>
                                            <option>None</option>
                                            <option>Sales</option>
                                            <option>HR</option>
                                            <option>Manager</option>
                                            <option>Accounts</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Sex</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="sex"
                                                    value="Male"
                                                    checked={this.state.sex === 'Male'}
                                                    onChange={(e) => this.setState({ sex: e.target.value })}
                                                    required
                                                />{' '}
                                                Male
                                            </label>
                                            <label style={{ marginLeft: '30px' }}>
                                                <input
                                                    type="radio"
                                                    name="sex"
                                                    value="Female"
                                                    checked={this.state.sex === 'Female'}
                                                    onChange={(e) => this.setState({ sex: e.target.value })}
                                                />{' '}
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Salary</label>
                                        <input
                                            placeholder="Salary"
                                            name="salary"
                                            className="form-control"
                                            value={this.state.salary}
                                            onChange={this.changesalaryHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            placeholder="Date of Birth"
                                            name="dob"
                                            type='date'
                                            className="form-control"
                                            value={this.state.dob}
                                            onChange={this.changedobHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input type="file" accept="image/*" onChange={this.handleImageChange} className="form-control" required />
                                        {this.renderUserImage()}
                                        <small className="form-text">Upload a profile picture for the user.</small>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateEmployee}>
                                        Save
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: '10px' }}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;