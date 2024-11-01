import TopBar from "../components/TopBar";
import { useState } from "react";
import { exportData } from "../utils/ExportData";
import { FaBars, FaChevronDown, FaFileExport } from "react-icons/fa";
import { useFetchAllPaymentsQuery } from "../features/API";

const deals = [
  {
    id: "#1588955",
    owner: "Albert Hussain",
    profileImage:
      "https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg",
    carType: "Hyundai",
    carImage:
      "https://i.pinimg.com/564x/b4/98/19/b49819361c4458ad4256ca04a6aab850.jpg",
    creationDate: "01 July, 2023",
    date: "03 July, 2023",
    totalMoney: "$287.12",
    status: "Paid",
    type: "Card"
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
    type: 'Cash'
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
    type: 'Card'
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
    type: 'Cash'
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
    type: 'Card'
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
    type: 'Cash'
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
    type: 'Card'
  },
];

const Deals = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const { data, isLoading } = useFetchAllPaymentsQuery();
  const [selectedFilters, setSelectedFilters] = useState({
    carType: "",
    status: "",
  });

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "yellow" : "light"));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleFilterDropdown = () =>
    setShowFilterDropdown((prev) => !prev);

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  // Filtering logic
  const filteredDeals = deals.filter((deal) => {
    const matchesCarType =
      !selectedFilters.carType || deal.carType === selectedFilters.carType;
    const matchesStatus =
      !selectedFilters.status || deal.status === selectedFilters.status;
    return matchesCarType && matchesStatus;
  });

  return (
    <div
      className={`transition-all duration-500 p-6 ${
        theme === "yellow"
          ? "bg-yellow-100 text-gray-900"
          : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData(filteredDeals)}
      />

      {/* New Layer Below Top Bar */}
      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Deals</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

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
        <h2 className="text-xl font-semibold">Deals List</h2>
        <div className="flex items-center">
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center"
            onClick={toggleFilterDropdown}
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
                  Type
                </label>
                <select
                  name="status"
                  value={selectedFilters.status}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full bg-gray-100 border rounded-md p-2"
                >
                  <option value="">All</option>
                  <option value="Paid">Card</option>
                  <option value="Pending">Cash</option>
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
              <th className="py-3 px-6 text-left">Return Date</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredDeals.map((deal) => (
              <tr
                key={deal.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6"><span className="text-gray-400">{deal.id}</span></td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={deal.profileImage}
                    alt={deal.owner}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  {deal.owner}
                </td>
                <td className="py-3 px-6"><span className="text-gray-400">{deal.creationDate}</span></td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={deal.carImage}
                    alt={deal.carType}
                    className="w-8 h-8 mr-2"
                  />
                  {deal.carType}
                </td>
                <td className="py-3 px-6"><span className="text-gray-400">{deal.date}</span></td>
                <td className="py-3 px-6">
                    {deal.type}
                </td>
                <td className="py-3 px-6">
                  <span className="text-blue-600 bg-blue-50 rounded-xl py-1 px-3">{deal.totalMoney}</span> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;
