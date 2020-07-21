/**
 * Primary file for extracting proper schema structured objects
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import dateToString from '../../helpers/date';
import User from '../../../model/User';

/**
 * Get user object with schema typing
 * @param id
 */
const getUser = async (id: string) => {
  try {
    const user: any = await User.findById(id);
    return {
      ...user._doc,
      _id: user.id,
      createdAt: dateToString(user._doc.createdAt),
      updatedAt: dateToString(user._doc.updatedAt)
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Get user object with schema typing
 * @param user
 */
const transformUser = (user: any) => {
  return {
    ...user._doc,
    _id: user.id,
    createdAt: dateToString(user._doc.createdAt),
    updatedAt: dateToString(user._doc.updatedAt)
  };
};

const transformCarier = (carier: any) => {
  return {
    ...carier._doc,
    _id: carier.id,
  };
};
const transformPosition = (position: any) => {
  return {
    ...position._doc,
    _id: position.id,
  };
};
const transformEducation = (carier: any) => {
  return {
    ...carier._doc,
    _id: carier.id,
  };
};
const transformPositionCHild = (positionChild: any) => {
  return {
    ...positionChild._doc,
    _id: positionChild.id,
  };
};
const transformcity = (city: any) => {
  return {
    ...city._doc,
    _id: city.id,
  };
};
const transformprovince = (province: any) => {
  return {
    ...province._doc,
    _id: province.id,
  };
};
export { getUser, transformUser,transformCarier,transformEducation,transformPosition,transformPositionCHild,transformcity,transformprovince};