import { SetStateAction, useState } from "react";
import TopBar from "../components/TopBar";
import { FaBars, FaChevronDown, FaFileExport } from "react-icons/fa";
import { useFetchAllPaymentsQuery } from "../features/API";
import jsPDF from "jspdf";

const Transactions = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useFetchAllPaymentsQuery();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    payment_method: "",
    payment_status: "",
  });

  const userId = localStorage.getItem("userId");

  const toggleTheme = () => setTheme(theme === "light" ? "yellow" : "light");

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) =>
    setSearchQuery(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const filteredTransactions = data
    ? data
        .filter((payment) => payment.booking?.user_id == userId) // Filter by user ID
        .filter((payment) => {
          const meetsAmountCriteria = payment.amount < 1000000;
          const matchesSearch = searchQuery
            ? payment.payment_method.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
          const matchesPaymentMethod = selectedFilters.payment_method
            ? payment.payment_method.toLowerCase() === selectedFilters.payment_method.toLowerCase()
            : true;
          const matchesPaymentStatus = selectedFilters.payment_status
            ? payment.payment_status.toLowerCase() === selectedFilters.payment_status.toLowerCase()
            : true;

          return meetsAmountCriteria && matchesSearch && matchesPaymentMethod && matchesPaymentStatus;
        })
    : [];

  const exportAsCSV = () => {
    const headers = "Payment ID, Booking ID, Amount, Status, Method, Date\n";
    const rows = filteredTransactions
      .map(
        (payment) =>
          `${payment.payment_id}, ${payment.booking_id}, ${payment.amount}, ${payment.payment_status}, ${payment.payment_method}, ${payment.payment_date}`
      )
      .join("\n");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "transactions_export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    let content = "Payment ID, Booking ID, Amount, Status, Method, Date\n";
    filteredTransactions.forEach((payment, index) => {
      content += `${index + 1}. ${payment.payment_id}, ${payment.booking_id}, ${payment.amount}, ${payment.payment_status}, ${payment.payment_method}, ${payment.payment_date}\n`;
    });
    doc.text(content, 10, 10);
    doc.save("transactions_export.pdf");
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
        theme={theme} exportData={function (): void {
          throw new Error("Function not implemented.");
        } }      />

      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
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
                  onClick={exportAsCSV}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={exportAsPDF}
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
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <p className="text-lg font-medium text-gray-600 animate-pulse">
              Loading transactions, please wait...
            </p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 p-8 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
            <svg
              className="w-16 h-16 text-blue-500 mb-6 animate-bounce-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-2xl font-semibold text-gray-800 mb-3">
              No Transactions Found
            </p>
            <p className="text-gray-600 text-center max-w-xs mb-6 leading-relaxed">
              It seems you haven’t made any transactions yet. Explore our listings or make a booking to get started.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
              onClick={() => (window.location.href = '/listings')}
            >
              Browse Listings
            </button>
          </div>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">No.</th>
                <th className="py-3 px-6 text-left">Booking ID</th>
                <th className="py-3 px-6 text-left">Creation Date</th>
                <th className="py-3 px-6 text-left">Method</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Total Money (Ksh)</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredTransactions.map((payment, index) => (
                <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{payment.booking_id}</td>
                  <td className="py-3 px-6">{payment.created_at}</td>
                  <td className="py-3 px-6">{payment.payment_method}</td>
                  <td className="py-3 px-6">{payment.payment_date}</td>
                  <td className="py-3 px-6">{payment.amount}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`text-sm font-semibold ${
                        payment.payment_status === "Paid"
                          ? "text-green-500 bg-green-100"
                          : "text-yellow-500 bg-yellow-100"
                      } rounded-xl py-1 px-3`}
                    >
                      {payment.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transactions;
