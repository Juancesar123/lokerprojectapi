/**
 * File containing all user queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import Education from '../../../model/Education';
import { transformUser,transformEducation } from './merge';
const pubsub = new PubSub();

const EDUCATION_ADDED = 'EDUCATION_ADDED';

/**
 * User Queries
 */
const EducationQueries = {
  educations: async (parent, args, context) => {
    try {
      const carier = await Education.find();
      return carier.map((data) => {
        return transformEducation(data);
      });
    } catch (err) {
      throw err;
    }
  },
  searchEducation: async (parent, {educationText}) => {
    try {
      console.log('/'+educationText+'/i')
      const carier = await Education.find({ 
        $or:[
          {'education': new RegExp(educationText, 'i') }, 
        ]
      });
      return carier.map((data) => {
        return transformEducation(data);
      });
    } catch (err) {
      throw err;
    }
  },
  education: async (parent, { educationId }) => {
    try {
      const data = await Education.findById(educationId);
      return transformEducation(data);
    } catch (err) {
      throw err;
    }
  },
};

/**
 * User Mutations
 */
const EducationMutation = {
  createEducation: async (parent: any, { educationInput }: any) => {
    try {
        const newCarier = new Education({
          _id: new mongoose.Types.ObjectId(),
          education: educationInput.education
        });
        const savedCarier = await newCarier.save();
        pubsub.publish(EDUCATION_ADDED, {
          carierAdded: transformEducation(savedCarier)
        });
        return {
            education: educationInput.education
        };
    } catch (error) {
      throw error;
    }
  },
  educationUpdate: async (parent, { educationId, updateEducation }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const carier = await Education.findByIdAndUpdate(educationId, updateEducation, {
        new: true
      });
      return transformEducation(carier);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * User Subscriptions
 */
const EducationSubscription = {
  educationAdded: {
    subscribe: () => pubsub.asyncIterator([EDUCATION_ADDED])
  }
};

export { EducationQueries, EducationMutation, EducationSubscription };
