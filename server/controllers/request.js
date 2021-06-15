const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRPIE_PRIVATE_KEY);

const Request = require('../models/Request');
const User = require('../models/User');
const Profile = require('../models/Profile');

const ObjectId = mongoose.Types.ObjectId;

// @route GET /requests
// @desc Get all requests of current users
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
 
  try{
    const currentUser = await User.findById(req.user.id);
    const currentProfile = currentUser.profile
    const requests = await Request.find({receivedBy:currentProfile})
      .sort({start:'desc'})
      .populate({
        path:'createdBy',
        select:'firstName lastName profilePhoto _id'
      });
    res.status(200).json({requests});
  } catch(error){
    res.status(500);
    throw new Error(error.message);
  }
});

exports.getBookings = asyncHandler(async (req,res,next)=>{

  try{
    const currentUser = await User.findById(req.user.id);
    const currentProfile = currentUser.profile
    const requests = await Request.find({createdBy:currentProfile})
      .sort({start:'desc'})
      .populate({
        path:'receivedBy',
        select:'firstName lastName profilePhoto _id price'
      });
    res.status(200).json({requests});
  } catch(error){
    res.status(500);
    throw new Error(error.message);
  }
})

// @route POST /requests
// @desc Create new request for the user
// @access Private
exports.postRequest = asyncHandler(async (req, res, next) => {
  const { createdBy, receivedBy, start, end } = req.body;
  
  const newRequest = new Request({
    createdBy,
    receivedBy,
    start,
    end,
  });

  try {
    await newRequest.save();
    res.status(201).json({ request: newRequest });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route PATCH /requests
// @desc update request details
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  //removing paid field for security reasons
  delete req.body.paid;
  //fields only accessable by sitter
  delete req.body.accepted;
  delete req.body.declined;
  try {
    const request = await Request.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    res.status(200).json({ request });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route PATCH /requests/accept/:id
// @desc accept or decline request by sitter
// @access Private
exports.updateRequestAccepted = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { accepted, declined } = req.body;
  try {
    const request = await Request.findById(id).populate('createdBy');
    request.accepted = accepted;
    request.declined = declined;
    console.log('request is ', request);
    await request.save();
    
    res.status(200).json({ request });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @route POST /requests/:id/pay
// @desc Pay and confirm accepted request
// @access Private
exports.payRequest = asyncHandler(async (req, res, next) => {
  const { receivedBy, start, end, hours, payment_method_id, payment_intent_id } = req.body;
  const requestId = req.params.id;
  let intent;

  if (!receivedBy) {
    res.status(400);
    throw new Error('No sitter provided');
  }

  const request = await Request.findById(requestId);
  if (!requestId || !request) {
    res.status(400);
    throw new Error('Invalid Request');
  }

  if (payment_method_id) {
    //getting sitter profile for pricing
    const sitterProfile = await Profile.findById(receivedBy);
    if (!sitterProfile) {
      res.status(400);
      throw new Error('No sitter found');
    }

    //amount in pennies with service fee (3%)
    const totalAmount = hours * sitterProfile.price * 100 * 1.03;

    //creating payment Intent
    intent = await stripe.paymentIntents.create({
      payment_method: payment_method_id,
      amount: totalAmount,
      currency: 'usd',
      confirmation_method: 'manual',
      confirm: true,
    });
  } else if (payment_intent_id) {
    intent = await stripe.paymentIntents.confirm(payment_intent_id);
  }

  //sending responce to frontend
  if (intent.status === 'requires_action' && intent.next_action.type === 'use_stripe_sdk') {
    // Tell the client to handle the action
    res.json({
      requires_action: true,
      payment_intent_client_secret: intent.client_secret,
    });
  } else if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    request.paid = true;
    request.start = start;
    request.end = end;
    request.payDetails = {
      paidAt: new Date(),
    };
    await request.save();
    res.json({
      success: true,
    });
  } else {
    // Invalid status
    res.json({
      error: 'Invalid PaymentIntent status',
    });
  }
});
