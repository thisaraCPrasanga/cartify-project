import { clerkClient } from '@clerk/clerk-sdk-node';

const authSeller = async (req, res, next) => {
    try {
        const { userId } = req.auth;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);

        if (user.publicMetadata.role === 'seller') {
            next();
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized: Seller access required" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default authSeller;
