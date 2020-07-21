/**
 * File containing all user queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import City from '../../../model/city';
import {transformcity } from './merge';
const pubsub = new PubSub();

const CITY_ADDED = 'CITY_ADDED';

/**
 * User Queries
 */
const CityQueries = {
  cities: async (parent, args, context) => {
    try {
      const carier = await City.find();
      return carier.map((data) => {
        return transformcity(data);
      });
    } catch (err) {
      throw err;
    }
  },
  city: async (parent, { carierId }) => {
    try {
      const data = await City.findById(carierId);
      return transformcity(data);
    } catch (err) {
      throw err;
    }
  },
};

/**
 * User Mutations
 */
const CityMutation = {
  createCity: async (parent: any, { cityInput }: any) => {
    console.log(cityInput);
    console.log('asaa')
    try {
        const newCity = new City({
          _id: new mongoose.Types.ObjectId(),
          city: cityInput.city,
        });
        const savedCity = await newCity.save();
        pubsub.publish(CITY_ADDED, {
            cityAdded: transformcity(savedCity)
        });
        return {
            city: cityInput.city
        };
    } catch (error) {
      throw error;
    }
  },
  updateCity: async (parent, { cityId, updateCity }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const city = await City.findByIdAndUpdate(cityId, updateCity, {
        new: true
      });
      return transformcity(city);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * User Subscriptions
 */
const CitySubscription = {
  cityAdded: {
    subscribe: () => pubsub.asyncIterator([CITY_ADDED])
  }
};

export { CityQueries, CityMutation, CitySubscription };
