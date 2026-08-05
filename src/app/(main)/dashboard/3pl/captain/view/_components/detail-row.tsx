interface DetailRowType {
  label: string;
  value: string;
}

export default function DetailRow({ label, value }: DetailRowType) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-100">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
