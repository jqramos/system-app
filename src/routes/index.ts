import {Router} from 'express';
import ArtRouter from './Art';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/art', ArtRouter);

// Export the base-router
export default router;
