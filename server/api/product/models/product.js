"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      data = await strapi.services.product.CalculateProductBundlePrice(data);
    },
    beforeUpdate: async (_, data) => {
      data = await strapi.services.product.CalculateProductBundlePrice(data);
    },
    beforeSave: async (_, data) => {
      data = await strapi.services.product.CalculateProductBundlePrice(data);
    },
    afterSave: async (_, data) => {
      data = await strapi.services.product.CalculateProductBundlePrice(data);
    },
  },
};
