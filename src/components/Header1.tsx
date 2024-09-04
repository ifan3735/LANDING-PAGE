const Header = () => {
    return (
      <div className="flex items-center justify-between p-4 bg-secondary text-textColor">
        <div className="font-semibold text-lg">Dashboard</div>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="px-4 py-2 rounded-md bg-white shadow-sm" />
          <div className="w-10 h-10 bg-primary rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default Header;
  