import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc
} from "firebase/firestore";
import db from "./index.js";

const createdAtTimestamp=Timestamp.fromDate(new Date())

export async function getAllTodos(userId) {
  console.log("getAllTodos id:"+userId);
  const todoRef=collection(db, "user",userId,"transfer-todos");
  const descQuery=query(todoRef,orderBy("created_at","desc"));
  const querySnapshot = await getDocs(descQuery);
  if (querySnapshot.empty){
    return [];
  }
  const allTodos=[];
  querySnapshot.forEach((doc) => {
    const aTodo={
      id: doc.id,
      title: doc.data()["title"],
      is_done: doc.data()["is_done"],
      created_at: doc.data()["created_at"].toDate()
    }
    allTodos.push(aTodo);
  })
  return allTodos;
}

//단일 할일 추가
export async function addTodo(title,userId){
  const newTodoRef=doc(collection(db,"user",userId,"transfer-todos"));
  const newTodoData={
    id:newTodoRef.id,
    title:title,
    is_done:false,
    created_at:createdAtTimestamp
  }
  const list=await setDoc(newTodoRef,newTodoData);
  if(list===null){
    return null
  }else {
    return {
      id: newTodoRef.id,
      title: title,
      is_done: false,
      created_at: createdAtTimestamp.toDate()
    }
  }
}

//단일 할일 조회
export async function getTodo(id,userId){
  if (id===null){
    return null;
  }
  const TodoRef=doc(db,"user",userId,"transfer-todos",id);
  const todoDocSnap=await getDoc(TodoRef)

  if(todoDocSnap.exists()){
    console.log('Document data:', todoDocSnap.data());

    const getATodo={
      id: todoDocSnap.id,
      title: todoDocSnap.data()['title'],
      is_done: todoDocSnap.data()['is_done'],
      created_at: todoDocSnap.data()["created_at"].toDate()
    }
    return getATodo;
  }else{
    console.log("no such document");
    return null
  }
}

//단일 할일 수정
export async function editTodo(id,userId,{title,is_done}){

  const getTodoList=await getTodo(id,userId);

  if (getTodoList===null){
    return null;
  }
  const TodoRef = doc(db,"user",userId,"transfer-todos",id);
  await updateDoc(TodoRef,{
    title: title,
    is_done: is_done
  });
  return {
    id:id,
    title:title,
    is_done:is_done,
    created_at:getTodoList.created_at
  };
}

//단일 할일 삭제
export async function deleteTodo(id,userId){
  const getTodoList=await getTodo(id,userId);

  if (getTodoList===null){
    return null;
  }
  const deleteRef=doc(db,'user',userId,'transfer-todos',id);
  await deleteDoc(deleteRef);
  return getTodoList;
}