const db = require('../database/database');

class Trip {
static getAll(callback) {
db.all('SELECT * FROM trips', [], (err, rows) => {
callback(err, rows);
});
}

static getById(id, callback) {
db.get('SELECT * FROM trips WHERE id = ?', [id], (err, row) => {
callback(err, row);
});
}

static create(tripData, callback) {
const { 
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, keyMoments, gallery,
themes, sensoryMemory
} = tripData;
    
const sql = `INSERT INTO trips (
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, keyMoments, gallery,
themes, sensoryMemory
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
db.run(sql, [
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, 
keyMoments ? JSON.stringify(keyMoments) : null, 
gallery ? JSON.stringify(gallery) : null,
themes ? JSON.stringify(themes) : null,
sensoryMemory
], function (err) {
callback(err, this.lastID);
});
}

static update(id, tripData, callback) {
const { 
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, keyMoments, gallery,
themes, sensoryMemory
} = tripData;
    
const sql = `UPDATE trips SET 
title = ?, destination = ?, startDate = ?, endDate = ?, notes = ?,
coverImage = ?, status = ?, category = ?, distance = ?, startPoint = ?, endPoint = ?, 
keyMoments = ?, gallery = ?, themes = ?, sensoryMemory = ?
WHERE id = ?`;
      
db.run(sql, [
title, destination, startDate, endDate, notes,
coverImage, status, category, distance, startPoint, endPoint, 
keyMoments ? JSON.stringify(keyMoments) : null, 
gallery ? JSON.stringify(gallery) : null,
themes ? JSON.stringify(themes) : null,
sensoryMemory,
id
], function (err) {
callback(err, this.changes);
});
}
}

module.exports = Trip;
