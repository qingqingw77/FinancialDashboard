// For bookkeeping, to monitor the asset under each account to determine asset and liability */ 
function AccountSummary({transactions}) {

  const balances = {};
 
  // Go through each transaction to display each account's balance
  transactions.forEach((tx)=>{
    if(!balances[tx.account]){
      balances[tx.account]=0;
    }
    if(tx.type==="income"){
      balances[tx.account]+=tx.amount;
    }
    else{
      balances[tx.account]-=tx.amount;
    }
  });
 
  return (
    <div className="account-summary">
      <h2>Accounts</h2>
      {
        Object.keys(balances).map((account)=>(
          <p key={account}>
            <span>{account}</span>
            <strong className={ balances[account] >= 0
            ? "positive"
            : "negative"
          }>${balances[account]}</strong>
          </p>
     ))}
  </div>
  );
}
 
export default AccountSummary;