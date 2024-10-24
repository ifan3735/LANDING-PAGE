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

  const filteredTransactions = !isLoading && data
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
      const rows = filteredTransactions
        .map((Payments) => `${Payments.payment_id}, ${Payments.booking_id}, ${Payments.amount}, ${Payments.payment_status}, ${Payments.payment_method}, ${Payments.payment_date}`)
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
      filteredTransactions.forEach((Payments, index) => {
        content += `${index + 1}. ${Payments.payment_id}, ${Payments.booking_id}, ${Payments.amount}, ${Payments.payment_status}, ${Payments.payment_method}, ${Payments.payment_date}\n`;
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
                  onClick={exportAsPDF}
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
                payment_status
                </label>
                <select
                  name="status"
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
            {filteredTransactions.map((Payments) => (
              <tr
                key={Payments.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6"><span className="text-gray-400">{Payments.id}</span></td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={Payments.profileImage}
                    alt={Payments.owner}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  {Payments.owner}
                </td>
                <td className="py-3 px-6"><span className="text-gray-400">{Payments.creationDate}</span></td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={Payments.carImage}
                    alt={Payments.carType}
                    className="w-8 h-8 mr-2"
                  />
                  {Payments.carType}
                </td>
                <td className="py-3 px-6"><span className="text-gray-400">{Payments.date}</span></td>
                <td className="py-3 px-6">
                  <span className="text-blue-600 bg-blue-100 rounded-xl py-1 px-3">${Payments.amount}</span></td>
                <td className="py-3 px-6">
                  <span
                    className={`text-sm font-semibold ${
                      Payments.status === "Paid"
                        ? "text-green-500 bg-green-100 rounded-xl py-1 px-3"
                        : "text-yellow-500 bg-yellow-100 rounded-xl py-1 px-3"
                    }`}
                  >
                    {Payments.status}
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
