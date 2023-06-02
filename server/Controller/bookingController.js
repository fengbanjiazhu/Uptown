const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../Model/bookingModel");
const catchAsync = require("../Utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // console.log(process.env.STRIPE_SECRET_KEY);
  const cartItem = req.body;
  const { items, total } = req.body;
  const imgSample = items[0].product.img01;
  const itemName = items.map((el) => el.slug).join(",");
  // const userEmail = req.body.email || req.user.email;

  // create session
  // const product = await stripe.products.create({
  //   name: `${itemName}`,
  //   description: "Your purchase from Uptown Fashion",
  //   images: [
  //     `https://github.com/fengbanjiazhu/Uptown/blob/main/client/public/images/products/${imgSample}`,
  //   ],
  // });
  // // console.log("Product ID:", product.id);

  // const price = await stripe.prices.create({
  //   product: `${product.id}`,
  //   unit_amount: total * 100,
  //   currency: "aud",
  // });
  // console.log('Price ID:', price.id);

  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price: `${price.id}`,
  //       quantity: 1,
  //     },
  //   ],
  //   mode: "payment",
  //   success_url: `${req.protocol}://${req.get("host")}/?tour=${req.params.tourId}&user=${
  //     req.user.id
  //   }&price=${tour.price}`,
  //   cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
  //   client_reference_id: req.params.tourId,
  //   customer_email: req.user.email,
  // });

  // send to client
  res.status(200).json({
    status: "success",
    cartItem,
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
