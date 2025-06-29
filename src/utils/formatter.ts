export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  export const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };