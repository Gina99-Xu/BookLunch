'use client'
import { useTable } from "./TableContext";

export default function Seating() {
  const { tables, setTables, setSelectedTableSeat, selectedTableSeat, handleTableClick } = useTable();
  console.log(selectedTableSeat);

  return (
    <div className="text-black px-4">
      <h5 className="font-bold text-center">Seating</h5>
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 justify-items-center">
        {tables.map((table, index) => (
          <div className="px-2 py-3 font-semibold" key={table.id}>
            <button onClick={() => handleTableClick(index)}>
              <span className={`flex px-8 py-4 rounded-md ${table.id === selectedTableSeat.id ? 'bg-slate-300' : 'bg-slate-200'} ${table.available === false ? 'line-through' : ''}`}>
                Seat - {table.name}
              </span>
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}