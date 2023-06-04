const Stripe = require("stripe");
const Booking = require("../Model/bookingModel");

const catchAsync = require("../Utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const cartDetails = req.body;
  const { items, total, name, email, address } = cartDetails;
  const product = items.map((item) => item.product._id);
  const itemName = items.map((el) => el.slug).join(",");

  // create session
  // const product = await stripe.products.create({
  //   name: `${itemName}`,
  //   description: "Your purchase from Uptown Fashion",
  //   images: ["https://github.com/fengbanjiazhu/Uptown/blob/main/client/public/images/Uptown.jpg"],
  // });

  // const price = await stripe.prices.create({
  //   product: `${product.id}`,
  //   unit_amount: total * 100,
  //   currency: "aud",
  // });

  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price: `${price.id}`,
  //       quantity: 1,
  //     },
  //   ],
  //   mode: "payment",
  //   success_url: "",
  //   cancel_url: "",
  //   client_reference_id: req.params.tourId,
  //   customer_email: email,
  // });

  // send to client
  res.status(200).json({
    status: "success",
    // session,
    cartDetails,
  });
});

exports.getCheckoutIntent = catchAsync(async (req, res, next) => {
  const cartDetails = req.body;
  const { items, total, name, email, address } = cartDetails;
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  // const product = items.map((item) => item.product._id);
  // const itemName = items.map((el) => el.slug).join(",");
  amount = total * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "AUD",
    amount,
    automatic_payment_methods: { enabled: true },
  });

  // Send publishable key and PaymentIntent details to client
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
