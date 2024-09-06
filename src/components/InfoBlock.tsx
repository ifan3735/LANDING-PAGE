// InfoBlock.tsx
interface InfoBlockProps {
    label: string;
    value: string;
  }
  
  const InfoBlock = ({ label, value }: InfoBlockProps) => (
    <div>
      <span className="block font-semibold">{label}</span>
      <p className="text-gray-700">{value}</p>
    </div>
  );
  
  export default InfoBlock;
  