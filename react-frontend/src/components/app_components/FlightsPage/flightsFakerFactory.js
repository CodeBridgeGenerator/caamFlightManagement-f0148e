
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
flightNumber: faker.lorem.sentence(""),
callsign: faker.lorem.sentence(""),
aircraftType: faker.lorem.sentence(""),
departure: faker.lorem.sentence(""),
destination: faker.lorem.sentence(""),
eobtUtc: faker.lorem.sentence(""),
route: faker.lorem.sentence(""),
cruisingAltitude: faker.lorem.sentence(""),
fuelOnBoardKg: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
