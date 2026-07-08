/* Add each transaction to the financial system */

import { useState } from "react";
import { categories } from "../data/categories";
import { accounts } from "../data/accounts";

function AddTransaction({addTransaction}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("Cash");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Handles form submission when the user adds a new transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title.trim()) return;
    if (!amount || Number(amount) <= 0) return;

    // Create a new transaction object
    const newTx = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      account,
      date
    };

    // Pass the new transaction to App.jsx
    addTransaction(newTx);

    // Reset the form fields
    setTitle("");
    setAmount("");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Title</label>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Category</label>
      <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}>
        {categories.map(cat=>(
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  
    <div className="form-group">
      <label>Account</label>
      <select
        value={account}
        onChange={(e)=>setAccount(e.target.value)}>
        {accounts.map(acc=>(
          <option key={acc.id} value={acc.name}>
            {acc.name}
          </option>
        ))}
      </select>
    </div>
  
    <div className="form-group">
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />
    </div>
  
    <div className="form-group">
      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />
    </div>
  
    <div className="form-group">
      <label>Type</label>
      <select
        value={type}
        onChange={(e)=>setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  
    <button className="submit-btn" type="submit">
        + Add Transaction
    </button>
  </form>
  );
}

export default AddTransaction;