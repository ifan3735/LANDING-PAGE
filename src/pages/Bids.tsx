import Table from '../components/Table';

const Bids = () => {
  const headers = ["Bid ID", "Car", "Amount", "Date", "Status"];
  const data = [
    ["BID1234", "Toyota Camry", "$500", "2023-09-01", "Pending"],
    ["BID5678", "Honda Civic", "$400", "2023-09-02", "Accepted"],
    // more data
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Bids</h2>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default Bids;
