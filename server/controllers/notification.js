const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route GET /notification
// @access Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  
  try{
    const currentUser = await User.findById(id);
    const result = await Profile.findById(currentUser.profile).populate('notifications');
    res.status(200).json({
      notifications: result.notifications
    })} catch(error){
      res.status(500);
      throw new Error(error.message);
    }
});

// @route POST /notification
// @access Private
exports.postNotification = asyncHandler(async (req, res, next) => {
  
  const {types, description, profileId} = req.body;
  const newNotification = new Notification({
    types,
    description
  });
  try {
    const profile = await Profile.findById(profileId);
    profile.notifications.unshift(newNotification._id);
    await profile.save();
    await newNotification.save();
    const result = await Profile.findById(profileId).populate('notifications');
    const newNotifications = result.notifications.filter(
      notification=>(
        notification.read === false
        )
      )
    res.status(201).json({ notifications:newNotifications});
  } catch(error) {
    res.status(500);
    res.send(error);
    throw new Error(error.message);
  }

  
});

// @route PATCH /notificaiton/:id
// @access Private
exports.updateNotification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const notification = req.body;
  try{
    const result = await Notification.findByIdAndUpdate(
      id, notification, {new:true});
    res.status(200)
      .json({notification:result})
  } catch(error){
    res.status(500);
    throw new Error(error.message);
  }
});

// @route get /notification/unread
// @access Private
exports.getUnreadNotificaiton = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  
  try{
    const currentUser = await User.findById(id);
    const result = await Profile.findById(currentUser.profile).populate('notifications');
    const newNotifications = result.notifications.filter(
      notification=>(
        notification.read === false
        )
      )
    res.status(200).json({
      notifications: newNotifications
    })} catch(error){
      res.status(500);
      throw new Error(error.message);
    }
});

exports.setReadNotifications = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  
  try{
    const currentUser = await User.findById(id);
    const currentProfile = await Profile.findById(currentUser.profile).populate('notifications');
    currentProfile.notifications.forEach(async (notification)=>{
      await Notification.findByIdAndUpdate(notification._id,{read:true},{new:true});
    })
    const resultData = await currentProfile.save();

    res.status(200).json({
      notifications: resultData
    })} catch(error){
      res.status(500);
      console.log('erorr is ',error);
      throw new Error(error.message);
    }
})
