/**
 * Exporting all resolvers
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { UserMutation, UserQueries, UserSubscription } from './user';
import { CarierMutation, CarierQueries, CarierSubscription } from './carier';
import { EducationMutation, EducationQueries, EducationSubscription } from './education';
import { PositionMutation, PositionQueries, PositionSubscription } from './position';
import { PositionChildMutation, PositionChildQueries, PositionChildSubscription } from './position_child';
const rootResolver = {
  Query: {
    ...UserQueries,
    ...CarierQueries,
    ...EducationQueries,
    ...PositionQueries,
    ...PositionChildQueries
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...CarierMutation,
    ...EducationMutation,
    ...PositionMutation,
    ...PositionChildMutation
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...CarierSubscription,
    ...EducationSubscription,
    ...PositionSubscription,
    ...PositionChildSubscription
    // Add other subscriptions here
  }
};

export default rootResolver;