/* export the transaction report to local */

export function exportCSV(transactions) {
  const headers = [
    "Date",
    "Title",
    "Category",
    "Type",
    "Amount"
  ];

  const rows = transactions.map((tx) => [
    tx.date,
    tx.title,
    tx.category,
    tx.type,
    tx.amount
  ]);

  const csvContent = [
    headers,
    ...rows
  ]
    .map(row => row.join(","))
    .join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;"
    }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "finance-report.csv";

  link.click();
  URL.revokeObjectURL(url);

}