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
const transformEducation = (carier: any) => {
  return {
    ...carier._doc,
    _id: carier.id,
  };
};
export { getUser, transformUser,transformCarier,transformEducation };