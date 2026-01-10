import express from 'express';
import {
  createTrustedPlace,
  getAllTrustedPlaces,
  getTrustedPlaceById,
  updateTrustedPlace,
  deleteTrustedPlace,
  getNearbyTrustedPlaces
} from '../controllers/trustedPlaceController.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/', createTrustedPlace);
router.get('/', getAllTrustedPlaces);
router.get('/nearby', getNearbyTrustedPlaces);
router.get('/:id', getTrustedPlaceById);
router.put('/:id', updateTrustedPlace);
router.delete('/:id', deleteTrustedPlace);

export default router;

