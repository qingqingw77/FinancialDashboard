/* Manage the application state and coordinate all components */
import { useState, useEffect } from "react";
import Chart from "./components/Chart";
import ExpensePieChart from "./components/ExpensePieChart";
import "./App.css";
import Summary from "./components/Summary";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import FinancialInsights from "./components/FinancialInsights";
import { exportCSV } from "./utils/exportCSV";
import MonthlyReport from "./components/MonthlyReport";
import AccountSummary from "./components/AccountSummary";

function App() {
  /*lazy initialization*/
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
  
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  // state declaration
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [filter, setFilter] = useState("all");

  const totalIncome = transactions
  .filter(t => t.type === "income")
  .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
  .filter(t => t.type === "expense")
  .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const addTransaction = (newTx) => {
    setTransactions([...transactions, newTx]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  // database set
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // UI layout
  return (
    <div className="app">
      
      {/* Header */}
      <h2 style={{fontSize : "40px", color : "black"}}>Finance Dashboard</h2>
      <button onClick={() => exportCSV(transactions)}>📥 Export Report</button>

      {/* Summary Section */}
      <Summary
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("income")}>Income</button>
        <button onClick={() => setFilter("expense")}>Expense</button>
      </div>

      {/* Chart Section */}
      <div className="charts">
        <Chart transactions={transactions} />   
        <ExpensePieChart transactions={transactions} />
      </div>

      {/* Financial Insight Section */}
      <FinancialInsights transactions={transactions}/>

      {/* Monthly Report Section */}
      <MonthlyReport transactions={transactions}/>

      {/* Account Summary Section */}
      <AccountSummary transactions={transactions}/>

      {/* Transaction Section */}
      <AddTransaction addTransaction={addTransaction} />

      {/* List */}
      <TransactionList transactions={filteredTransactions} deleteTransaction={deleteTransaction}/>

    </div>
  );
}

export default App;