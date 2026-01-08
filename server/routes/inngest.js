import { serve } from "inngest/express";
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion, createUserOrder } from "../config/inngest.js";
import express from 'express';

const router = express.Router();

// serve handler returns an array of middleware/handlers usually, or a single handler.
// inngest/express serve returns a request handler.
// We can mount it on the path.

const inngestHandler = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserUpdation,
        syncUserDeletion,
        createUserOrder
    ],
});

router.use('/', inngestHandler);

export default router;
