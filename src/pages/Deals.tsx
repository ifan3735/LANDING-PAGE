import TopBar from "../components/TopBar";
import { useState } from "react";

const Deals = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [theme, setTheme] = useState("light");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
        type: '',
        color: '',
        style: '',
      });
    return (
        <div>
        <h1>Deals</h1>
        </div>
    );
    };

    export default Deals;