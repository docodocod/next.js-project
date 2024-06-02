import {NextRequest, NextResponse} from "next/server";
import {getAllTodos,addTodo} from "@/data/firestore";


//모든 할일 조회
export async function GET(request:NextRequest) {
    const Todos=await getAllTodos();
    const response={
        message:"모든 할일 조회",
        data:Todos
    }

    return NextResponse.json(response, {status: 201});
}

//할일 추가
export async function POST(request:NextRequest) {

    const {title}=await request.json();

    const addedTodo=await addTodo({title});

    const response={
        message: "할일 추가 성공",
        data:addedTodo
    }
    return Response.json(response,{status:201});
}