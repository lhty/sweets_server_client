"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  CalculateDiscount: (discount, total) =>
    discount.includes("%")
      ? (total / 100) * Number(discount.replace(/\D/g, ""))
      : Number(discount),

  CalculateProductBundlePrice: async (product) => {
    const items = await Promise.all(
      product.bundle.map(
        async ({ item }) => await strapi.services.item.findOne({ id: item })
      )
    );

    const box = await strapi.services.box.findOne({ id: product.box });

    const base =
      items.reduce((acc, { price }) => (acc += price.overall), 0) +
      box.price.overall;
    product.price.base_price = base;

    const total = base + product.price.additional;

    const discount = strapi.services.product.CalculateDiscount(
      product.price.discount,
      total
    );

    product.price.overall = total - discount;

    return product;
  },
};
