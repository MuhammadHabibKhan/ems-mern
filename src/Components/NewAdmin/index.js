import React, { useState } from 'react';
import './index.css';
import useAuth from '../useAuth';

const NewAdmin = () => {

  const isAuthenticated = useAuth();

  const [userName, setUserName] = useState('');
  const [emp_name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCNIC] = useState('');
  const [pass, setPass] = useState('');
  const [address, setAddress] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [salary, setSalary] = useState('');

  const [title, setTitle] = useState('');
  const [authority, setAuthority] = useState('');

  const handleJoinDateChange = (e) =>{
    setJoinDate(e.target.value);
  };

  const handleUserNameChange = (e) =>{
    setUserName(e.target.value);
  };

  const handleNameChange = (e) =>{
    setName(e.target.value);
  };

  const handlePhoneChange = (e) =>{
    setPhone(e.target.value);
  };

  const handleCnicChange = (e) =>{
    setCNIC(e.target.value);
  };

  const handlePassChange = (e) =>{
    setPass(e.target.value);
  };

  const handleAddressChange = (e) =>{
    setAddress(e.target.value);
  };

  const handleTitleChange = (e) =>{
    setTitle(e.target.value);
  };

  const handleAuthorityChange = (e) =>{
    setAuthority(e.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here
    fetch('/NewAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userName,
            password: pass,
            fullName: emp_name,
            cnic: cnic,
            phone: phone,
            address: address,
            joinDate: joinDate,
            title: title,
            authority: authority,
            salary: salary
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data inserted successfully:', data);
          alert("Data inserted successfully");
          // Handle success or update UI accordingly
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
          alert("Error inserting data")
          // Handle error or display error message
        });
  };

  if (isAuthenticated === true ) {
  return (
    <div className="attendance-form-container1">
      <h2 className="form-heading">Create New Admin</h2>
      <form className="attendance-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="userName" className="form-label">
            Username:
          </label>
          <input type="text" id="userName" className="form-input" value={userName} onChange={handleUserNameChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="pass" className="form-label">
            Password:
          </label>
          <input type="password" id="pass" className="form-input" value={pass} onChange={handlePassChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name:
          </label>
          <input type="text" id="name" className="form-input" value={emp_name} onChange={handleNameChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="cnic" className="form-label">
            CNIC No:
          </label>
          <input type="number" id="cnic" className="form-input" value={cnic} onChange={handleCnicChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone No:
          </label>
          <input type="number" id="phone" className="form-input" value={phone} onChange={handlePhoneChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input type="text" id="address" className="form-input" value={address} onChange={handleAddressChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Join Date:
          </label>
          <input type="date" id="date" className="form-input" value={joinDate} onChange={handleJoinDateChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Job Title:
          </label>
          <input type="text" id="title" className="form-input" value={title} onChange={handleTitleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="authority" className="form-label">
            Authority:
          </label>
          <input type="text" id="authority" className="form-input" value={authority} onChange={handleAuthorityChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="salary" className="form-label">
            Salary:
          </label>
          <input type="number" id="salary" className="form-input" value={salary} onChange={handleSalaryChange} required />
        </div>

        <button type="submit" className="submit-button">Create</button>
      </form>
    </div>
  );
};

if (!isAuthenticated) {
  return null; // Redirection is handled in the hook, so no need to render anything
};

};

export default NewAdmin;
