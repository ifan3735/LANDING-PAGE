import Table from '../components/Table';

const Transactions = () => {
  const headers = ["Transaction ID", "Car", "Amount", "Date", "Status"];
  const data = [
    ["TXN1234", "Toyota Camry", "$500", "2023-09-01", "Completed"],
    ["TXN5678", "Honda Civic", "$400", "2023-09-02", "Pending"],
    // more data
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default Transactions;
