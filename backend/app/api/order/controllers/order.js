'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")("sk_test_51KL2KSGHYvLiopEXlx5ZBWtZvyIO8HRJ7m1SGIBMSEfkRijKDUsgO3KCOXL5ClID0lArqcG0ob1Is7g8lN3r6OO600tGGm2f3H");

module.exports = {
    create: async (ctx) => {
        const { address, amount, dishes, token, city, state } = JSON.parse(ctx.request.body);
        const stripeAmount = Math.floor(amount * 100);
        const charge = await stripe.charge.create({
            amount: stripeAmount,
            currency: "usd",
            description: `Order ${new Date()} by ${ctx.state.user._id}`,
            source: token,
        });

        const order = await strapi.services.order.create({
            user: ctx.state.user.id,
            charge_id: charge.id,
            amount: stripeAmount,
            address,
            dishes,
            city,
            state,
        });

        return order;
    },
};


module.exports = {};
