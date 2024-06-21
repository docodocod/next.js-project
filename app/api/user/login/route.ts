import { NextRequest, NextResponse } from "next/server";
import {User} from "@/types";
import {getUser} from "@/data/userData";

export async function POST(request:NextRequest){
  const body:User=await request.json();
  const User=await getUser(body);
  const response={
    message: "로그인 완료",
    data:User
  }
  return new NextResponse(JSON.stringify(response), { status: 201, headers: { 'Content-Type': 'application/json' } });


}