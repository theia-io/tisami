import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { IList } from "../models/video";

export const fetchListById =
  (db: Firestore) =>
  async (listId: IList["id"]): Promise<IList | null> => {
    const listQuery = doc(db, "list", listId);

    try {
      const listSnapshot = await getDoc(listQuery);
      return listSnapshot.exists()
        ? ({ ...listSnapshot.data(), id: listSnapshot.id } as IList)
        : null;
    } catch (err) {
      console.error(
        `[API][fetchListById] There is no list with listId: ${listId}`,
        err
      );
      return null;
    }
  };

export const fetchChildrenListsById =
  (db: Firestore) =>
  async (listId: IList["id"]): Promise<Array<IList>> => {
    const listQuery = query(
      collection(db, "list"),
      where("parentId", "==", listId)
    );

    try {
      const listSnapshot = await getDocs(listQuery);
      return listSnapshot.docs
        .filter((doc) => doc.exists())
        .map((doc): IList => ({ ...doc.data(), id: doc.id } as IList));
    } catch (err) {
      console.error(
        `[API][fetchListById] There are no lists for parent with listId: ${listId}`,
        err
      );
      return [];
    }
  };

export const addList = async (
  db: Firestore,
  list: Omit<IList, "id" | "timestamp">
) => {
  try {
    const listCollection = collection(db, "list");
    const docRef = await addDoc(listCollection, {
      ...list,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return {
      ...list,
      id: docRef.id,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
