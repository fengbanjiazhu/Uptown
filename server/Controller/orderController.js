const Order = require("../Model/orderModel");
const catchAsync = require("../Utils/catchAsync");
const centralController = require("./centreController");
const appErr = require("../Utils/appError");
const Stripe = require("stripe");
const Email = require("../Utils/Email");

exports.getAllOrder = centralController.getAll(Order);
exports.getOrder = centralController.getOne(Order);
exports.createOrder = centralController.createData(Order);
exports.updateOrder = centralController.updateData(Order);
exports.deleteOrder = centralController.deleteData(Order);

exports.getCheckoutIntent = catchAsync(async (req, res, next) => {
  const cartDetails = req.body;
  const { items, total, name, email, address } = cartDetails;
  if (!cartDetails || !items || !total)
    next(new appErr("Can not process checkout without correct product info", 400));

  const product = items.map((item) => item.product._id);

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  amount = total * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "AUD",
    amount,
    automatic_payment_methods: { enabled: true },
  });

  const { user } = req.body;
  if (user) {
    await Order.create({
      user,
      product,
      name,
      email,
      address,
      price: total,
      paid: false,
      payment_intent_client_secret: paymentIntent.client_secret,
    });
  } else {
    await Order.create({
      product,
      name,
      email,
      address,
      price: total,
      paid: false,
      payment_intent_client_secret: paymentIntent.client_secret,
    });
  }

  res.status(200).json({
    status: "success",
    clientSecret: paymentIntent.client_secret,
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { payment_intent, payment_intent_client_secret } = req.body;
  const data = {
    payment_intent,
    paid: true,
  };

  const orderUpdated = await Order.findOneAndUpdate(
    { $and: [{ payment_intent_client_secret }, { paid: false }] },
    { $set: data }
  );

  if (!orderUpdated) return next(new appErr("Order not fount or already paid", 400));
  await new Email(orderUpdated, payment_intent).sendOrder();

  // findOne and update
  res.status(200).json({
    status: "success",
    orderUpdated,
  });
});
