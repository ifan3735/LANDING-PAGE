const Settings = () => {
  const [showDropdown, setShowDropdown] = useState(false); // To toggle export dropdown
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // For showing/hiding filter dropdown
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <p>Settings options go here...</p>
      </div>
    );
  };
  
  export default Settings;
  