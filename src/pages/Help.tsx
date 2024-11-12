import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaChevronDown, FaFileExport, FaPhone, FaEnvelope, FaQuestionCircle, FaRegComments } from "react-icons/fa";
import { jsPDF } from "jspdf";

const Help = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Mock data for export
  const helpContent = [
    { question: "How do I export data?", answer: "Click the Export button and choose CSV or PDF." },
    { question: "How do I search for content?", answer: "Use the search bar at the top to find specific content." },
    { question: "How do I change the theme?", answer: "Use the toggle button at the top right to switch themes." },
    { question: "How do I contact support?", answer: "Call or email our support team for assistance." },
    { question: "How do I leave feedback?", answer: "Click the Leave Feedback button and submit your feedback." },
    { question: "How do I view FAQs?", answer: "Click on the questions to view the answers." },
  ];

  const toggleTheme = () => setTheme(theme === "light" ? "yellow" : "light");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleFaq = (index: number) => {
    setFaqExpanded(faqExpanded === index ? null : index);
  };

  // Function to export data as CSV
  const exportAsCSV = () => {
    const headers = "Question,Answer\n";
    const rows = helpContent
      .map(item => `${item.question},${item.answer}`)
      .join("\n");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "help_export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Function to export data as PDF
  const exportAsPDF = () => {
    const doc = new jsPDF();
    let content = "Help Content:\n\n";
    helpContent.forEach((item, index) => {
      content += `${index + 1}. ${item.question}\n   Answer: ${item.answer}\n\n`;
    });
    doc.text(content, 10, 10);
    doc.save("help_export.pdf");
  };

  return (
    <div
      className={`transition-all duration-500 p-6 ${
        theme === "yellow" ? "bg-yellow-100 text-gray-900" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      {/* Top Bar with Search and Theme Toggle */}
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => {}}
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

      {/* FAQ Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">
          <FaQuestionCircle className="mr-2 inline-block" /> Frequently Asked Questions (FAQs)
        </h3>
        <div className="space-y-4">
          {helpContent.map((item, index) => (
            <div key={index}>
              <button
                className="w-full text-left flex justify-between items-center p-4 bg-gray-200 rounded-lg focus:outline-none transition-colors duration-200"
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
                <FaChevronDown
                  className={`transform transition-transform ${
                    faqExpanded === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {faqExpanded === index && (
                <div className="p-4 bg-gray-50 rounded-lg mt-2 text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
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
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center"
            onClick={() => window.location.href = 'tel:+0705241326'}
          >
            <FaPhone className="mr-2" /> Call Support
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center"
            onClick={() => window.location.href = 'mailto:ifanmaina@gmail.com'}
          >
            <FaEnvelope className="mr-2" /> Email Support
          </button>
        </div>
      </div>

      {/* Feedback Button and Modal */}
      <div className="mt-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center"
          onClick={() => setShowFeedbackForm(true)}
        >
          <FaRegComments className="mr-2" /> Leave Feedback
        </button>

        {showFeedbackForm && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 transition-transform transform scale-105 sm:scale-100 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">We Value Your Feedback</h3>
        <button
          className="text-gray-500 hover:text-gray-800 transition"
          onClick={() => setShowFeedbackForm(false)}
        >
          ✕
        </button>
      </div>

      <textarea
        placeholder="Share your feedback here..."
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700 mb-6 placeholder-gray-400"
      />
      
      <div className="flex space-x-4">
        <button
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition transform hover:scale-105"
          onClick={() => setShowFeedbackForm(false)}
        >
          Back
        </button>
        
        <button
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition transform hover:scale-105"
          onClick={() => {
            // You can add submission functionality here
            setShowFeedbackForm(false);
          }}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default Help;
