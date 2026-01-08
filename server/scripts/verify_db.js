import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const TARGET_DB = 'cartify';

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
}

const verifyMigration = async () => {
    console.log(`🔍 Verifying data in database: ${TARGET_DB}...`);

    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        const db = client.db(TARGET_DB);

        // Get all collections
        const collections = await db.listCollections().toArray();
        console.log(`\nFound ${collections.length} collections:`);

        if (collections.length === 0) {
            console.log("❌ No collections found! Migration might have failed.");
        }

        for (const colInfo of collections) {
            const colName = colInfo.name;
            const count = await db.collection(colName).countDocuments();
            console.log(`   - ${colName}: ${count} documents`);
        }

    } catch (error) {
        console.error('❌ Verification failed:', error);
    } finally {
        await client.close();
    }
};

verifyMigration();
