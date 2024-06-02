// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDocs,collection,doc,Timestamp,setDoc,getFirestore,getDoc,deleteDoc} from "firebase/firestore"
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

//모든 할일 가져오기
export async function getAllTodos() {
    const querySnapshot = await getDocs(collection(db, "transfer-todo"));
    if (querySnapshot.empty){
        return [];
    }
    const Todos=[];
    querySnapshot.forEach((doc) => {
        const aTodo={
            id: doc.id,
            title: doc.data()["title"],
            is_done: doc.data()["is_done"],
            created_at: doc.data()["created_at"].toDate().toLocaleTimeString('ko')
        }
        Todos.push(aTodo);
    })
    return Todos;
}

//단일 할일 추가
export async function addTodo({title}){
    const newTodoRef=doc(collection(db,"transfer-todo"));
    const createdAtTimestamp=Timestamp.fromDate(new Date())
    const newTodoData={
        id:newTodoRef,
        title:title,
        is_done:false,
        created_at:createdAtTimestamp
    }
    await setDoc(newTodoRef,newTodoData);
    return newTodoData;
}

//단일 할일 조회
export async function getTodo(id){
    if (id===null){
        return null;
    }
    const TodoRef=doc(collection(db,"transfer-todo"),id);
    const todoDocSnap=await getDoc(TodoRef)

    if(todoDocSnap.exists()){
        const getTodo={
            id: todoDocSnap.id,
            title: todoDocSnap.data()['title'],
            is_done: todoDocSnap.data()['is_done'],
            created_at: todoDocSnap.data()["created_at"].toDate()
        }
        return getTodo;
    }else{
        console.log("no such document");
        return null
    }
}

//단일 할일 수정
export async function editTodo(id,title,is_done){
    if (id===null){
        return null;
    }
    const editTimeStamp=Timestamp.fromDate(new Date());
    const TodoRef=doc(db,"transfer-todo",id);
    const editTodoList={
        id:id,
        title:title,
        is_done:is_done,
        created_at:editTimeStamp
    }
    await setDoc(TodoRef,editTodoList);
    return editTodoList;
}

export async function deleteTodo(id){
    const getTodoList=await getTodo(id);

    if (getTodoList===null){
        return null;
    }
    await deleteDoc(doc(db,"transfer-todo",id));
    return getTodoList;
}