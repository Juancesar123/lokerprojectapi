/**
 * Exporting all resolvers
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { UserMutation, UserQueries, UserSubscription } from './user';
import { CarierMutation, CarierQueries, CarierSubscription } from './carier';
const rootResolver = {
  Query: {
    ...UserQueries,
    ...CarierQueries
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...CarierMutation
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...CarierSubscription
    // Add other subscriptions here
  }
};

export default rootResolver;