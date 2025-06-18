
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return price * (1 - discount / 100)
}
