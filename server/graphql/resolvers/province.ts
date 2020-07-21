/**
 * File containing all user queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import Province from '../../../model/province';
import {transformprovince } from './merge';
const pubsub = new PubSub();

const PROVINCE_ADDED = 'PROVINCE_ADDED';

/**
 * User Queries
 */
const ProvinceQueries = {
  provinces: async (parent, args, context) => {
    try {
        const province = await Province.find().
        populate('city').
        exec();
      return province.map((data) => {
        return transformprovince(data);
      });
    } catch (err) {
      throw err;
    }
  },
  province: async (parent, { provinceId }) => {
    try {
      const data = await Province.findById(provinceId);
      return transformprovince(data);
    } catch (err) {
      throw err;
    }
  },
};

/**
 * User Mutations
 */
const ProvinceMutation = {
  createProvince: async (parent: any, { provinceInput }: any) => {
    try {
        const newCity = new Province({
          _id: new mongoose.Types.ObjectId(),
          province: provinceInput.province,
          city: provinceInput.city,
        });
        const savedCity = await newCity.save();
        pubsub.publish(PROVINCE_ADDED, {
            provinceAdded: transformprovince(savedCity)
        });
        return {
            province: provinceInput.province,
            city: provinceInput.city
        };
    } catch (error) {
      throw error;
    }
  },
  updateProvince: async (parent, { provinceId, updateProvince }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const province = await Province.findByIdAndUpdate(provinceId, updateProvince, {
        new: true
      });
      return transformprovince(province);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * User Subscriptions
 */
const ProvinceSubscription = {
  provinceAdded: {
    subscribe: () => pubsub.asyncIterator([PROVINCE_ADDED])
  }
};

export { ProvinceQueries, ProvinceMutation, ProvinceSubscription };
