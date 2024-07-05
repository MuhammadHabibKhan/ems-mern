import React, { useState, useEffect } from 'react';
import '../NewAdmin/index.css';
import useAuth from '../useAuth';

const EditOrder = () => {
  
    const isAuthenticated = useAuth();

    const [company, setCompany] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [material, setMaterial] = useState('');
    const [totalRunningFT, setTotalRunningFT] = useState('');
    const [ratePerFT, setRatePerFT] = useState('');
    const [color, setColor] = useState('');
    const [cost, setCost] = useState('');
    const [advance, setAdvance] = useState('');
    const [oldBalance, setOldBalance] = useState('');

    const [companyList, setCompanyList] = useState([]);
    
    const [order, setOrder] = useState('');
    const [orderList, setOrderList] = useState([]);

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/getOrderDetails?orderID=${encodeURIComponent(order)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        
        const data = await response.text();
        var parsedData = JSON.parse(data);
        setMaterial(parsedData.material);
        setTotalRunningFT(parsedData.totalFT);
        setRatePerFT(parsedData.ratePerFT);
        setColor(parsedData.color);
        setAdvance(parsedData.advance);
        setOrderDate(parsedData.date);
  
      } catch (error) {
        console.log('Error fetching order details:', error);
      }
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`/getOrders?company=${encodeURIComponent(company)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        
        const data = await response.text();
        var parsedData = JSON.parse(data);
        setOrderList(parsedData);
  
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    }

    useEffect(() => {
      fetchClientList();
    }, []);

    const updateBalance = async () => {

      fetch(`/EditClient?company=${encodeURIComponent(company)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            balance: oldBalance + cost - advance
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data updated successfully:', data);
          alert("Data updated successfully");
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert("Error updating data")
        });
    }

    useEffect(() => {
      fetchBalance();
      fetchOrders();
    }, [company]);
  
    const fetchBalance = async () => {
      try {
        const response = await fetch(`/getCompany?company=${encodeURIComponent(company)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        
        const data = await response.text();
        var parsedData = JSON.parse(data);
        setOldBalance(parsedData.balance);
  
      } catch (error) {
        console.log('Error fetching name:', error);
      }
    };

    useEffect(() => {
      setCost(totalRunningFT * ratePerFT);
    }, [totalRunningFT, ratePerFT]);

    const fetchClientList = async () => {
      try {
        const response = await fetch('/getClient', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        
        const data = await response.text();
        var parsedData = JSON.parse(data);
        setCompanyList(parsedData);
  
      } catch (error) {
        console.log('Error fetching user list:', error);
      }
    };

    useEffect(() => {
      fetchOrderDetails();
    }, [order]);

    const handleOrderChange = (e) => {
      setOrder(e.target.value);
    };

    const handleMaterialChange = (e) =>{
      setMaterial(e.target.value);
    };

    const handleTotalRunningFT = (e) =>{
      setTotalRunningFT(e.target.value);
    };

    const handleRatePerFT = (e) =>{
      setRatePerFT(e.target.value);
    };

    const handleColorChange = (e) =>{
      setColor(e.target.value);
    };

    const handleCostChange = (e) =>{
      setCost(e.target.value);
    };

    const handleAdvanceChange = (e) =>{
      setAdvance(e.target.value);
    };

    const handleCompanyChange = (e) =>{
      setCompany(e.target.value);
    };

    const handleOrderDateChange = (e) => {
      setOrderDate(e.target.value);
    }

    const handleSubmit = (event) =>
    {
      event.preventDefault();
    
      fetch(`/EditOrder?orderID=${encodeURIComponent(order)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company: company,
            date: orderDate,
            material: material,
            totalFT: totalRunningFT,
            ratePerFT: ratePerFT,
            color: color,
            totalCost: cost,
            advance: advance
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Data updated successfully:', data);
            alert("Data updated successfully");
          })
          .catch((error) => {
            console.error('Error updating data:', error);
            alert("Error updating data")
          });
      updateBalance();
    };

    const handleReset = (event) => {
      event.preventDefault();
      
      fetch(`/DeleteOrder?orderID=${encodeURIComponent(order)}`, {
          method: 'DELETE'
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Order deleted successfully:', data);
            alert("Order deleted successfully");
          })
          .catch((error) => {
            console.error('Error deleting order:', error);
            alert("Error deleting order")
          });
    };

  if (isAuthenticated === true ) {
    return (
        <div className="attendance-form-container1">
          <h2 className="form-heading">Edit Order</h2>
          <form className="attendance-form" onSubmit={handleSubmit} onReset={handleReset}>
    
            <div className="form-group">
              <label htmlFor="userID" className="form-label">
                Company:
              </label>
              <select id="userID" className="form-select" value={company} onChange={handleCompanyChange} required>
                <option value="">Select Company</option>

                {companyList.map((user) => (
                  <option key={user._id} value={user.company}>
                    {user.company}
                  </option>
                ))}

              </select>
            </div>

            <div className="form-group">
              <label htmlFor="orderID" className="form-label">
                Order ID:
              </label>
              <select id="orderID" className="form-select" value={order} onChange={handleOrderChange} required>
                <option value="">Select Order</option>

                {orderList.map((order) => (
                  <option key={order._id} value={order._id}>
                    {order.date.slice(0,10) + " | " + order.color + " | " + order.totalFT + "sq. ft"}
                  </option>
                ))}

              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input type="date" id="date" className="form-input" value={orderDate} onChange={handleOrderDateChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="orderID" className="form-label">
                Material:
              </label>
              <input type="text" id="orderID" className="form-input" value={material} onChange={handleMaterialChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="totalFT" className="form-label">
                Total Ft:
              </label>
              <input type="Number" step={"0.1"} id="totalFT" className="form-input" value={totalRunningFT} onChange={handleTotalRunningFT} required />
            </div>

            <div className="form-group">
              <label htmlFor="rate" className="form-label">
                Rate / Ft:
              </label>
              <input type="Number" step={"1"} id="rate" className="form-input" value={ratePerFT} onChange={handleRatePerFT} required />
            </div>

            <div className="form-group">
              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <input type="text" id="color" className="form-input" value={color} onChange={handleColorChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="cost" className="form-label">
                Total Cost:
              </label>
              <input type="Number" id="cost" className="form-input" value={cost} onChange={handleCostChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="advance" className="form-label">
                Advance:
              </label>
              <input type="Number" id="advance" className="form-input" value={advance} onChange={handleAdvanceChange} required />
            </div>
            
            <button type="submit" className="submit-button">Update</button>
            <button type="reset" className="delete-button">Delete</button>

          </form>
        </div>
      );
    };

    if (!isAuthenticated) {
      return null; // Redirection is handled in the hook, so no need to render anything
    };

};
    
export default EditOrder;
