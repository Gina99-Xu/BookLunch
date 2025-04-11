'use client'

import React, { useState } from 'react';

export default function ToggleView({ children }) {

  const [view, setView] = useState('map'); 

  const toggleView = () => {
    setView((prevView) => (prevView === 'map' ? 'list' : 'map'));
  };

  const mapChild = React.Children.toArray(children)[0];
  const listChild = React.Children.toArray(children)[1];


  return (
    <div>
      <button
        onClick={toggleView}
        className="bg-white border-2 border-amber-500 rounded-lg
              px-4 sm:px-6 py-3 sm:py-3 text-sm sm:text-base text-amber-600 font-bold hover:bg-amber-50 
              flex items-center justify-center gap-2 mb-4
              "
      >
        {view === 'map' ? 'List' : 'Map'} View
      </button>

      {view === 'map' ? (
        React.cloneElement(mapChild, { view: 'map' })
      ) : (
        React.cloneElement(listChild, { view: 'list' })
      )}
    </div>
  );
}