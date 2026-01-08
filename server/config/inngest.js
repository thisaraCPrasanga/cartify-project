import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../models/user.js";
import Order from "../models/Order.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "cartify-express" });

// Inngest Function: Create User
export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url, public_metadata } = event.data;
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}`,
                imageUrl: image_url,
                role: public_metadata.role || "user"
            };

            await connectDB();
            await User.create(userData);

            console.log(" User created:", id);
            return { success: true, message: "User created successfully" };
        } catch (err) {
            console.error(" Error in syncUserCreation:", err.message);
            throw err;
        }
    }
);

// Inngest Function: Update User
export const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url, public_metadata } = event.data;
            const userData = {
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}`,
                imageUrl: image_url,
                role: public_metadata.role || "user"
            };

            await connectDB();
            await User.findByIdAndUpdate(id, userData, { new: true });

            console.log("✅ User updated:", id);
            return { success: true, message: "User updated successfully" };
        } catch (err) {
            console.error("❌ Error in syncUserUpdation:", err.message);
            throw err;
        }
    }
);

// Inngest Function: Delete User
export const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-from-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        try {
            const { id } = event.data;

            await connectDB();
            await User.findByIdAndDelete(id);

            console.log("✅ User deleted:", id);
            return { success: true, message: "User deleted successfully" };
        } catch (err) {
            console.error("❌ Error in syncUserDeletion:", err.message);
            throw err;
        }
    }
);

//inngest function to create order
export const createUserOrder = inngest.createFunction(
    {
        id: 'create-user-order',
        batchEvents: {
            maxSize: 5,
            timeout: '5s'
        }
    }, {
    event: 'order/created'
}, async ({ events }) => {

    const order = events.map((event) => {
        return {
            userId: event.data.userId,
            items: event.data.items,
            amount: event.data.amount,
            address: event.data.address,
            date: event.data.date
        }
    })

    await connectDB()
    await Order.insertMany(order)

    return { success: true, processed: order.length };
})
