// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const { listingSchema, reviewSchema } = require("../schema.js");
// const ExpressError = require("../utils/ExpressError.js");
// const Listing = require("../models/listing");
// const Review = require("../models/review");

// // Validation middleware
// const validateListing = (req, res, next) => {
//   const { error } = listingSchema.validate(req.body);
//   if (error) throw new ExpressError(400, error);
//   next();
// };

// const validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) throw new ExpressError(400, error);
//   next();
// };

// // Index
// router.get("/listings", wrapAsync(async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("./listings/index.ejs", { allListings });
// }));

// // New
// router.get("/listings/new", (req, res) => {
//   res.render("./listings/new.ejs");
// });

// // Show
// router.get("/listings/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id).populate("reviews");
//   res.render("./listings/show.ejs", { listing });
// }));

// // Create
// router.post("/listings", validateListing, wrapAsync(async (req, res) => {
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
// }));

// // Add review
// router.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   const newReview = new Review(req.body.review);
//   listing.reviews.push(newReview);
//   await newReview.save();
//   await listing.save();
//   res.redirect(`/listings/${listing._id}`);
// }));

// // Delete review
// router.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
//   const { id, reviewId } = req.params;
//   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//   await Review.findByIdAndDelete(reviewId);
//   res.redirect(`/listings/${id}`);
// }));

// // Edit
// router.get("/listings/:id/edit", wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("./listings/edit.ejs", { listing });
// }));

// // Update
// router.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect("/listings");
// }));

// // Delete listing
// router.delete("/listings/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndDelete(id);
//   res.redirect("/listings");
// }));

// module.exports = router;
