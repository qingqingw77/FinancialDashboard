/* Display the list */

function TransactionList({transactions, deleteTransaction}) {
  return (
    <div style={{ marginTop: "25px" }}>
      <h2 style={{color : "black"}}>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>
                  {tx.date}
                </td>
                <td>
                  {tx.title}
                </td>
                <td>
                  {tx.category}
                </td>
                <td>
                  {tx.account}
                </td>
                <td className={tx.type === "income" ? "income" : "expense"}>
                  {tx.type}
                </td>
                <td className={tx.type === "income" ? "income" : "expense"}>
                  {tx.type === "income" ? "+" : "-"}${tx.amount}
                </td>
                <td>
                  <button onClick={() => deleteTransaction(tx.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;