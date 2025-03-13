'use client'

export default function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <>
      <button onClick={() => handleFilter(filter)}
        className={`border rounded-md border-slate-400 px-5 py-2 hover:bg-primary-400 ${filter === activeFilter ? "bg-primary-400" : ""}`} >
        {children}
      </button>
    </>
  )

}