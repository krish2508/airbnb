// routes/listingRouter.js

const express = require('express');
const listingRouter = express.Router();
const {
    getAllListings,
    renderNewListingForm,
    createListing,
    showListing,
    renderEditListingForm,
    updateListing,
    deleteListing,
} = require('../controllers/listingController');

// Route to get all listings

listingRouter.route('/').get(getAllListings).post(createListing);
listingRouter.route("/new").get(renderNewListingForm);
listingRouter.route("/:id").get(showListing).put(updateListing).delete(deleteListing);
listingRouter.route('/:id/edit').get(renderEditListingForm);
module.exports = listingRouter;