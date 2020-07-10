/**
 * File containing all user queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import Carier from '../../../model/Carier';
import { transformUser,transformCarier } from './merge';
const pubsub = new PubSub();

const CARIER_ADDED = 'CARIER_ADDED';

/**
 * User Queries
 */
const CarierQueries = {
  cariers: async (parent, args, context) => {
    try {
      const carier = await Carier.find();
      return carier.map((data) => {
        return transformCarier(data);
      });
    } catch (err) {
      throw err;
    }
  },
  searchCarier: async (parent, {carierText}) => {
    try {
      console.log('/'+carierText+'/i')
      const carier = await Carier.find({ 
        $or:[
          {'position': new RegExp(carierText, 'i') }, 
          {'name_organization':new RegExp(carierText, 'i')}
        ]
      });
      return carier.map((data) => {
        return transformCarier(data);
      });
    } catch (err) {
      throw err;
    }
  },
  carier: async (parent, { carierId }) => {
    try {
      const data = await Carier.findById(carierId);
      return transformCarier(data);
    } catch (err) {
      throw err;
    }
  },
};

/**
 * User Mutations
 */
const CarierMutation = {
  createCarier: async (parent: any, { carierInput }: any) => {
    try {
        const newCarier = new Carier({
          _id: new mongoose.Types.ObjectId(),
          name_organization: carierInput.name_organization,
          title: carierInput.title,
          salary: carierInput.salary,
          position: carierInput.position,
          description: carierInput.description
        });
        const savedCarier = await newCarier.save();
        pubsub.publish(CARIER_ADDED, {
          carierAdded: transformCarier(savedCarier)
        });
        return {
            name_organization: carierInput.name_organization,
            salary: carierInput.salary,
            title: carierInput.title,
            position: carierInput.position,
        };
    } catch (error) {
      throw error;
    }
  },
  updateCarier: async (parent, { carierId, updateCarier }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const carier = await Carier.findByIdAndUpdate(carierId, updateCarier, {
        new: true
      });
      return transformCarier(carier);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * User Subscriptions
 */
const CarierSubscription = {
  carierAdded: {
    subscribe: () => pubsub.asyncIterator([CARIER_ADDED])
  }
};

export { CarierQueries, CarierMutation, CarierSubscription };
