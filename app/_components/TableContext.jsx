'use client'
import { createContext, useContext, useState } from "react";

const TableContext = createContext();


function TableProvider({ children }) {

  const [tables, setTables] = useState([
    { id: 1, name: '1A', available: true },
    { id: 2, name: '2A', available: true },
    { id: 3, name: '3A', available: true },
    { id: 4, name: '4A', available: true },
    { id: 5, name: '5A', available: true },

    { id: 6, name: '1B', available: true },
    { id: 7, name: '2B', available: true },
    { id: 8, name: '3B', available: true },
    { id: 9, name: '4B', available: true },
    { id: 10, name: '5B', available: true },

    { id: 11, name: '1C', available: true },
    { id: 12, name: '2C', available: true },
    { id: 13, name: '3C', available: true },
    { id: 14, name: '4C', available: false },
    { id: 15, name: '5C', available: false },
  ]);


  const [selectedTableSeat, setSelectedTableSeat] = useState({ id: 11, name: '1C' });

  const handleTableClick = (index) => {
    setSelectedTableSeat(() => tables[index]);
  }


  return (
    <TableContext.Provider value={{ tables, setTables, setSelectedTableSeat, selectedTableSeat, handleTableClick }}>
      {children}</TableContext.Provider>
  )
}

function useTable() {
  const context = useContext(TableContext);
  if (context === undefined)
    throw new Error('Context was undefined')

  return context

}

export { TableProvider, useTable }