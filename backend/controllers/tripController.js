const Trip = require('../models/tripModel');

const parseTripData = (trip) => {
if (!trip) return trip;
try {
if (trip.keyMoments && typeof trip.keyMoments === 'string') trip.keyMoments = JSON.parse(trip.keyMoments);
} catch (e) {}
try {
if (trip.gallery && typeof trip.gallery === 'string') trip.gallery = JSON.parse(trip.gallery);
} catch (e) {}
try {
if (trip.themes && typeof trip.themes === 'string') trip.themes = JSON.parse(trip.themes);
} catch (e) {}
return trip;
};

exports.getAllTrips = (req, res) => {
Trip.getAll((err, trips) => {
if (err) {
return res.status(500).json({ error: 'Erreur lors de la récupération des voyages.' });
}
res.json(trips.map(parseTripData));
});
};

exports.getTripById = (req, res) => {
const id = req.params.id;
Trip.getById(id, (err, trip) => {
if (err) {
return res.status(500).json({ error: 'Erreur lors de la récupération du voyage.' });
}
if (!trip) {
return res.status(404).json({ error: 'Voyage non trouvé.' });
}
res.json(parseTripData(trip));
});
};

exports.createTrip = (req, res) => {
const { 
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, keyMoments, gallery,
themes, sensoryMemory
} = req.body;
  
if (!title || !destination || !startDate || !endDate) {
return res.status(400).json({ error: 'Titre, destination, startDate et endDate sont obligatoires.' });
}

const tripData = { 
title, destination, startDate, endDate, notes: notes || '',
coverImage, status, category, distance, startPoint, endPoint, keyMoments, gallery,
themes, sensoryMemory
};

Trip.create(tripData, (err, newId) => {
if (err) {
return res.status(500).json({ error: 'Erreur lors de la création du voyage.' });
}
res.status(201).json({ 
message: 'Voyage créé avec succès', 
trip: { id: newId, ...tripData } 
});
});
};

exports.updateTrip = (req, res) => {
const id = req.params.id;
const { 
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, keyMoments, gallery,
themes, sensoryMemory
} = req.body;

const tripData = { 
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, keyMoments, gallery,
themes, sensoryMemory
};

Trip.update(id, tripData, (err, changes) => {
if (err) {
return res.status(500).json({ error: 'Erreur lors de la mise à jour du voyage.' });
}
if (changes === 0) {
return res.status(404).json({ error: 'Voyage non trouvé.' });
}
res.json({ message: 'Voyage mis à jour avec succès' });
});
};
