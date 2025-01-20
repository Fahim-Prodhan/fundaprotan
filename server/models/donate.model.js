import mongoose from "mongoose";

const donateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Donate = mongoose.model('Donate', donateSchema);

export default Donate
