import {
  Firestore,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { IList, IVideo } from "../models/video";

export const fetchVideoBulk =
  (db: Firestore) =>
  async (listIds: Array<IList["id"]>): Promise<Array<IVideo> | null> => {
    const videoQueries = query(
      collection(db, "video"),
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
) => {
  try {
    const videosCollection = collection(db, "videos");
    const docRef = await addDoc(videosCollection, {
      ...video,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
