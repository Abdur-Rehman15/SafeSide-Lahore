import TrustedPlace from '../models/TrustedPlace.js';

// Create a new trusted place
export const createTrustedPlace = async (req, res) => {
  try {
    const { name, coordinates, phoneNumber } = req.body;

    // Validate required fields
    if (!name || !coordinates || !phoneNumber) {
      return res.status(400).json({ 
        message: 'Please provide name, coordinates (latitude, longitude), and phone number' 
      });
    }

    // Validate coordinates
    if (typeof coordinates.latitude !== 'number' || typeof coordinates.longitude !== 'number') {
      return res.status(400).json({ 
        message: 'Coordinates must be numbers' 
      });
    }

    const trustedPlace = new TrustedPlace({
      name,
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      },
      phoneNumber
    });

    await trustedPlace.save();
    res.status(201).json({
      message: 'Trusted place created successfully',
      trustedPlace
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trusted places
export const getAllTrustedPlaces = async (req, res) => {
  try {
    const trustedPlaces = await TrustedPlace.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: trustedPlaces.length,
      trustedPlaces
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single trusted place by ID
export const getTrustedPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const trustedPlace = await TrustedPlace.findById(id);
    
    if (!trustedPlace) {
      return res.status(404).json({ message: 'Trusted place not found' });
    }
    
    res.status(200).json(trustedPlace);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid trusted place ID' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update a trusted place
export const updateTrustedPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, coordinates, phoneNumber } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (coordinates) {
      if (typeof coordinates.latitude !== 'number' || typeof coordinates.longitude !== 'number') {
        return res.status(400).json({ 
          message: 'Coordinates must be numbers' 
        });
      }
      updateData.coordinates = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      };
    }
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    const trustedPlace = await TrustedPlace.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!trustedPlace) {
      return res.status(404).json({ message: 'Trusted place not found' });
    }

    res.status(200).json({
      message: 'Trusted place updated successfully',
      trustedPlace
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid trusted place ID' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete a trusted place
export const deleteTrustedPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const trustedPlace = await TrustedPlace.findByIdAndDelete(id);

    if (!trustedPlace) {
      return res.status(404).json({ message: 'Trusted place not found' });
    }

    res.status(200).json({
      message: 'Trusted place deleted successfully',
      trustedPlace
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid trusted place ID' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get nearby trusted places (within a certain radius)
export const getNearbyTrustedPlaces = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query; // radius in meters, default 5km

    if (!latitude || !longitude) {
      return res.status(400).json({ 
        message: 'Please provide latitude and longitude' 
      });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Calculate distance for each place (using Haversine formula approximation)
    const trustedPlaces = await TrustedPlace.find();
    
    const nearbyPlaces = trustedPlaces
      .map(place => {
        const distance = calculateDistance(
          lat, 
          lon, 
          place.coordinates.latitude, 
          place.coordinates.longitude
        );
        return { ...place.toObject(), distance };
      })
      .filter(place => place.distance <= radius / 1000) // Convert meters to km
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      count: nearbyPlaces.length,
      radius: radius,
      location: { latitude: lat, longitude: lon },
      trustedPlaces: nearbyPlaces
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

