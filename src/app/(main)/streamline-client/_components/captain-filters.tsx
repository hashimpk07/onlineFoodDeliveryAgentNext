import { useState } from "react";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterState {
  zeroDelivered: boolean;
  region: string;
  employmentType: string;
  company3pl: string;
  shop: string;
}

interface CaptainFiltersProps {
  onApply: (filters: FilterState) => void;
  onReset: () => void;
}

export const CaptainFilters = ({ onApply, onReset }: CaptainFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    zeroDelivered: false,
    region: "",
    employmentType: "",
    company3pl: "",
    shop: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApply(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetState = {
      zeroDelivered: false,
      region: "",
      employmentType: "",
      company3pl: "",
      shop: "",
    };
    setFilters(resetState);
    onReset();
    setIsOpen(false);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-dashed h-8">
          <SlidersHorizontal size={14} />
          Filters
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Filter Captains</SheetTitle>
        </SheetHeader>

        {/* Footer Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button className="flex-1" onClick={handleApply}>
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
