// controllers/listingController.js

const Listing = require('../models/listing');

// Controller to get all listings
const getAllListings = async (req, res) => {
    const alllistings = await Listing.find();
    res.render("listings/index.ejs", { alllistings });
};

// Controller to render the new listing form
const renderNewListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Controller to create a new listing
const createListing = async (req, res) => {
    let listing = new Listing(req.body.li);
    await listing.save();
    res.redirect('/listings');
};

// Controller to show a specific listing
const showListing = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.render("listings/show.ejs", { list });
};

// Controller to render the edit form for a listing
const renderEditListingForm = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.render("listings/edit.ejs", { list });
};

// Controller to update a specific listing
const updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.li });
    res.redirect("/listings");
};

// Controller to delete a specific listing
const deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
};

module.exports = {
    getAllListings,
    renderNewListingForm,
    createListing,
    showListing,
    renderEditListingForm,
    updateListing,
    deleteListing,
};
