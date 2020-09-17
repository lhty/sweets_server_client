"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  CalculateDiscount: (discount, total) =>
    Math.round(
      discount.includes("%")
        ? (total / 100) * Number(discount.replace(/\D/g, ""))
        : Number(discount)
    ),

  CalculateSetWeight: (set) =>
    set.reduce((acc, { dimensions }) => (acc += dimensions.weight), 0),

  CalculateProductBundlePrice: async (product) => {
    const set = await Promise.all(
      product.bundle.map(
        async ({ item }) => await strapi.services.item.findOne({ id: item })
      )
    );

    const box = await strapi.services.box.findOne({ id: product.box });

    const totalWeight =
      strapi.services.product.CalculateSetWeight(set) + box.dimensions.weight;
    const base =
      set.reduce((acc, { price }) => (acc += price.overall), 0) +
      box.price.overall;

    const total = base + product.price.additional;
    const discount = strapi.services.product.CalculateDiscount(
      product.price.discount,
      total
    );
    return {
      ...product,
      price: { ...product.price, base_price: base, overall: total - discount },
      dimensions: {
        ...product.dimensions,
        weight: totalWeight,
        width: box.dimensions.width,
        breadth: box.dimensions.breadth,
        height: box.dimensions.height,
      },
    };
  },
};
