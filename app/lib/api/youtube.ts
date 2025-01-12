import { addDoc, collection, Firestore, getDocs, limit, query } from "firebase/firestore";

export interface VideoMeta {
  id: string;
  url: string;
  tags?: Array<string>;
  description?: string | null;
  parentId?: string;
}

const MOCK: Array<VideoMeta> = [
  {
    id: "-vq6b3B6VwQ",
    url: "-vq6b3B6VwQ",
    tags: ["вкв", "1 серія"],
  },
  {
    id: "RCa1_LNRopM",
    url: "RCa1_LNRopM",
  },
];

export const fetchHomeVideo = async (db: Firestore) => {
  const homeQuery = query(
    collection(db, 'videos'),
    limit(100)
  );
  const homeQuerySnapshot = await getDocs(homeQuery);
  const allVideos = homeQuerySnapshot.docs.map(doc => doc.data());
  console.log('\nHOME Videos: \n',allVideos);

  return allVideos;
};

export const addHomeVideo = async (db: Firestore) => {
  try {
    const videosCollection = collection(db, "videos");
    const docRef = await addDoc(videosCollection, {
      url: "Ada",
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
