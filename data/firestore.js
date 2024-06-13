// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDocs,collection,doc,Timestamp,setDoc,getFirestore,getDoc,deleteDoc,updateDoc,orderBy,query} from "firebase/firestore"
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUERMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const createdAtTimestamp=Timestamp.fromDate(new Date())


//모든 할일 가져오기
export async function getAllTodos() {
    const todoRef=collection(db, "transfer-todo");
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
export async function addTodo({title}){
    const newTodoRef=doc(collection(db,"transfer-todo"));
    const newTodoData={
        id:newTodoRef.id,
        title:title,
        is_done:false,
        created_at:createdAtTimestamp
    }
    await setDoc(newTodoRef,newTodoData);
    return {
        id:newTodoRef.id,
        title:title,
        is_done:false,
        created_at:createdAtTimestamp.toDate()
    }
}

//단일 할일 조회
export async function getTodo(id){
    if (id===null){
        return null;
    }
    const TodoRef=doc(collection(db,"transfer-todo"),id);
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
export async function editTodo(id,{title,is_done}){

    const getTodoList=await getTodo(id);

    if (getTodoList===null){
        return null;
    }
    const TodoRef=doc(db,"transfer-todo",id);
    const updatedTodo=await updateDoc(TodoRef,{
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
export async function deleteTodo(id){
    const getTodoList=await getTodo(id);

    if (getTodoList===null){
        return null;
    }
    await deleteDoc(doc(db,"transfer-todo",id));
    return getTodoList;
}