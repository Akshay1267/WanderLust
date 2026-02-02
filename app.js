if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
// const db = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const cors = require("cors");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
// const listings = require("./routes/listing.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const { isLoggedIn, isOwner, isReviewAuthor } = require("./middleware.js");
const listingsController = require("./controllers/listings.js");
const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });

const userRouter = require("./routes/user.js");

app.use(cookieParser("secretcode"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto : {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 60 * 60
});

store.on("error", (err) => {
  console.log("Session Store Error", err);
});

//session
const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


// session and flash setup (✅ correct order)
app.use(session(sessionOptions));
app.use(flash());

// passport setup (✅ after session)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash messages available in all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) throw new ExpressError(400, error);
  next();
};

app.use("/", userRouter);

let validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// Root route
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app
  .route("/listings")
  .get(wrapAsync(listingsController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingsController.createListing)
  );
  


// new listing route
app.get("/listings/new", isLoggedIn, listingsController.renderNewForm);

// show listing route
app.get("/listings/:id", listingsController.showListing);
// Reviews Post Route
app.post(
  "/listings/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id).populate("reviews");
    // .populate("owner");
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review created successfully!");
    res.redirect(`/listings/${listing._id}`);
  })
);

// Delete Review route (✅ fixed model name)
app.delete(
  "/listings/:id/reviews/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully Deleted the listing!");
    res.redirect(`/listings/${id}`);
  })
);

// Edit Listing route
app.get(
  "/listings/:id/edit",
  isLoggedIn,
  isOwner,
  listingsController.renderEditForm
);

app.put(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingsController.updateListing)
);

app.delete("/listings/:id", isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// ✅ fixed error handler with status
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// Database connection and server startup
main()
  .then(() => {
    console.log("Connected to MongoDb");
    app.listen(port, () => {
      console.log(`App listening at Port:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

async function main() {
  await mongoose.connect(dbUrl, {
    ssl: true,
    retryWrites: true,
    w: "majority"
  });
}
