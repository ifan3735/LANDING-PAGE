import TopBar from "../components/TopBar";
import { useState } from "react";
import { exportData } from "../utils/ExportData";
import { FaBars, FaChevronDown, FaFileExport } from "react-icons/fa";

const Deals = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    type: "",
    carType: "",
  });

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div
      className={`transition-all duration-500 p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData([])}
      />

      {/* Deals Section */}
      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold">Deals</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Export Button */}
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
        <div className="relative">
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center"
            onClick={toggleFilterDropdown}
          >
            <FaBars className="mr-2" />
            Filter by
          </button>

          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white border rounded-lg shadow-lg">
              <div className="mb-3">
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Type
                </label>
                <select
                  name="type"
                  value={selectedFilters.type}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full bg-gray-100 border rounded-md p-2"
                >
                  <option value="">All</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deals List Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 w-1/12">No.</th>
              <th className="py-2 w-2/12">Owner Name</th>
              <th className="py-2 w-2/12">Creation Date</th>
              <th className="py-2 w-2/12">Car Type</th>
              <th className="py-2 w-2/12">Return Date</th>
              <th className="py-2 w-1/12">Type</th>
              <th className="py-2 w-2/12">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over deals data here */}
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">#158895{index}</td>
                <td className="py-2">Owner Name {index}</td>
                <td className="py-2">01 July, 2023</td>
                <td className="py-2">Hyundai</td>
                <td className="py-2">03 July, 2023</td>
                <td className="py-2">Card</td>
                <td className="py-2">$ {148.82 + index * 10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;
