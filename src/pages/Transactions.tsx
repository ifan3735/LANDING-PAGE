import { SetStateAction, useState } from "react";
import TopBar from "../components/TopBar";
import { FaBars, FaChevronDown, FaFileExport } from "react-icons/fa";
import { useFetchAllPaymentsQuery } from "../features/API";
import jsPDF from "jspdf";

// Sample transaction data with profile images and car images (You can replace this with your actual data fetching logic)
const transactions = [
  {
    id: '#1588955',
    owner: 'Albert Hussain',
    profileImage: 'https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg', // Replace with the actual path to profile image
    carType: 'Hyundai',
    carImage: 'https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg', // Replace with the actual path to car image
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$287.12',
    status: 'Paid',
  },
  {
    id: '#1588955',
    owner: 'Smith Hasan',
    profileImage: 'https://i.pinimg.com/236x/ad/15/5b/ad155b4cfd5b6d220c3e5b51b349a37a.jpg',
    carType: 'Hyundai',
    carImage: 'https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$120.14',
    status: 'Pending',
  },
  {
    id: '#1588955',
    owner: 'Jackson Kever',
    profileImage: 'https://i.pinimg.com/474x/92/2c/7b/922c7bf1789889bdd77c9244da54c1ea.jpg',
    carType: 'Porsche',
    carImage: 'https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$751.32',
    status: 'Paid',
  },
  {
    id: '#1588955',
    owner: 'Alex Jahan',
    profileImage: 'https://i.pinimg.com/236x/a7/70/93/a77093488d790ab3a2b1a86c37af19a7.jpg',
    carType: 'Bentley',
    carImage: 'https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$214.32',
    status: 'Pending',
  },
  {
    id: '#1588955',
    owner: 'Jonson Lee',
    profileImage: 'https://i.pinimg.com/236x/55/63/31/556331581172c567af13dc5787455d74.jpg',
    carType: 'Mercedes',
    carImage: 'https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$142.00',
    status: 'Paid',
  },
  {
    id: '#1588955',
    owner: 'Robert Luicee',
    profileImage: 'https://i.pinimg.com/564x/5d/81/ed/5d81ed175d9b3d943b7f259bb0eb8b79.jpg',
    carType: 'Panamera',
    carImage: 'https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$71.10',
    status: 'Pending',
  },
  {
    id: '#1588955',
    owner: 'Robert Luicee',
    profileImage: 'https://i.pinimg.com/236x/ca/4d/c3/ca4dc36ae9c8795248059a8ac9dbc52c.jpg',
    carType: 'Bentley',
    carImage: 'https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$211.22',
    status: 'Paid',
  },
];

const Transactions = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useFetchAllPaymentsQuery();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    payment_method: "",
    payment_status: "",
  });

  const toggleTheme = () => setTheme(theme === "light" ? "yellow" : "light");

  const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const filteredTransactions = isLoading && data
    ? data.filter((payments) => {
        const matchesSearch = payments.payment_method
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesPaymentMethod = selectedFilters.payment_method
          ? payments.payment_method.toLowerCase() === selectedFilters.payment_method.toLowerCase()
          : true;
        const matchesPaymentStatus = selectedFilters.payment_status
          ? payments.payment_status.toLowerCase() === selectedFilters.payment_status.toLowerCase()
          : true;
          return matchesSearch && matchesPaymentMethod && matchesPaymentStatus;
        
})
    : [];

    const exportAsCSV = () => {
      const headers = "Name,Style,Type,Color,Price\n";
      const rows = filteredCars
        .map((Vehicle) => `${Vehicle.vehicle_specs.model},${Vehicle.vehicle_specs.manufacturer},${Vehicle.fuel_type},${Vehicle.color},${Vehicle.rental_rate}`)
        .join("\n");
  
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "cars_export.csv";
      link.click();
      URL.revokeObjectURL(url);
    };

    const exportAsPDF = () => {
      const doc = new jsPDF();
      let content = "Name, Style, Type, Color, Price\n";
      filteredCars.forEach((Vehicle, index) => {
        content += `${index + 1}. ${Vehicle.vehicle_specs.model}, ${Vehicle.vehicle_specs.manufacturer}, ${Vehicle.fuel_type}, ${Vehicle.color}, ${Vehicle.rental_rate}\n`;
      });
      doc.text(content, 10, 10);
      doc.save("cars_export.pdf");
    };
  

  return (
    <div
      className={`transition-all duration-500 p-6 ${
        theme === "yellow" ? "bg-yellow-100 text-gray-900" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      {/* New Layer Below Top Bar */}
      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

          {/* Export Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={exportAsCSV}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log("Export as PDF")}
                >
                  Export as PDF
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transaction List</h2>
        <div className="flex items-center">
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <FaBars className="mr-2" />
            Filter by
          </button>
          {showFilterDropdown && (
            <div className="absolute right-0 top-0 ml-4 p-4 bg-white border rounded-lg shadow-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Car Type
                </label>
                <select
                  name="carType"
                  value={selectedFilters.carType}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full bg-gray-100 border rounded-md p-2"
                >
                  <option value="">All</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Bentley">Bentley</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Panamera">Panamera</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={selectedFilters.status}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full bg-gray-100 border rounded-md p-2"
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Owner Name</th>
              <th className="py-3 px-6 text-left">Creation Date</th>
              <th className="py-3 px-6 text-left">Car Type</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Total Money</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6"><span className="text-gray-400">{transaction.id}</span></td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={transaction.profileImage}
                    alt={transaction.owner}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  {transaction.owner}
                </td>
                <td className="py-3 px-6"><span className="text-gray-400">{transaction.creationDate}</span></td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={transaction.carImage}
                    alt={transaction.carType}
                    className="w-8 h-8 mr-2"
                  />
                  {transaction.carType}
                </td>
                <td className="py-3 px-6"><span className="text-gray-400">{transaction.date}</span></td>
                <td className="py-3 px-6">
                  <span className="text-blue-600 bg-blue-100 rounded-xl py-1 px-3">{transaction.totalMoney}</span></td>
                <td className="py-3 px-6">
                  <span
                    className={`text-sm font-semibold ${
                      transaction.status === "Paid"
                        ? "text-green-500 bg-green-100 rounded-xl py-1 px-3"
                        : "text-yellow-500 bg-yellow-100 rounded-xl py-1 px-3"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
