'use client'
import { useTable } from "./TableContext";
import { Armchair } from 'lucide-react';

export default function Seating() {
  const { tables, handleTableClick, selectedTableSeat } = useTable();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Armchair className="h-5 w-5 text-amber-600" />
        <h3 className="text-lg font-semibold text-gray-900">Select Your Seat</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {tables.map((table, index) => (
          <button
            key={table.id}
            onClick={() => handleTableClick(index)}
            disabled={!table.available}
            className={`
              px-4 py-3 rounded-lg transition-colors relative
              ${table.id === selectedTableSeat.id 
                ? 'bg-amber-100 text-amber-900 border-2 border-amber-200' 
                : table.available 
                  ? 'bg-gray-50 text-gray-700 hover:bg-amber-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <div className="flex items-center justify-center gap-2">
              <Armchair className={`h-4 w-4 ${table.id === selectedTableSeat.id ? 'text-amber-600' : 'text-gray-300'}`} />
              <span className="font-medium">Table {table.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}