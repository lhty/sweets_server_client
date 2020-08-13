// const _ = require("lodash");

// /**
//  * Throws an ApolloError if context body contains a bad request
//  * @param contextBody - body of the context object given to the resolver
//  * @throws ApolloError if the body is a bad request
//  */
// function checkBadRequest(contextBody) {
//   if (_.get(contextBody, "statusCode", 200) !== 200) {
//     const message = _.get(contextBody, "error", "Bad Request");
//     const exception = new Error(message);
//     exception.code = _.get(contextBody, "statusCode", 400);
//     exception.data = contextBody;
//     throw exception;
//   }
// }

// module.exports = {
//   type: {
//     UsersPermissionsPermission: false, // Make this type NOT queriable.
//   },
//   mutation: `
//        registerModified(input: UsersPermissionsRegisterInput!): UsersPermissionsLoginPayload!
//     `,
//   resolver: {
//     Mutation: {
//       registerModified: {
//         description: "Register a user",
//         resolverOf: "plugins::users-permissions.auth.register",
//         resolver: async (obj, options, { context }) => {
//           context.request.body = _.toPlainObject(options.input);
//           await strapi.plugins["users-permissions"].controllers.auth.register(
//             context
//           );
//           let output = context.body.toJSON
//             ? context.body.toJSON()
//             : context.body;
//           checkBadRequest(output);
//           console.log(output);
//           return {
//             user: output.user || output,
//             jwt: output.jwt,
//           };
//         },
//       },
//     },
//   },
// };
