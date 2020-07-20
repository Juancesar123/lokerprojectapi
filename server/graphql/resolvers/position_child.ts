/**
 * File containing all user queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import PositionChild from '../../../model/PositionChild';
import { transformPositionCHild } from './merge';
const pubsub = new PubSub();

const POSITION_CHILD_ADDED = 'POSITION_CHILD_ADDED';

/**
 * User Queries
 */
const PositionChildQueries = {
  positionChilds: async (parent, args, context) => {
    try {
      const positionChild = await PositionChild.find()
      return positionChild.map((data) => {
        return transformPositionCHild(data);
      });
    } catch (err) {
      throw err;
    }
  },
  positionChild: async (parent, { positionChildId }) => {
    try {
      const data = await PositionChild.findById(positionChildId);
      return transformPositionCHild(data);
    } catch (err) {
      throw err;
    }
  },
};

/**
 * User Mutations
 */
const PositionChildMutation = {
  createPositionChild: async (parent: any, { positionChildInput }: any) => {
    console.log(positionChildInput)
    try {
        const newPositionChild = new PositionChild({
          _id: new mongoose.Types.ObjectId(),
          position_child: positionChildInput.position_child,
        });
        const savedPositionChild = await newPositionChild.save();
        pubsub.publish(POSITION_CHILD_ADDED, {
          positionChildAdded: transformPositionCHild(savedPositionChild)
        });
        return {
        position_child: positionChildInput.position_child
        };
    } catch (error) {
      throw error;
    }
  },
  updateChildPosition: async (parent, { positionChildId, updatePositionChild }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const positionChild = await PositionChild.findByIdAndUpdate(positionChildId, updatePositionChild, {
        new: true
      });
      return transformPositionCHild(positionChild);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * User Subscriptions
 */
const PositionChildSubscription = {
  positionChildAdded: {
    subscribe: () => pubsub.asyncIterator([POSITION_CHILD_ADDED])
  }
};

export { PositionChildQueries, PositionChildMutation, PositionChildSubscription };
