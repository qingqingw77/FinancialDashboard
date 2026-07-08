/* 
Display the overall financial summary
As displayed on website shows three total values to give client an overall financial state
*/

function Summary({totalIncome, totalExpense, balance}) {
  return (
    <div className="summary">
      <Card
        title="Total Income"
        value={totalIncome}
        type="income"
      />

      <Card
        title="Total Expense"
        value={totalExpense}
        type="expense"
      />

      <Card
        title="Balance"
        value={balance}
        type="balance"
      />
    </div>
  );
}

function Card({title, value, type}) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <h2 className={type}>
        ${value.toLocaleString()}
      </h2>
    </div>
  );
}

export default Summary;