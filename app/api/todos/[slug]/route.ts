import {NextRequest, NextResponse} from "next/server";
import { editTodo, getTodo, deleteTodo, getAllTodos } from "@/data/todoData";
import { getServerSession } from "next-auth";
import {authOptions} from "@/util/authOptions";
import {Session} from "@/types"

//모든 할일 조회
export async function GET(request:NextRequest,{params}:{params:{slug:string}} ) {
    const Todos=await getAllTodos(params.slug);
    const response={
        message:"모든 할일 조회",
        data:Todos
    }
    return NextResponse.json(response, {status: 201});
}

//단일 할일 삭제
export async function DELETE(request: NextRequest, {params}: {params:{ slug: string }} ) {
    const session:Session | null=await getServerSession(authOptions);
    const userId=session?.user?.data?.email;
    const deleteTodoList=await deleteTodo(params.slug,userId);

    if (deleteTodoList===null){
        return new Response(null,{status:204});
    }
    const response = {
        message: "해당 할일 삭제 완료",
        data: deleteTodoList
    }
    return NextResponse.json(response, {status: 201});
}

//단일 할일 수정
export async function POST(request: NextRequest, {params}: {params:{ slug: string }} ) {
    const session:Session|null=await getServerSession(authOptions);
    const userId=session?.user?.data?.email;
    console.log("update todo userId:"+userId);
    const {title,is_done}=await request.json();
    const editTodos=await editTodo(params.slug,userId,{title,is_done});
    const response = {
        message: "해당 할일 수정 완료",
        data: editTodos
    }
    return NextResponse.json(response, {status: 201});
}