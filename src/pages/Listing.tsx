import Table from '../components/Table';

const Listings = () => {
  const headers = ["Car", "Model", "Year", "Status"];
  const data = [
    ["Toyota", "Camry", "2020", "Available"],
    ["Honda", "Civic", "2019", "Rented"],
    ["Ford", "Mustang", "2021", "Available"],
    // more data
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Listings</h2>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default Listings;
