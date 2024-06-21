import db from "./index.js";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import * as bcrypt from "bcrypt";

export async function AddUser(User){
  const newUserRef=doc(collection(db,"user"),User.email);
  console.log(newUserRef);
  const hashedPassword=await bcrypt.hash(User.password,10);
  const newUserData={
    nick:User.nick,
    email:User.email,
    password: hashedPassword,
  }
  const list=await setDoc(newUserRef,newUserData);
  if(list===null){
    return null
  }else {
    return {
      nick:User.nick,
      email:User.email
    }
  }
}

export async function getUser(User){
    if (User===null){
      return null;
    }
    const UserRef=doc(db,"user",User.email);
    const userDocSnap=await getDoc(UserRef)
    if(userDocSnap && (await bcrypt.compare(User.password,userDocSnap.data()['password']))){
      console.log('Document data:', userDocSnap.data());
      const getUser={
        nick:userDocSnap.data()['nick'],
        email: userDocSnap.data()['email']
      }
      return getUser;
    }else{
      console.log("비밀번호를 잘못 입력하였습니다.");
      return null
    }
}