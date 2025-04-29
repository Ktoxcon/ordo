import { getFirestore } from "firebase-admin/firestore";

export const db = getFirestore(process.env.DB_ID);
