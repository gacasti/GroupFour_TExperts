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
        type: String,
        required: "Booking Number",
        trim: true,
        unique: "Booking ID should be unique",
    },
    TravelerCount: {
        type: Number,
        required: "Number of travelers",
        trim: true,
    },
    TripTypeId: {
        type: Number,
        required: "Trip type",
        trim: true,
    },
    CustomerId: { type: bookingSchema.Types.ObjectId, ref: "User" },
    PackageId: { type: bookingSchema.Types.ObjectId, ref: "Package" },

});

bookingSchema.plugin(uniqueValidator);
module.exports.Booking = mongoose.model('Booking', bookingSchema);