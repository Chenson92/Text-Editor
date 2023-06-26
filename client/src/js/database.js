import { openDB } from "idb";

const versionNumber = 1.1;
const initdb = async () =>
  openDB("jate", versionNumber, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //console.error("putDb not implemented");
  const jateDb = await openDB("jate", versionNumber);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");

  try {
    await store.put({ id: 1, value: content });
    console.log("Content added to the database:", content);
  } catch (error) {
    console.error("Error adding content to the database:", error);
  } finally {
    await tx.complete;
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //console.error("getDb not implemented"); // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", versionNumber);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log({ result });
  console.log("result.value", result.value);
  return result.value;
}; // getDb

initdb();
