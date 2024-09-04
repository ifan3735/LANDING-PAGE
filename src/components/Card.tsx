interface CardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
  }
  
  const Card: React.FC<CardProps> = ({ title, value, icon }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">{title}</div>
          <div className="text-4xl font-bold text-primary">{value}</div>
        </div>
        {icon && <div className="text-primary text-3xl">{icon}</div>}
      </div>
    );
  };
  
  export default Card;
  