const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'carnet_de_route.db');

const db = new sqlite3.Database(dbPath, (err) => {
if (err) {
console.error('Erreur lors de la connexion à la base de données:', err.message);
} else {
console.log('Connecté à la base de données SQLite.');
db.run(`
CREATE TABLE IF NOT EXISTS trips (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
destination TEXT NOT NULL,
startDate TEXT NOT NULL,
endDate TEXT NOT NULL,
notes TEXT,
coverImage TEXT,
status TEXT,
category TEXT,
distance REAL,
startPoint TEXT,
endPoint TEXT,
keyMoments TEXT,
gallery TEXT,
themes TEXT,
sensoryMemory TEXT
)
`, (err) => {
if (!err) {

const columnsToAdd = [
'coverImage TEXT', 'status TEXT', 'category TEXT', 
'distance REAL', 'startPoint TEXT', 'endPoint TEXT', 
'keyMoments TEXT', 'gallery TEXT',
'themes TEXT', 'sensoryMemory TEXT'
];
columnsToAdd.forEach(col => {
db.run(`ALTER TABLE trips ADD COLUMN ${col}`, () => {
});
});
}
});
}
});

module.exports = db;
