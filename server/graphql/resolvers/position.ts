/**
 * File containing all user queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import Position from '../../../model/Position';
import { transformUser,transformPosition } from './merge';
const pubsub = new PubSub();

const POSITION_ADDED = 'POSITION_ADDED';

/**
 * User Queries
 */
const PositionQueries = {
  positions: async (parent, args, context) => {
    try {
      const position = await Position.find().
      populate('position_child_id').
      exec();
      return position.map((data) => {
        return transformPosition(data);
      });
    } catch (err) {
      throw err;
    }
  },
  searchPositions: async (parent, {positionText}) => {
    try {
      const position = await Position.find({ 
        $or:[
          {'position': new RegExp(positionText, 'i') },
        ]
      });
      return position.map((data) => {
        return transformPosition(data);
      });
    } catch (err) {
      throw err;
    }
  },
  position: async (parent, { positionId }) => {
    try {
      const data = await Position.findById(positionId);
      return transformPosition(data);
    } catch (err) {
      throw err;
    }
  },
};

/**
 * User Mutations
 */
const PositionMutation = {
  createPosition: async (parent: any, { positionInput }: any) => {
    try {
        const newPosition = new Position({
          _id: new mongoose.Types.ObjectId(),
          position_parent: positionInput.position_parent,
          position_child_id: positionInput.position_child_id,
        });
        const savedPosition = await newPosition.save();
        pubsub.publish(POSITION_ADDED, {
          positionAdded: transformPosition(savedPosition)
        });
        return {
          position_parent: positionInput.position_parent,
          position_child_id: positionInput.position_child_id
        };
    } catch (error) {
      throw error;
    }
  },
  updatePosition: async (parent, { positionId, updatePosition }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const position = await Position.findByIdAndUpdate(positionId, updatePosition, {
        new: true
      });
      return transformPosition(position);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * User Subscriptions
 */
const PositionSubscription = {
  positionAdded: {
    subscribe: () => pubsub.asyncIterator([POSITION_ADDED])
  }
};

export { PositionQueries, PositionMutation, PositionSubscription };
