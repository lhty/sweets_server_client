"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  CalculateOverallPrice: (item) => {
    const resultPrice = item.price.base_price + item.price.additional;
    const discount = item.price.discount.includes("%")
      ? (resultPrice / 100) * Number(item.price.discount.replace(/\D/g, ""))
      : Number(item.price.discount);
    item.price.overall = resultPrice - discount;
    return item;
  },
};
