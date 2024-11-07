import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaChevronDown, FaFileExport, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useFetchAllBookingsQuery } from "../features/API";
import jsPDF from "jspdf";

const Calendar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useFetchAllBookingsQuery();
  console.log(data);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    type: "",
    year: new Date().getFullYear(),
  });
  const [today, setToday] = useState(new Date());

  const userId = localStorage.getItem("userId");

  // Toggle functions
  const toggleTheme = () => setTheme(theme === "light" ? "yellow" : "light");
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  // Date utility functions for calendar navigation
  const nextWeek = () => setCurrentWeekOffset((prevOffset) => prevOffset + 1);
  const prevWeek = () =>
    setCurrentWeekOffset((prevOffset) => (prevOffset > 0 ? prevOffset - 1 : 0));

  const getWeekStartDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + currentWeekOffset * 7);
    return new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  };

  const getCurrentWeekDates = () => {
    const startOfWeek = getWeekStartDate();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  };

  const currentDates = getCurrentWeekDates();

  // Filter bookings for the logged-in user
  const filteredBookings = data
    ? data.filter((booking) => booking.user_id === userId)
    : [];
    console.log(filteredBookings);

  // Export functions
  const exportAsCSV = () => {
    const headers = "Payment ID, Booking ID, Amount, Status, Method, Date\n";
    const rows = filteredBookings
      .map(
        (booking) =>
          `${booking.payment_id}, ${booking.booking_id}, ${booking.amount}, ${booking.payment_status}, ${booking.payment_method}, ${booking.payment_date}`
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
    filteredBookings.forEach((booking, index) => {
      content += `${index + 1}. ${booking.payment_id}, ${booking.booking_id}, ${booking.amount}, ${booking.payment_status}, ${booking.payment_method}, ${booking.payment_date}\n`;
    });
    doc.text(content, 10, 10);
    doc.save("transactions_export.pdf");
  };

  return (
    <div
      className={`flex-1 p-6 ${
        theme === "yellow" ? "bg-yellow-100 text-gray-900" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <TopBar
        searchQuery={searchQuery}
        handleSearch={(e) => setSearchQuery(e.target.value)}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      {/* Header with Export and Dropdowns */}
      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        <div className="relative flex items-center space-x-4">
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

      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="flex items-center">
          <button
            onClick={prevWeek}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
          >
            <FaChevronLeft />
          </button>
          <h2 className="text-xl font-semibold mx-4">All Dates</h2>
          <button
            onClick={nextWeek}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar View Section */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-7 gap-0 border-b">
          {currentDates.map((date, index) => (
            <div key={index} className="p-4 text-center border-r last:border-r-0 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">
                {date.toDateString()}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {/* Calendar Slots */}
          {currentDates.map((date, dayIndex) => (
            <div key={dayIndex} className={`col-span-1 p-2 border-t ${dayIndex > 0 ? "border-l" : ""}`}>
              {filteredBookings
                .filter((booking) => {
                  // Format both dates to YYYY-MM-DD
                  const bookingDate = new Date(booking.booking_date).toISOString().split("T")[0];
                  const calendarDate = date.toISOString().split("T")[0];
                  return bookingDate === calendarDate;
                })
                .map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 cursor-pointer ${
                      booking.type === "urgent"
                        ? "bg-red-100 border border-red-500"
                        : booking.type === "car"
                        ? "bg-blue-100 border border-blue-500"
                        : "bg-yellow-100 border border-yellow-500"
                    }`}
                    data-tip={`${booking.vehicle?.vehicle_specs?.model || "Unknown Model"} - ${booking.booking_date} - ${booking.return_date}`}
                  >
                    <h3 className="text-lg font-semibold">{booking.vehicle?.vehicle_specs?.model || "Unknown Model"}</h3>
                    <p className="text-sm">{booking.booking_date}</p>
                    <p className="text-sm text-gray-600">{booking.return_date}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <Tooltip place="top" type="dark" effect="float" />
    </div>
  );
};

export default Calendar;
