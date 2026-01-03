interface MonthlySummaryCardProps {
  month: string;
  year: number;
  totalAmount: number;
  targetAmount: number;
}

export function MonthlySummaryCard({ month, year, totalAmount, targetAmount }: MonthlySummaryCardProps) {
  const remaining = Math.max(targetAmount - totalAmount, 0);
  
    return (
      <div className="neumorphic p-6">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">This {month}</h3>
        <p className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">
          PKR {totalAmount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Total saved in {month} {year}
        </p>
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Goal:</span> PKR {targetAmount.toLocaleString()} (1 Lac)
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Remaining: PKR {remaining.toLocaleString()}
          </p>
        </div>
      </div>
    );

}
