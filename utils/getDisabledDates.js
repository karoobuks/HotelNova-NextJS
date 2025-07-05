// utils/getDisabledDates.js

export const getDisabledDates = (bookings) => {
  const disabledDates = new Set();

  bookings.forEach((booking) => {
    const start = new Date(booking.checkInDate);
    const end = new Date(booking.checkOutDate);

    // Loop through each date in the booking range
    for (
      let d = new Date(start);
      d <= end;
      d.setDate(d.getDate() + 1)
    ) {
      disabledDates.add(d.toDateString()); // use date string for easy comparison
    }
  });

  return Array.from(disabledDates).map(dateStr => new Date(dateStr));
};
