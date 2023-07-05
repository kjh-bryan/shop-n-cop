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
      //   // erase from here
      //   const dbName = 'test';
      //   const db = client.db(dbName);
      //   // Use the collection "people"
      // const col = db.collection('people');
      // // Construct a document
      // const personDocument = {
      //   name: { first: 'Alan', last: 'Turing' },
      //   birth: new Date(1912, 5, 23), // May 23, 1912
      //   death: new Date(1954, 5, 7), // May 7, 1954
      //   contribs: ['Turing machine', 'Turing test', 'Turingery'],
      //   views: 1250000,
      // };
      // // Insert a single document, wait for promise so we can read it back
      // const p = await col.insertOne(personDocument);
      // // Find one document
      // const myDoc = await col.findOne();
      // // Print to the console
      // console.log(myDoc);

      // erase to here
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
