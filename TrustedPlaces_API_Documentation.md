# Trusted Places API Documentation

## Base URL
```
http://localhost:5000/trusted-places
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

## Endpoints

### 1. Create Trusted Place
**POST** `/trusted-places`

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (required)

**Request Body:**
```json
{
  "name": "Lahore General Hospital",
  "coordinates": {
    "latitude": 31.5204,
    "longitude": 74.3587
  },
  "phoneNumber": "042-99204400"
}
```

**Response (201):**
```json
{
  "message": "Trusted place created successfully",
  "trustedPlace": {
    "_id": "...",
    "name": "Lahore General Hospital",
    "coordinates": {
      "latitude": 31.5204,
      "longitude": 74.3587
    },
    "phoneNumber": "042-99204400",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get All Trusted Places
**GET** `/trusted-places`

**Response (200):**
```json
{
  "count": 10,
  "trustedPlaces": [
    {
      "_id": "...",
      "name": "Lahore General Hospital",
      "coordinates": {
        "latitude": 31.5204,
        "longitude": 74.3587
      },
      "phoneNumber": "042-99204400",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Trusted Place by ID
**GET** `/trusted-places/:id`

**Response (200):**
```json
{
  "_id": "...",
  "name": "Lahore General Hospital",
  "coordinates": {
    "latitude": 31.5204,
    "longitude": 74.3587
  },
  "phoneNumber": "042-99204400",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 4. Get Nearby Trusted Places
**GET** `/trusted-places/nearby?latitude=31.5204&longitude=74.3587&radius=5000`

**Query Parameters:**
- `latitude` (required): Your latitude
- `longitude` (required): Your longitude
- `radius` (optional): Radius in meters (default: 5000)

**Response (200):**
```json
{
  "count": 5,
  "radius": 5000,
  "location": {
    "latitude": 31.5204,
    "longitude": 74.3587
  },
  "trustedPlaces": [
    {
      "_id": "...",
      "name": "Lahore General Hospital",
      "coordinates": {
        "latitude": 31.5204,
        "longitude": 74.3587
      },
      "phoneNumber": "042-99204400",
      "distance": 0.5
    }
  ]
}
```

---

### 5. Update Trusted Place
**PUT** `/trusted-places/:id`

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (required)

**Request Body (all fields optional):**
```json
{
  "name": "Updated Hospital Name",
  "coordinates": {
    "latitude": 31.5300,
    "longitude": 74.3600
  },
  "phoneNumber": "042-99204401"
}
```

**Response (200):**
```json
{
  "message": "Trusted place updated successfully",
  "trustedPlace": {
    "_id": "...",
    "name": "Updated Hospital Name",
    ...
  }
}
```

---

### 6. Delete Trusted Place
**DELETE** `/trusted-places/:id`

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response (200):**
```json
{
  "message": "Trusted place deleted successfully",
  "trustedPlace": {
    "_id": "...",
    "name": "Lahore General Hospital",
    ...
  }
}
```

---

## Dummy Data for Testing

Here are 10 sample trusted places in Lahore, Pakistan:

1. **Shalimar Hospital**
   - Latitude: 31.5497, Longitude: 74.3436
   - Phone: 042-35789621

2. **Services Hospital Lahore**
   - Latitude: 31.5681, Longitude: 74.3315
   - Phone: 042-99213901

3. **Mayo Hospital**
   - Latitude: 31.5701, Longitude: 74.3053
   - Phone: 042-99211101

4. **Ittefaq Hospital**
   - Latitude: 31.4826, Longitude: 74.2648
   - Phone: 042-35863301

5. **Lahore Police Station - Model Town**
   - Latitude: 31.4859, Longitude: 74.2994
   - Phone: 042-35922900

6. **Lahore Police Station - Gulberg**
   - Latitude: 31.5154, Longitude: 74.3366
   - Phone: 042-35767100

7. **Jinnah Hospital**
   - Latitude: 31.5056, Longitude: 74.2652
   - Phone: 042-99213333

8. **Fatima Memorial Hospital**
   - Latitude: 31.4675, Longitude: 74.3109
   - Phone: 042-35843941

9. **Lahore Rescue 1122 - Central**
   - Latitude: 31.5497, Longitude: 74.3436
   - Phone: 1122

10. **Combined Military Hospital (CMH) Lahore**
    - Latitude: 31.4689, Longitude: 74.3608
    - Phone: 042-36672261

---

## Import Postman Collection

1. Open Postman
2. Click "Import" button
3. Select `TrustedPlaces_Postman_Collection.json`
4. Update the `baseUrl` variable if needed (default: http://localhost:5000)
5. Login first to get `authToken` and set it in the collection variables

---

## Error Responses

**400 Bad Request:**
```json
{
  "message": "Please provide name, coordinates (latitude, longitude), and phone number"
}
```

**401 Unauthorized:**
```json
{
  "message": "Not authorized, no token"
}
```

**404 Not Found:**
```json
{
  "message": "Trusted place not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Error message here"
}
```

