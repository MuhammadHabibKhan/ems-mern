import React, { useState } from 'react';
import useAuth from '../useAuth';

const NewClient = () => {

  const isAuthenticated = useAuth();

  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCNIC] = useState('');
  const [ntn, setNTN] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  

  const handleCompanyChange = (e) =>{
    setCompany(e.target.value);
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

  const handleAddressChange = (e) =>{
    setAddress(e.target.value);
  };

  const handleNTNChange = (e) => {
    setNTN(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/NewClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            company: company,
            owner: name,
            cnic: cnic,
            phone: phone,
            address: address,
            ntn: ntn,
            balance: balance
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data inserted successfully:', data);
          alert("Data inserted successfully");
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
          alert("Error inserting data")
        });
  };

  if (isAuthenticated === true ) {
  return (
    <div className="attendance-form-container1">
      <h2 className="form-heading">Create New Client</h2>
      <form className="attendance-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="company" className="form-label">
            Company:
          </label>
          <input type="text" id="company" className="form-input" value={company} onChange={handleCompanyChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Owner:
          </label>
          <input type="text" id="name" className="form-input" value={name} onChange={handleNameChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="cnic" className="form-label">
            CNIC No:
          </label>
          <input type="number" id="cnic" className="form-input" value={cnic} onChange={handleCnicChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="ntn" className="form-label">
            NTN:
          </label>
          <input type="number" id="ntn" className="form-input" value={ntn} onChange={handleNTNChange} required />
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
          <label htmlFor="balance" className="form-label">
            Balance:
          </label>
          <input type="number" id="balance" className="form-input" value={balance} onChange={handleBalanceChange} required />
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

export default NewClient;
