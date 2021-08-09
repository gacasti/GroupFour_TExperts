// Require the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const bookingdetailSchema = new mongoose.Schema({
    BookingdetailId: {
        type: Number,
        required: "Required",
        trim: true,
        unique: "Booking detail ID should be unique",
    },
    ItineraryNo: {
        type: Number,
        required: "Required",
        trim: true,
        unique: "Itinerary no. should be unique",
    },
    Tripstart: {
        type: Date,
        required: "Trip start date",
        trim: true,
    },
    Tripend: {
        type: Date,
        required: "Trip end date",
        trim: true,
    },
    Description: {
        type: String,
        required: "Enter description",
        trim: true,
    },
    Destination: {
        type: String,
        required: "Enter destination",
        trim: true,
    },
    BasePrice: {
        type: Number,
        required: "Base price",
        trim: true,
    },
    AgencyCommission: {
        type: Number,
        required: "Agency booking detail commission",
        trim: true,
    },
    BookingId: {
        type: Number,
        required: "Booking Id",
        trim: true,
    },
    RegionId: {
        type: String,
        required: "Required",
        trim: true,
        default: 1,
    },
    ClassId: {
        type: String,
        required: "Class Id",
        trim: true,
        default: 1,
    },
    FeeId: {
        type: Number,
        required: "Fee Id",
        trim: true,
        default: 1,
    },
    ProductSupplierId: {
        type: Number,
        required: "Product supplier Id",
        trim: true,
        default: 1,
    },
});

bookingdetailSchema.plugin(uniqueValidator);
module.exports.Bookingdetail = mongoose.model('Bookingdetail', bookingdetailSchema);