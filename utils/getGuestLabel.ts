
export const getGuestLabel = (guestCounts: { adults: number; children: number; infants: number; pets: number }, isDetail?: boolean) => {
  const { adults, children, infants, pets } = guestCounts;

  const totalGuests = adults + children;
  const parts = [];

  if (totalGuests > 0) parts.push(`${totalGuests} khách`);
  if (infants > 0) parts.push(`${infants} em bé`);
  if (isDetail) {
    if (pets > 0) parts.push(`${pets} thú cưng`);
  } else if (pets > 0) parts.push(`...`);



  return parts.length > 0 ? parts.join(', ') : 'Thêm khách';
};