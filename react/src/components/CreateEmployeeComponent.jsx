import React, { Component, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import './CreateEmployeeComponent.css';

const CreateEmployeeComponent = (props) => {
  const [id] = useState(props.match.params.id || '_add');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [sex, setSex] = useState('');
  const [salary, setSalary] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    clearValidationError(name);
    
    if (name === 'sex') {
      setSex(value);
    } else {
      eval(`set${name.charAt(0).toUpperCase() + name.slice(1)}`)(value);
    }
  };

  const clearValidationError = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const employee = {
        name,
        department,
        sex,
        salary,
        dob,
        image
      };

      if (id === '_add') {
        EmployeeService.createEmployee(employee).then((res) => {
          props.history.push('/employees');
        });
      } else {
        EmployeeService.saveOrUpdateEmployee(employee, id).then((res) => {
          props.history.push('/employees');
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is required.';
    }

    if (department.trim() === '') {
      errors.department = 'Department is required.';
    }

    if (sex.trim() === '') {
      errors.sex = 'Sex is required.';
    }

    if (salary.trim() === '') {
      errors.salary = 'Salary is required.';
    }

    if (dob.trim() === '') {
      errors.dob = 'Date of Birth is required.';
    }

    return errors;
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      setImage(base64String);
    };
  
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const renderUserImage = () => {
    if (image) {
      return (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="User"
          style={{ height: 70, width: 70, borderRadius: 50 }}
          className="user-image"
        />
      );
    }
    return null;
  };

  const getTitle = () => {
    if (id === '_add') {
      return <h3 className="text-center">Employee Details</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    placeholder="Full Name"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    placeholder="Department"
                    name="department"
                    className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                    value={department}
                    onChange={handleInputChange}
                    required
                  >
                    <option>None</option>
                    <option>Sales</option>
                    <option>HR</option>
                    <option>Manager</option>
                    <option>Accounts</option>
                  </select>
                  {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                </div>
                <div className="form-group">
                  <label>Sex</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={sex === 'Male'}
                        onChange={handleInputChange}
                        required
                      />{' '}
                      Male
                    </label>
                    <label style={{ marginLeft: '30px' }}>
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={sex === 'Female'}
                        onChange={handleInputChange}
                      />{' '}
                      Female
                    </label>
                  </div>
                  {errors.sex && <div className="invalid-feedback">{errors.sex}</div>}
                </div>
                <div className="form-group">
                  <label>Salary</label>
                  <input
                    placeholder="Salary"
                    name="salary"
                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                    value={salary}
                    onChange={handleInputChange}
                  />
                  {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    placeholder="Date of Birth"
                    name="dob"
                    type="date"
                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                    value={dob}
                    onChange={handleInputChange}
                  />
                  {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" required />
                  {renderUserImage()}
                  <small className="form-text ">Upload a profile picture for the user.</small>
                </div>
                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                  Save
                </button>
                <button className="btn btn-danger" onClick={() => props.history.push('/employees')} style={{ marginLeft: '10px' }}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
