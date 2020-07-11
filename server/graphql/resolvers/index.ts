/**
 * Exporting all resolvers
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { UserMutation, UserQueries, UserSubscription } from './user';
import { CarierMutation, CarierQueries, CarierSubscription } from './carier';
import { EducationMutation, EducationQueries, EducationSubscription } from './education';
const rootResolver = {
  Query: {
    ...UserQueries,
    ...CarierQueries,
    ...EducationQueries
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...CarierMutation,
    ...EducationMutation
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...CarierSubscription,
    ...EducationSubscription
    // Add other subscriptions here
  }
};

export default rootResolver;