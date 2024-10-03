import TopBar from "../components/TopBar";
import { useState } from "react";
import { FaChevronDown, FaFileExport, FaFilter } from "react-icons/fa";

const Deals = () => {
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    carType: "",
    paymentType: "",
  });

  const dealsData = [
    {
      id: "#1588955",
      ownerName: "Albert Hussain",
      creationDate: "01 July, 2023",
      carType: "Hyundai",
      returnDate: "03 July, 2023",
      type: "Card",
      totalPrice: 148.82,
    },
    {
      id: "#1588956",
      ownerName: "Jonson Lee",
      creationDate: "05 July, 2023",
      carType: "Bentley",
      returnDate: "06 Aug, 2023",
      type: "Cash",
      totalPrice: 287.36,
    },
    // Add more data as per the design...
  ];

  const filteredDeals = dealsData.filter((deal) => {
    return (
      (selectedFilters.carType === "" || deal.carType === selectedFilters.carType) &&
      (selectedFilters.paymentType === "" || deal.type === selectedFilters.paymentType) &&
      (searchQuery === "" ||
        deal.ownerName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
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
  const toggleExportDropdown = () => setShowExportDropdown(!showExportDropdown);

  const handleExport = (format: string) => {
    console.log(`Export as ${format}`);
    setShowExportDropdown(false);
  };

  return (
    <div
      className={`transition-all duration-500 p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      {/* TopBar */}
      <TopBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          toggleTheme={toggleTheme}
          theme={theme} exportData={function (): void {
            throw new Error("Function not implemented.");
          } }      />
       
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
      {/* Deals List Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left border-b text-gray-600">
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
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2">{deal.id}</td>
                  <td className="py-2">{deal.ownerName}</td>
                  <td className="py-2">{deal.creationDate}</td>
                  <td className="py-2">{deal.carType}</td>
                  <td className="py-2">{deal.returnDate}</td>
                  <td className="py-2">{deal.type}</td>
                  <td className="py-2">${deal.totalPrice.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No deals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;
