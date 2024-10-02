import TopBar from "../components/TopBar";
import { useState } from "react";
import { exportData } from "../utils/ExportData";

const Deals = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [theme, setTheme] = useState("light");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
        type: '',
        color: '',
        style: '',
      });

      const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

      const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      };

      const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

      const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

    return (
        <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
          <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData(filteredCars)}
      />    
    </div>
    );
    };

    export default Deals;