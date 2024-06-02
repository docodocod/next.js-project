import {NextRequest, NextResponse} from "next/server";
import {editTodo, getTodo,deleteTodo} from "@/data/firestore";

//단일 할일 조회
export async function GET(request: NextRequest, {params}:{slug:string} ) {
    const Todo=await getTodo(params.slug);
    const response = {
        message: "할일 조회 성공",
        data: Todo
    }
    return NextResponse.json(response, {status: 201});
}

//단일 할일 삭제
export async function DELETE(request: NextRequest, {params}: { slug: string } ) {

    await deleteTodo(params.slug);

    const response = {
        message: "해당 할일 삭제 완료",
    }
    return NextResponse.json(response, {status: 201});
}

//단일 할일 수정
export async function POST(request: NextRequest, {params}: { slug: string } ) {
    const {title,is_done}=await request.json();
    const editTodos=await editTodo(params.slug,title,is_done);
    const response = {
        message: "해당 할일 수정 완료",
        data: editTodos
    }
    return NextResponse.json(response, {status: 201});
}