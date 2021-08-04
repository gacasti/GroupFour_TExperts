// Require the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const bookingSchema = new mongoose.Schema({
    BookingId: {
        type: Number,
        required: "Required",
        trim: true,
        unique: "Booking ID should be unique",
    },
    BookingDate: {
        type: Date,
        required: "Booking date",
        trim: true,
    },
    BookingNo: {
        type: Number,
        required: "Booking Number",
        trim: true,
        unique: "Booking ID should be unique",
    },
    TravelerCount: {
        type: Number,
        required: "Number of travelers",
        trim: true,
    },
    CustomerId: {
        type: Number,
        required: "Required",
        trim: true,
        unique: "Booking ID should be unique",
    },
    TripTypeId: {
        type: Number,
        required: "Trip type",
        trim: true,
    },
    PackageId: {
        type: Number,
        required: "Package Id",
        trim: true,
    },
});

bookingSchema.plugin(uniqueValidator);
module.exports.Booking = mongoose.model('Booking', bookingSchema);