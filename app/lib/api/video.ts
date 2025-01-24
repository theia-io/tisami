import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";
import { IList, IVideo } from "../models/video";

const VIDEO_COLLECTION = "video";

export const fetchListVideo =
  (db: Firestore) =>
  async (listId: IList["id"]): Promise<Array<IVideo> | null> => {
    const videoQueries = query(
      collection(db, VIDEO_COLLECTION),
      where("listId", "==", listId)
    );

    try {
      const videoListSnapshot = await getDocs(videoQueries);
      return videoListSnapshot.docs.map(
        (doc): IVideo =>
          ({
            ...doc.data(),
            id: doc.id,
          } as IVideo)
      );
    } catch (err) {
      console.error(
        `[API][fetchVideoBulk] There is no videos for listId: ${listId}`,
        err
      );
      return null;
    }
  };

export const fetchListBulkVideo =
  (db: Firestore) =>
  async (listIds: Array<IList["id"]>): Promise<Array<IVideo> | null> => {
    const videoQueries = query(
      collection(db, VIDEO_COLLECTION),
      where("listId", "in", listIds)
    );

    try {
      const videoListSnapshot = await getDocs(videoQueries);
      return videoListSnapshot.docs.map(
        (doc): IVideo =>
          ({
            ...doc.data(),
            id: doc.id,
          } as IVideo)
      );
    } catch (err) {
      console.error(
        `[API][fetchVideoBulk] There is no videos for listIds: ${listIds}`,
        err
      );
      return null;
    }
  };

export const addVideo = async (
  db: Firestore,
  video: Omit<IVideo, "id" | "timestamp">
): Promise<any> => {
  try {
    const videosCollection = collection(db, VIDEO_COLLECTION);
    const docRef = await addDoc(videosCollection, {
      ...video,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id, docRef);
    return {
      ...video,
      id: docRef.id,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
