const Stripe = require("stripe");
const Booking = require("../Model/bookingModel");
const Order = require("../Model/orderModel");

const catchAsync = require("../Utils/catchAsync");

exports.getCheckoutIntent = catchAsync(async (req, res, next) => {
  const cartDetails = req.body;
  const { items, total, name, email, address } = cartDetails;
  const product = items.map((item) => item.product._id);

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  amount = total * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "AUD",
    amount,
    automatic_payment_methods: { enabled: true },
  });

  await Order.create({
    product,
    name,
    email,
    address,
    price: total,
    paid: false,
    payment_intent_client_secret: paymentIntent.client_secret,
  });

  res.status(200).json({
    status: "success",
    clientSecret: paymentIntent.client_secret,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // this is only temporary, unsecure
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) return next();

  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split("?")[0]);
});

// exports.createBooking = factory.createOne(Booking);
// exports.getBooking = factory.getOne(Booking);
// exports.getAllBooking = factory.getAll(Booking);
// exports.updateBooking = factory.updateOne(Booking);
// exports.deleteBooking = factory.deleteOne(Booking);
