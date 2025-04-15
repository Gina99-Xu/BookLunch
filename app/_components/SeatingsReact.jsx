'use client'

import React, { useState } from 'react';
import SeatPicker from 'react-seat-picker';


const rows = [
  [
    { id: 1, label: 'Seat 1' },
    { id: 2, label: 'Seat 2' },
    { id: 3, label: 'Seat 3' },
    { id: 4, label: 'Seat 4' },
  ],
  [
    { id: 5, label: 'Seat 5' },
    { id: 6, label: 'Seat 6' },
    { id: 7, label: 'Seat 7' },
    { id: 8, label: 'Seat 8' },
  ],
  [
    { id: 9, label: 'Seat 9' },
    { id: 10, label: 'Seat 10' },
    { id: 11, label: 'Seat 11' },
    { id: 12, label: 'Seat 12' },
  ],
];

export default function SeatingsReact() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelectedSeatsChange = (selectedSeats) => {
    setSelectedSeats(selectedSeats);
  };

  return (
    <SeatPicker
      rows={rows}
      selectedSeats={selectedSeats}
      onSelectedSeatsChange={handleSelectedSeatsChange}
      maxReservableSeats={4}
      alpha
      visible
      selectedByDefault
      loading={false}
    />
  );
};