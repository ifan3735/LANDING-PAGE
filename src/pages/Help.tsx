import { useState } from "react";
import TopBar from "../components/TopBar";
import { exportData } from "../utils/ExportData";
import { FaChevronDown, FaFileExport } from "react-icons/fa";

const Help = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);

  const toggleTheme = () => setTheme(theme === "light" ? "yellow" : "light");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleFaq = (index: number) => {
    setFaqExpanded(faqExpanded === index ? null : index);
  };

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
        exportData={() => exportData([])}
      />

      {/* Page Header */}
      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Help & Support</h2>
          <p className="text-sm text-gray-600">
            Find answers to your questions and get help with common tasks.
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

      {/* How-To Guides */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">How-To Guides</h3>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            <strong>Switch Themes</strong>: Use the toggle button on the top
            right to switch between light and yellow themes.
          </li>
          <li className="mb-2">
            <strong>Search</strong>: Enter your search term in the input field
            in the top bar to find specific content.
          </li>
          <li className="mb-2">
            <strong>Export Data</strong>: Click the "Export" button to export
            your data in CSV or PDF format.
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <button
              className="w-full text-left flex justify-between items-center p-4 bg-gray-200 rounded-lg"
              onClick={() => toggleFaq(1)}
            >
              <span>How do I export data?</span>
              <FaChevronDown
                className={`transform transition-transform ${
                  faqExpanded === 1 ? "rotate-180" : ""
                }`}
              />
            </button>
            {faqExpanded === 1 && (
              <div className="p-4 bg-gray-50 rounded-lg mt-2 text-gray-700">
                To export data, click on the "Export" button in the top right
                corner and select your desired format (CSV or PDF).
              </div>
            )}
          </div>

          <div>
            <button
              className="w-full text-left flex justify-between items-center p-4 bg-gray-200 rounded-lg"
              onClick={() => toggleFaq(2)}
            >
              <span>How do I search for content?</span>
              <FaChevronDown
                className={`transform transition-transform ${
                  faqExpanded === 2 ? "rotate-180" : ""
                }`}
              />
            </button>
            {faqExpanded === 2 && (
              <div className="p-4 bg-gray-50 rounded-lg mt-2 text-gray-700">
                Use the search bar at the top of the page to input keywords and
                filter results based on your query.
              </div>
            )}
          </div>

          <div>
            <button
              className="w-full text-left flex justify-between items-center p-4 bg-gray-200 rounded-lg"
              onClick={() => toggleFaq(3)}
            >
              <span>How do I change the theme?</span>
              <FaChevronDown
                className={`transform transition-transform ${
                  faqExpanded === 3 ? "rotate-180" : ""
                }`}
              />
            </button>
            {faqExpanded === 3 && (
              <div className="p-4 bg-gray-50 rounded-lg mt-2 text-gray-700">
                You can switch between the light and yellow themes by clicking
                the toggle button in the top right corner.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Need More Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          If you're still having trouble, feel free to reach out to our support
          team.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Help;
