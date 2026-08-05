export default function DashboardLayout({
  children,
  orderStats,
  orderStatusGraph,
  orderStatusGraphMonthly,
}: {
  children: React.ReactNode;
  orderStats: React.ReactNode;
  orderStatusGraph: React.ReactNode;
  orderStatusGraphMonthly: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="my-3">{orderStats}</div>

      <div className="flex flex-col gap-4 mt-4">
        {orderStatusGraph}
        {orderStatusGraphMonthly}
      </div>
    </div>
  );
}
