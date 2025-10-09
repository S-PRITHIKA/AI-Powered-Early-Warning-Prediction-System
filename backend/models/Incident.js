import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

incidentSchema.index({ location: "2dsphere" }); // for geospatial queries

export default mongoose.model("Incident", incidentSchema);
