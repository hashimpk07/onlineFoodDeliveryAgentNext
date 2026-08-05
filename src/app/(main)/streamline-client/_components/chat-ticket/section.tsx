type SectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};
const Section = ({ icon, title, children }: SectionProps) => (
  <div className="mb-2">
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
      <span className="text-sm">{icon}</span>
      <h3 className="text-xs font-bold tracking-widest uppercase">{title}</h3>
    </div>
    <div className="space-y-2 text-sm">{children}</div>
  </div>
);

export default Section;
