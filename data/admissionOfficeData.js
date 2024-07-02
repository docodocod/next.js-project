import { collection,getDocs,orderBy,query,doc,getDoc} from "firebase/firestore";
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

export async function getSchoolImage(school) {
  const schoolImageRef=doc(db, "admissions-office",school.title.slice(0,3));
  const querySnapshot = await getDoc(schoolImageRef);

  const schoolImageUrl={
      img: querySnapshot.data()['img']
    }
  return schoolImageUrl;
}

