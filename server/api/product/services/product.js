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

  CalculateItemsWeight: (items) =>
    items.reduce((acc, { dimensions }) => (acc += dimensions.weight), 0),

  CalculateProductBundlePrice: async (product) => {
    const items = await Promise.all(
      product.bundle.map(
        async ({ item }) => await strapi.services.item.findOne({ id: item })
      )
    );

    const box = await strapi.services.box.findOne({ id: product.box });
    const totalWeight =
      strapi.services.product.CalculateItemsWeight(items) +
      box.dimensions.weight;
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
    product.dimensions.weight = totalWeight;
    product.dimensions.width = box.dimensions.width;
    product.dimensions.breadth = box.dimensions.breadth;
    product.dimensions.height = box.dimensions.height;

    return product;
  },
};
