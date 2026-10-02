// export const formatPrice = (price) => {
//   return `Rs ${price.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//   })}`;
// };


export const formatPrice = (price) => {
  return `Rs. ${price.toLocaleString("en-NP", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};