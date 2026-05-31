
    module.exports = function (app) {
        const modelName = "flights";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            flightNumber: { type:  String , comment: "Flight Number, p, false, true, true, true, true, true, true, , , , ," },
callsign: { type:  String , comment: "Callsign, p, false, true, true, true, true, true, true, , , , ," },
aircraftType: { type:  String , comment: "Aircraft Type, p, false, true, true, true, true, true, true, , , , ," },
departure: { type:  String , comment: "Departure, p, false, true, true, true, true, true, true, , , , ," },
destination: { type:  String , comment: "Destination, p, false, true, true, true, true, true, true, , , , ," },
eobtUtc: { type: Number, comment: "EOBT UTC, p_number, false, true, true, true, true, true, true, , , , ," },
route: { type:  String , comment: "Route, p, false, true, true, true, true, true, true, , , , ," },
cruisingAltitude: { type:  String , comment: "Cruising Altitude, p, false, true, true, true, true, true, true, , , , ," },
fuelOnBoardKg: { type: Number, comment: "Fuel On Board Kg, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };