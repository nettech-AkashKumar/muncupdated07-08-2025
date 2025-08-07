// const Location = require('../models/LocationModel');

// // Create a new location
// exports.createLocation = async (req, res, next) => {
//     const { country, state, city } = req.body;

//     // Validate input
//     if (!country || !state || !city) {
//         return res.status(400).json({ message: 'Please fill in all fields.' });
//     }

//     try {
//         let location = await Location.findOne({ country });

//         if (location) {
//             // Check if the state already exists
//             const stateIndex = location.states.findIndex(st => st.name === state);
//             if (stateIndex !== -1) {
//                 // Check if the city already exists in the state
//                 const cityExists = location.states[stateIndex].cities.includes(city);
//                 if (cityExists) {
//                     return res.status(400).json({ message: 'Location already exists.' });
//                 } else {
//                     // Add new city to the existing state
//                     location.states[stateIndex].cities.push(city);
//                 }
//             } else {
//                 // Add new state with the city
//                 location.states.push({
//                     name: state,
//                     cities: [city]
//                 });
//             }
//         } else {
//             // Create a new location with the state and city
//             location = new Location({
//                 country,
//                 states: [{
//                     name: state,
//                     cities: [city]
//                 }]
//             });
//         }

//         // Save the location
//         await location.save();
//         res.status(201).json(location);
//     } catch (error) {
//         console.error("Error creating location:", error);
//         next(error); // Pass error to the error handler middleware
//     }
// };

// // Get all locations
// exports.getAllLocations = async (req, res, next) => {
//     try {
//         const locations = await Location.find();
//         res.status(200).json(locations);
//     } catch (error) {
//         console.error("Error fetching locations:", error);
//         next(error); // Pass error to the error handler middleware
//     }
// };
const Location = require('../models/locationModals');

