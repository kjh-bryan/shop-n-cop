import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

export class MongoDBConnection {
  private static client: MongoClient;
  public static getClient = () => {
    try {
      if (MongoDBConnection.client) {
        return MongoDBConnection.client;
      } else {
        if (uri) {
          MongoDBConnection.client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            },
          });
          return MongoDBConnection.client;
        } else {
          console.error('[getClient] uri is undefined');
        }
      }
    } catch (error) {
      console.error('[getClient]', error);
    }
  };

  public static connect = async () => {
    try {
      const client: MongoClient | undefined = MongoDBConnection.getClient();
      if (!client) {
        console.error('[connect] Cannot get client');
        return;
      }
      await client.connect();
      console.log('MongoDB connection successful!');
    } catch (error) {
      console.error('[connect]', error);
    }
  };
  public static closeConnection = async () => {
    try {
      if (!MongoDBConnection.client) {
        console.error("[closeConnection] client doesn't exist.");
        return;
      }
      await MongoDBConnection.client.close();
    } catch (error) {
      console.error('[closeConnection]', error);
    }
  };
}
