const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("flights service", async () => {
  let thisService;
  let flightCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("flights");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (flights)");
  });

  describe("#create", () => {
    const options = {"flightNumber":"new value","callsign":"new value","aircraftType":"new value","departure":"new value","destination":"new value","eobtUtc":23,"route":"new value","cruisingAltitude":"new value","fuelOnBoardKg":23,"status":"new value"};

    beforeEach(async () => {
      flightCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new flight", () => {
      assert.strictEqual(flightCreated.flightNumber, options.flightNumber);
assert.strictEqual(flightCreated.callsign, options.callsign);
assert.strictEqual(flightCreated.aircraftType, options.aircraftType);
assert.strictEqual(flightCreated.departure, options.departure);
assert.strictEqual(flightCreated.destination, options.destination);
assert.strictEqual(flightCreated.eobtUtc, options.eobtUtc);
assert.strictEqual(flightCreated.route, options.route);
assert.strictEqual(flightCreated.cruisingAltitude, options.cruisingAltitude);
assert.strictEqual(flightCreated.fuelOnBoardKg, options.fuelOnBoardKg);
assert.strictEqual(flightCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a flight by ID", async () => {
      const retrieved = await thisService.Model.findById(flightCreated._id);
      assert.strictEqual(retrieved._id.toString(), flightCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"flightNumber":"updated value","callsign":"updated value","aircraftType":"updated value","departure":"updated value","destination":"updated value","eobtUtc":100,"route":"updated value","cruisingAltitude":"updated value","fuelOnBoardKg":100,"status":"updated value"};

    it("should update an existing flight ", async () => {
      const flightUpdated = await thisService.Model.findByIdAndUpdate(
        flightCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(flightUpdated.flightNumber, options.flightNumber);
assert.strictEqual(flightUpdated.callsign, options.callsign);
assert.strictEqual(flightUpdated.aircraftType, options.aircraftType);
assert.strictEqual(flightUpdated.departure, options.departure);
assert.strictEqual(flightUpdated.destination, options.destination);
assert.strictEqual(flightUpdated.eobtUtc, options.eobtUtc);
assert.strictEqual(flightUpdated.route, options.route);
assert.strictEqual(flightUpdated.cruisingAltitude, options.cruisingAltitude);
assert.strictEqual(flightUpdated.fuelOnBoardKg, options.fuelOnBoardKg);
assert.strictEqual(flightUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a flight", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const flightDeleted = await thisService.Model.findByIdAndDelete(flightCreated._id);
      assert.strictEqual(flightDeleted._id.toString(), flightCreated._id.toString());
    });
  });
});