// Create Location (Already provided)
exports.createLocation = async (req, res) => {
    const { country, state, city } = req.body;

    if (!country || !state || !city) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    try {
        let location = await Location.findOne({ country });

        if (location) {
            const stateIndex = location.states.findIndex(st => st.name === state);
            if (stateIndex !== -1) {
                const cityExists = location.states[stateIndex].cities.includes(city);
                if (cityExists) {
                    return res.status(400).json({ message: 'Location already exists.' });
                } else {
                    location.states[stateIndex].cities.push(city);
                }
            } else {
                location.states.push({
                    name: state,
                    cities: [city]
                });
            }
        } else {
            location = new Location({
                country,
                states: [{
                    name: state,
                    cities: [city]
                }]
            });
        }

        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//
// ---------- DELETE CONTROLLERS ----------
//

// DELETE country
exports.deleteCountry = async (req, res) => {
    try {
        const { country } = req.params;
        const deleted = await Location.findOneAndDelete({ country });

        if (!deleted) return res.status(404).json({ message: 'Country not found.' });

        res.status(200).json({ message: 'Country deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE state
exports.deleteState = async (req, res) => {
    try {
        const { state } = req.params;
        const location = await Location.findOne({ "states.name": state });

        if (!location) return res.status(404).json({ message: 'State not found.' });

        location.states = location.states.filter(st => st.name !== state);
        await location.save();

        res.status(200).json({ message: 'State deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE city
exports.deleteCity = async (req, res) => {
    try {
        const { city } = req.params;
        const location = await Location.findOne({ "states.cities": city });

        if (!location) return res.status(404).json({ message: 'City not found.' });

        location.states.forEach(state => {
            state.cities = state.cities.filter(c => c !== city);
        });

        await location.save();
        res.status(200).json({ message: 'City deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//
// ---------- EDIT/UPDATE CONTROLLERS ----------
//

// Edit Country
exports.editCountry = async (req, res) => {
    const { oldCountry, newCountry } = req.body;

    try {
        const location = await Location.findOne({ country: oldCountry });
        if (!location) return res.status(404).json({ message: 'Country not found.' });

        location.country = newCountry;
        await location.save();

        res.status(200).json({ message: 'Country updated successfully.', location });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit State
exports.editState = async (req, res) => {
    const { country, oldState, newState } = req.body;

    try {
        const location = await Location.findOne({ country });
        if (!location) return res.status(404).json({ message: 'Country not found.' });

        const state = location.states.find(st => st.name === oldState);
        if (!state) return res.status(404).json({ message: 'State not found.' });

        state.name = newState;
        await location.save();

        res.status(200).json({ message: 'State updated successfully.', location });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit City
exports.editCity = async (req, res) => {
    const { country, state, oldCity, newCity } = req.body;

    try {
        const location = await Location.findOne({ country });
        if (!location) return res.status(404).json({ message: 'Country not found.' });

        const targetState = location.states.find(st => st.name === state);
        if (!targetState) return res.status(404).json({ message: 'State not found.' });

        const cityIndex = targetState.cities.findIndex(c => c === oldCity);
        if (cityIndex === -1) return res.status(404).json({ message: 'City not found.' });

        targetState.cities[cityIndex] = newCity;
        await location.save();

        res.status(200).json({ message: 'City updated successfully.', location });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// const Location = require('../models/cityModels');

// exports.createLocation = async (req, res) => {
//     const { country, state, city } = req.body;

//     if (!country || !state || !city) {
//         return res.status(400).json({ message: 'Please fill in all fields.' });
//     }

//     try {
//         let location = await Location.findOne({ country });

//         if (location) {
//             const stateIndex = location.states.findIndex(st => st.name === state);
//             if (stateIndex !== -1) {
//                 const cityExists = location.states[stateIndex].cities.includes(city);
//                 if (cityExists) {
//                     return res.status(400).json({ message: 'Location already exists.' });
//                 } else {
//                     location.states[stateIndex].cities.push(city);
//                 }
//             } else {
//                 location.states.push({
//                     name: state,
//                     cities: [city]
//                 });
//             }
//         } else {
//             location = new Location({
//                 country,
//                 states: [{
//                     name: state,
//                     cities: [city]
//                 }]
//             });
//         }

//         await location.save();
//         res.status(201).json(location);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getAllLocations = async (req, res) => {
//     try {
//         const locations = await Location.find();
//         res.status(200).json(locations);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateLocation = async (req, res) => {
//     const { country, oldState, newState, oldCity, newCity } = req.body;

//     try {
//         const location = await Location.findOne({ country });
//         if (!location) return res.status(404).json({ message: 'Country not found.' });

//         const state = location.states.find(st => st.name === oldState);
//         if (!state) return res.status(404).json({ message: 'State not found.' });

//         // Update state name if newState is provided
//         if (newState && oldState !== newState) {
//             state.name = newState;
//         }

//         // Update city if requested
//         if (oldCity && newCity) {
//             const cityIndex = state.cities.indexOf(oldCity);
//             if (cityIndex === -1) return res.status(404).json({ message: 'City not found.' });
//             state.cities[cityIndex] = newCity;
//         }

//         await location.save();
//         res.status(200).json(location);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.deleteLocation = async (req, res) => {
//     const { country, state, city } = req.body;

//     try {
//         const location = await Location.findOne({ country });
//         if (!location) return res.status(404).json({ message: 'Country not found.' });

//         const stateIndex = location.states.findIndex(st => st.name === state);
//         if (stateIndex === -1) return res.status(404).json({ message: 'State not found.' });

//         if (city) {
//             // Remove the city
//             const cityIndex = location.states[stateIndex].cities.indexOf(city);
//             if (cityIndex === -1) return res.status(404).json({ message: 'City not found.' });
//             location.states[stateIndex].cities.splice(cityIndex, 1);
//         } else {
//             // Remove the entire state
//             location.states.splice(stateIndex, 1);
//         }

//         await location.save();
//         res.status(200).json({ message: 'Location deleted successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // ================================
// exports.getStatesByCountry = async (req, res) => {
//     const { country } = req.params;

//     try {
//         const location = await Location.findOne({ country });
//         if (!location) return res.status(404).json({ message: 'Country not found.' });

//         const states = location.states.map(state => state.name);
//         res.status(200).json(states);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




// exports.getCitiesByState = async (req, res) => {
//     const { country, state } = req.params;

//     try {
//         const location = await Location.findOne({ country });
//         if (!location) return res.status(404).json({ message: 'Country not found.' });

//         const targetState = location.states.find(st => st.name === state);
//         if (!targetState) return res.status(404).json({ message: 'State not found.' });

//         res.status(200).json(targetState.cities);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

