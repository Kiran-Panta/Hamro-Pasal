export const calculateRecommendationScore = (
  product,
  preferredCategories,
  averagePrice
) => {
  let score = 0;

  // --------------------------------
  // 1. CATEGORY PREFERENCE
  // --------------------------------

  const categoryIndex =
    preferredCategories.indexOf(product.category);

  if (categoryIndex === 0) {
    score += 40;
  } else if (categoryIndex === 1) {
    score += 30;
  } else if (categoryIndex === 2) {
    score += 20;
  } else if (categoryIndex !== -1) {
    score += 10;
  }

  // --------------------------------
  // 2. PRICE SIMILARITY
  // --------------------------------

  if (averagePrice > 0 && product.price > 0) {
    const priceDifference =
      Math.abs(product.price - averagePrice) /
      averagePrice;

    if (priceDifference <= 0.10) {
      score += 15;
    } else if (priceDifference <= 0.20) {
      score += 10;
    } else if (priceDifference <= 0.30) {
      score += 5;
    }
  }

  // --------------------------------
  // 3. PRODUCT RATING
  // --------------------------------

  if (product.rating >= 4.5) {
    score += 10;
  } else if (product.rating >= 4) {
    score += 7;
  } else if (product.rating >= 3) {
    score += 4;
  }

  // --------------------------------
  // 4. PRODUCT POPULARITY
  // --------------------------------

  if (product.sold >= 20) {
    score += 10;
  } else if (product.sold >= 10) {
    score += 5;
  } else if (product.sold > 0) {
    score += 2;
  }

  // --------------------------------
  // 5. STOCK AVAILABILITY
  // --------------------------------

  if (product.stock > 0) {
    score += 5;
  }

  return score;
};