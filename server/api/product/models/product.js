"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      const updated = await strapi.services.product.CalculateProductBundlePrice(
        data
      );
      data.bundle = updated.bundle;
      data.price = updated.price;
      data.dimensions = updated.dimensions;
    },
    beforeUpdate: async (_, data) => {
      const updated = await strapi.services.product.CalculateProductBundlePrice(
        data
      );
      data.bundle = updated.bundle;
      data.price = updated.price;
      data.dimensions = updated.dimensions;
    },
    beforeSave: async (_, data) => {},
    afterSave: async (_, data) => {},
  },
};
