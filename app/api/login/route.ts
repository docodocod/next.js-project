import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/data/firestore";


//로그인
export async function POST(request:NextRequest) {
    const {email}=request.json();
    const {password}=request.json();
    const UserInfo=await getUser(email,password);
    const response={
        message:"로그인 성공"
    }
    return NextResponse.json(response, {status: 201});
}
