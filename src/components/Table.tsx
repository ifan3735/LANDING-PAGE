interface TableProps {
    headers: string[];
    data: string[][];
  }
  
  const Table: React.FC<TableProps> = ({ headers, data }) => {
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border-b-2 border-gray-200 bg-secondary text-left text-xs font-semibold text-textColor uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border-b border-gray-200 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  