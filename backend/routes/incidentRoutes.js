import express from "express";
import { reportIncident, getIncidents } from "../controllers/incidentController.js";

const router = express.Router();

// POST /api/incidents/report
router.post("/report", reportIncident);

// GET /api/incidents
router.get("/", getIncidents);

export default router;
