
// InvoicingForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrenciesData from '../currencies.json'
import InputField from './components/InputField';

function InvoicingForm() {
  // useEffect(() => {
  //   const response = fetch('https://openexchangerates.org/api/currencies.json');
  //   const data = response;
  //   setCurrencies(data) 
  //   setLoading(false)
  //   console.log(currencies) 
  // }, []);

  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true)
  const [currencies, setCurrencies] = useState(CurrenciesData)
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    clientName: '',
    projectDescription: '',
    issuedOn: '',
    dueOn: '',
    billFrom: '',
    billTo: '',
    currency: '',
    items: [],
    notes: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Update input fields for Quantity, Price and Total Price
  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const items = [...formData.items];
    const item = items[index];

    if (name === "price" || name === "quantity") {
      item[name] = parseFloat(value);
      item.totalPrice = item.price * item.quantity;
    } else {
      item[name] = value;
    }

    const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);

    setFormData({
      ...formData,
      items,
      totalPrice,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item: '', price: '', quantity: '1', totalPrice: '' }]
    });
  };

  const removeItem = (index) => {
    const items = [...formData.items];
    items.splice(index, 1);
    setFormData({
      ...formData,
      items
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/preview', {state: {formData} });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        title="Recipient name"
        onChange={handleInputChange}
        type="text"
        name="recipientName"
        value={formData.recipientName}
      />
      <InputField
        title="Recipient email"
        onChange={handleInputChange}
        type="email"
        name="recipientEmail"
        value={formData.recipientEmail}
      />
      <InputField
        title="Client name"
        onChange={handleInputChange}
        type="text"
        name="clientName"
        value={formData.clientName}
      />
      <InputField
        title="Project Description"
        onChange={handleInputChange}
        type="text"
        name="projectDescription"
        value={formData.projectDescription}
      />
      <InputField
        title="Project Description"
        onChange={handleInputChange}
        type="text"
        name="projectDescription"
        value={formData.projectDescription}
      />
      <InputField
        title="Issued On"
        onChange={handleInputChange}
        type="date"
        name="issuedOn"
        value={formData.issuedOn}
      />
      <InputField
        title="Due On"
        onChange={handleInputChange}
        type="date"
        name="dueOn"
        value={formData.dueOn}
      />
      <InputField
        title="Bill From"
        onChange={handleInputChange}
        type="text"
        name="billFrom"
        value={formData.billFrom}
      />
      <InputField
        title="Bill To"
        onChange={handleInputChange}
        type="text"
        name="billTo"
        value={formData.billTo}
      />
      <label>
        <select
          name="currency"
          id="currency"
          value={formData.currency}
          onChange={handleInputChange}
        >
          {Object.keys(currencies).map((currency) => {
            return <option key={currency}>{currency} </option>;
          })}
        </select>
      </label>
      <h2 >Items</h2>
      {formData.items.map((item, index) => (
        <div key={index}>
          <label>
            Item:
            <input
              type="text"
              name="item"
              value={item.item}
              onChange={(event) => handleItemChange(event, index)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              min="0"
              step="0.01"
              name="price"
              value={item.price}
              onChange={(event) => handleItemChange(event, index)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              name="quantity"
              value={item.quantity}
              onChange={(event) => handleItemChange(event, index)}
            />
          </label>
          <label>
            Total Price:
            <input
              type="number"
              min="0"
              step="0.01"
              name="totalPrice"
              value={item.totalPrice}
              readOnly
            />
          </label>
          <button type="button" onClick={() => removeItem(index)}>
            Remove Item
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Add Item
      </button>
      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Preview</button>
    </form>
  );
}

export default InvoicingForm;
