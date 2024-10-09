import { useState } from "react";
import TopBar from "../components/TopBar";
import { exportData } from "../utils/ExportData";
import { FaChevronDown, FaFileExport, FaPhone, FaEnvelope, FaQuestionCircle, FaRegComments } from "react-icons/fa";

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
      {/* Top Bar with Search and Theme Toggle */}
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
          <h2 className="text-3xl font-bold text-gray-800">Help & Support</h2>
          <p className="text-sm text-gray-600 mt-2">
            Browse through our guides, FAQs, and get in touch with support if needed.
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
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
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

      {/* How-To Guides Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          <FaQuestionCircle className="mr-2 inline-block" /> How-To Guides
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Switch Themes:</strong> Use the toggle button on the top right to switch between light and yellow themes.
          </li>
          <li>
            <strong>Search:</strong> Type your query in the search bar at the top of the page to find specific content quickly.
          </li>
          <li>
            <strong>Export Data:</strong> Click the "Export" button and choose your preferred format (CSV or PDF).
          </li>
        </ul>
      </div>

      {/* FAQ Section with Smooth Transitions */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">
          <FaQuestionCircle className="mr-2 inline-block" /> Frequently Asked Questions (FAQs)
        </h3>
        <div className="space-y-4">
          {/* FAQ 1 */}
          <div>
            <button
              className="w-full text-left flex justify-between items-center p-4 bg-gray-200 rounded-lg focus:outline-none transition-colors duration-200"
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
                To export data, click the "Export" button at the top of the page and select either CSV or PDF format.
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div>
            <button
              className="w-full text-left flex justify-between items-center p-4 bg-gray-200 rounded-lg focus:outline-none transition-colors duration-200"
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
                Use the search bar at the top of the page to type in keywords or phrases, and the system will filter results accordingly.
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div>
            <button
              className="w-full text-left flex justify-between items-center p-4 bg-gray-200 rounded-lg focus:outline-none transition-colors duration-200"
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
                You can switch between light and yellow themes by clicking the toggle button at the top-right corner of the page.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact and Feedback Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">
          <FaRegComments className="mr-2 inline-block" /> Need More Help?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          If you need additional assistance or have any specific inquiries, feel free to contact our support team.
        </p>
        <div className="flex space-x-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center">
            <FaPhone className="mr-2" /> Call Support
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center">
            <FaEnvelope className="mr-2" /> Email Support
          </button>
        </div>
      </div>

      {/* Feedback Button */}
      <div className="mt-8">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center">
          <FaRegComments className="mr-2" /> Leave Feedback
        </button>
      </div>
    </div>
  );
};

export default Help;
