import {Router} from 'express';
import ArtRouter from './Art';
import AuthRouter from './Auth';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/art', ArtRouter);


router.use('/auth', AuthRouter);

// Export the base-router
export default router;
