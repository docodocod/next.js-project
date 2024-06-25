import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "./index";

export async function getAllAdmission() {
  const admissionRef=collection(db, "admissions-office");
  const admissionQuery=query(admissionRef,orderBy("title","asc"));
  const querySnapshot = await getDocs(admissionQuery);
  if (querySnapshot.empty){
    return [];
  }
  const allAdmission=[];
  querySnapshot.forEach((doc) => {
    const admission={
      title: doc.data()['title'],
      href: doc.data()['href'],
      img: doc.data()['img']
    }
    allAdmission.push(admission);
  })
  return allAdmission;
}