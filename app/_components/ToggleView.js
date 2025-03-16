'use client'

import React, { Suspense, useState } from 'react';

export default function ToggleView({ children }) {

  const [view, setView] = useState('map'); // Initialize state to manage view

  const toggleView = () => {
    setView((prevView) => (prevView === 'map' ? 'list' : 'map'));
  };

  // Assuming the first child is the map and the second is the list
  const mapChild = React.Children.toArray(children)[0];
  const listChild = React.Children.toArray(children)[1];

  return (
    <div>
      <button
        onClick={toggleView}
        className="mb-4 border border-gray-100 rounded-md px-4 py-2 font-semibold text-gray-200 bg-gray-800  hover:bg-gray-500 hover:text-gray-100"
      >
        {view === 'map' ? 'List' : 'Map'} View
      </button>

      {view === 'map' ? (
        mapChild
      ) : (
        listChild
      )}
    </div>
  );
}