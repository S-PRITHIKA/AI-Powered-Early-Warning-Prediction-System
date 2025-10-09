import Incident from "../models/Incident.js";

// Report a new incident
export const reportIncident = async (req, res) => {
  try {
    const { title, description, coordinates, severity, reportedBy } = req.body;
    const incident = new Incident({
      title,
      description,
      location: { type: "Point", coordinates },
      severity,
      reportedBy
    });
    await incident.save();
    res.status(201).json({ message: "Incident reported successfully", incident });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all incidents
export const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate("reportedBy", "name role");
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
