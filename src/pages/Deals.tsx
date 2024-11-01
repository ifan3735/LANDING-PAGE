import TopBar from "../components/TopBar";
import { useState, useEffect } from "react";
import { exportData } from "../utils/ExportData";
import { FaBars, FaChevronDown, FaFileExport } from "react-icons/fa";
import { useFetchAllPaymentsQuery, useFetchAllVehiclesQuery } from "../features/API";

const Deals = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  interface Deal {
    id: string;
    owner: string;
    created_at: string;
    payment_status: string;
    payment_date: string;
    payment_method: string;
    amount: number;
  }

  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    payment_method: "",
    payment_status: "",
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

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  // Fetch and merge payments and vehicles data
  const { data: paymentsData, isLoading: isPaymentsLoading } = useFetchAllPaymentsQuery();
  const { data: vehiclesData, isLoading: isVehiclesLoading } = useFetchAllVehiclesQuery();

  useEffect(() => {
    if (!isPaymentsLoading && !isVehiclesLoading && paymentsData && vehiclesData) {
      console.log("Payments Data:", paymentsData);
      console.log("Vehicles Data:", vehiclesData);

      // Combine payments and vehicles data
      const mergedDeals = paymentsData
        .filter((payment) => payment.booking?.user_id == userId) // Only deals for the logged-in user
        .map((payment) => {
          // Find the vehicle associated with this payment
          const Vehicle = vehiclesData.find((v) => v.id === payment.vehicleId);

          return {
            ...payment,
            owner: Vehicle?.vehicle_specs.owner_name || "Nazarene",  // Owner from vehicles data
            carType: Vehicle?.vehicle_specs.manufacturer || "Unknown Car Type", // Car Type from vehicles data
          };
        })
        .filter((deal) => {
           // New condition to filter by amount >= 1,000,000
        const meetsAmountCriteria = deal.amount >= 1000000;
          // Apply additional filters here (e.g., search, car type, payment method, etc.)
          const matchesSearch = searchQuery
            ? deal.payment_method.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

          const matchesPaymentMethod = selectedFilters.payment_method
            ? deal.payment_method.toLowerCase() === selectedFilters.payment_method.toLowerCase()
            : true;

          const matchesCarType = selectedFilters.payment_status
            ? deal.carType.toLowerCase() === selectedFilters.payment_status.toLowerCase()
            : true;

          return meetsAmountCriteria && matchesSearch && matchesPaymentMethod && matchesCarType;
        });

      console.log("Filtered and Merged Deals:", mergedDeals);
      setFilteredDeals(mergedDeals);
    }
  }, [paymentsData, vehiclesData, isPaymentsLoading, isVehiclesLoading, searchQuery, selectedFilters, userId]);

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

      <div className="flex justify-between items-center mb-4 relative">
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
            <div className="absolute right-0 top-12 mt-2 bg-white border rounded-lg shadow-lg p-4 w-64 z-10">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  name="payment_method"
                  value={selectedFilters.payment_method}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full bg-gray-100 border rounded-md p-2"
                >
                  <option value="">All</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Status
                </label>
                <select
                  name="payment_status"
                  value={selectedFilters.payment_status}
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Owner Name</th>
              <th className="py-3 px-6 text-left">Creation Date</th>
              <th className="py-3 px-6 text-left">Car Type</th>
              <th className="py-3 px-6 text-left">Payment Date</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal, index) => (
                <tr key={deal.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6"><span className="text-gray-400">{index + 1}</span></td>
                  <td className="py-3 px-6 flex items-center">{deal.owner}</td>
                  <td className="py-3 px-6"><span className="text-gray-400">{deal.created_at}</span></td>
                  <td className="py-3 px-6 flex items-center">{deal.payment_status}</td>
                  <td className="py-3 px-6"><span className="text-gray-400">{deal.payment_date}</span></td>
                  <td className="py-3 px-6">{deal.payment_method}</td>
                  <td className="py-3 px-6">
                    <span className="text-blue-600 bg-blue-50 rounded-xl py-1 px-3">{deal.amount}</span> 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No deals found for the current user.
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
