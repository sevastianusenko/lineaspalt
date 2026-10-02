export function townTitle(name: string, commercial = false) {
  const base = commercial ? `Parking Lot Striping & Asphalt Repair in ${name}, PA` : `Asphalt Sealcoating & Striping in ${name}, PA`;
  const withBrand = `${base} | Lines & Asphalt`;
  return withBrand.length <= 66 ? withBrand : base;
}

export function townDescription(name: string, commercial = false) {
  return commercial
    ? `Commercial parking lot striping, sealcoating, crack filling and floor marking in ${name}, PA from Lancaster Lines & Asphalt. Free estimates: 717-808-1600.`
    : `Sealcoating, crack filling, pothole repair and line striping in ${name}, PA from Lancaster Lines & Asphalt. Free estimates: 717-808-1600.`;
}
