type InfoRowProps = {
  label: string;
  value?: string | number;
  valueEl?: React.ReactNode;
};

const InfoRow = ({ label, value, valueEl }: InfoRowProps) => (
  <div className="flex gap-1">
    <span className="text-sm min-w-fit">{label}:</span>
    {valueEl ?? <span className="text-sm">{value}</span>}
  </div>
);

export default InfoRow;
