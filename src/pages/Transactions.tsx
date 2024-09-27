import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaChevronDown, FaFileExport } from "react-icons/fa";

// Sample transaction data (You can replace this with your actual data fetching logic)
const transactions = [
  {
    id: '#1588955',
    owner: 'Albert Hussain',
    carType: 'Hyundai',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$287.12',
    status: 'Paid',
  },
  {
    id: '#1588955',
    owner: 'Smith Hasan',
    carType: 'Hyundai',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$120.14',
    status: 'Pending',
  },
  {
    id: '#1588955',
    owner: 'Jackson Kever',
    carType: 'Porsche',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$751.32',
    status: 'Paid',
  },
  {
    id: '#1588955',
    owner: 'Alex Jahan',
    carType: 'Bentley',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$214.32',
    status: 'Pending',
  },
  {
    id: '#1588955',
    owner: 'Jonson Lee',
    carType: 'Mercedes',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$142.00',
    status: 'Paid',
  },
  {
    id: '#1588955',
    owner: 'Robert Luicee',
    carType: 'Panamera',
    creationDate: '01 July, 2023',
    date: '03 July, 2023',
    totalMoney: '$71.10',
    status: 'Pending',
  },
  {
    id: '#1588955',
    owner: 'Robert Luicee',
    carType: 'Bentley',
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
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    carType: "",
    status: "",
  });

  const toggleTheme = () => setTheme(theme === "light" ? "yellow" : "light");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (selectedFilters.carType
        ? transaction.carType === selectedFilters.carType
        : true) &&
      (selectedFilters.status ? transaction.status === selectedFilters.status : true)
    );
  });

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
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
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
                  onClick={() => console.log("Export as CSV")}
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
        <div className="flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            Filter by
          </button>
          {showFilterDropdown && (
            <div className="ml-4 p-4 bg-white border rounded-lg shadow-lg">
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
          <tbody className="text-gray-600 text-sm">
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{transaction.id}</td>
                <td className="py-3 px-6">{transaction.owner}</td>
                <td className="py-3 px-6">{transaction.creationDate}</td>
                <td className="py-3 px-6">{transaction.carType}</td>
                <td className="py-3 px-6">{transaction.date}</td>
                <td className="py-3 px-6">{transaction.totalMoney}</td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      transaction.status === "Paid"
                        ? "bg-green-200 text-green-600"
                        : "bg-yellow-200 text-yellow-600"
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
