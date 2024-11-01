import TopBar from "../components/TopBar";
import { useState } from "react";
import { exportData } from "../utils/ExportData";
import { FaBars, FaChevronDown, FaFileExport } from "react-icons/fa";
import { useFetchAllPaymentsQuery } from "../features/API";



const Deals = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const { data, isLoading } = useFetchAllPaymentsQuery();
  const [selectedFilters, setSelectedFilters] = useState({
    payment_method: "",
    status: "",
  });

  const userId = localStorage.getItem("userId");

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
  const filteredDeals = !isLoading && data
  ? data
      .filter((payment) => {
        const paymentUserId = payment.booking?.user_id; // Capture `user_id` in `booking`
        console.log("Logged-in userId:", userId);
        console.log("Transaction user_id from booking:", paymentUserId);
        
        const isUserMatch = paymentUserId == userId; // Loose equality check
        console.log("Does userId match for this transaction?", isUserMatch);
        
        return isUserMatch;
      })
      .filter((payment) => {
        // Filter based on search query
        const matchesSearch = searchQuery
          ? payment.payment_method.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        console.log("Search query match:", matchesSearch, "for payment:", payment);

        // Filter based on selected payment method
        const matchesPaymentMethod = selectedFilters.payment_method
          ? payment.payment_method.toLowerCase() === selectedFilters.payment_method.toLowerCase()
          : true;
        console.log("Payment method match:", matchesPaymentMethod, "for payment:", payment);

        // Filter based on selected payment status
        const matchesPaymentStatus = selectedFilters.payment_status
          ? payment.payment_status.toLowerCase() === selectedFilters.payment_status.toLowerCase()
          : true;
        console.log("Payment status match:", matchesPaymentStatus, "for payment:", payment);

        // Return true if all conditions match
        const isMatch = matchesSearch && matchesPaymentMethod && matchesPaymentStatus;
        console.log("Final match result for payment:", isMatch, "for payment:", payment);
        return isMatch;
      })
  : [];

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
