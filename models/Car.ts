import mongoose, { Schema, Document } from 'mongoose';
import { Car } from '../lib/types';

// Extend the Car interface to include Mongoose's Document
export interface CarDocument extends Omit<Car, '_id'>, Document {}

const CarSchema: Schema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  color: { type: String, required: true },
  vin: { type: String, required: false, unique: true },
  transmission: { type: String, required: true },
  fuelType: { type: String, required: true },
  bodyStyle: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  featured: { type: Boolean, required: true },
  features: { type: [String], required: true },
  specifications: {
    engine: {
      type: String,
      displacement: String,
      horsepower: Number,
      torque: Number,
      required: false
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      wheelbase: Number,
      required: false
    },
    performance: {
      zeroToSixty: { type: Number, required: true },
      topSpeed: { type: Number, required: true },
      fuelEconomyCity: { type: Number, required: true },
      fuelEconomyHighway: { type: Number, required: true }
    },
    capacity: {
      seating: Number,
      cargoVolume: Number,
      fuelTank: Number,
      towingCapacity: Number,
      required: false
    }
  },
  history: {
    owners: Number,
    title: String,
    accidents: Number,
    serviceRecords: [{
      date: String,
      mileage: Number,
      description: String
    }],
    required: false
  }
}, { timestamps: true });

// Export the model
export default mongoose.model<CarDocument>('Car', CarSchema);