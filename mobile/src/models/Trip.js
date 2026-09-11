export class Trip {
  constructor({ id, title, destination, startDate, endDate, notes = '', photo = null }) {
    this.id = id;
    this.title = title;
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.notes = notes;
    this.photo = photo;
  }

  static fromJson(data) {
    return new Trip(data);
  }
}
