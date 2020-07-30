"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  CalculateOverallPrice: (item) => {
    const resultPrice = item.price.base_price + item.price.additional;
    const discount = strapi.services.product.CalculateDiscount(
      item.price.discount,
      resultPrice
    );

    item.price.overall = resultPrice - discount;
    return item;
  },
};
