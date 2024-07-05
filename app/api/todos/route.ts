import {NextRequest, NextResponse} from "next/server";
import {getAllTodos, addTodo, deleteTodo, getTodo} from "@/data/todoData";

//모든 할일 조회
/*export async function GET(request:NextRequest) {
    const Todos=await getAllTodos();
    const response={
        message:"모든 할일 조회",
        data:Todos
    }
    return NextResponse.json(response, {status: 201});
}*/

//할일 추가
export async function POST(request:NextRequest) {

    const {title,userId}=await request.json();

    if(title===undefined){
        const errMessage={
            message:"할일을 작성해주세요."
        }
        return NextResponse.json(errMessage,{status:422})
    }

    const addedTodo=await addTodo(title,userId);

    const response={
            message: "할일 추가 성공",
            data:addedTodo
    }
    return new NextResponse(JSON.stringify(response), { status: 201, headers: { 'Content-Type': 'application/json' } });
}