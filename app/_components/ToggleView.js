'use client'

import React, { Suspense, useState } from 'react';
import MyMapContainer from './MyMapContainer';
import PropertyList from './PropertyList';

export default function ToggleView({ children }) {

  const [view, setView] = useState('map'); // Initialize state to manage view

  const toggleView = () => {
    setView((prevView) => (prevView === 'map' ? 'list' : 'map'));
  };

  // Assuming the first child is the map and the second is the list
  const mapChild = React.Children.toArray(children)[0];
  const listChild = React.Children.toArray(children)[1];

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleView}
        className="mb-4 border border-gray-300 rounded-xl px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Switch to {view === 'map' ? 'List' : 'Map'} View
      </button>

      {view === 'map' ? (
        mapChild
      ) : (
        listChild
      )}
    </div>
  );
}