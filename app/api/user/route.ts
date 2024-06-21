import { NextRequest, NextResponse } from "next/server";
import {User} from "@/types";
import {AddUser} from "@/data/userData";

export async function POST(request:NextRequest) {

  const body:User=await request.json();

  const newUser=await AddUser(body);

  const response={
    message: "회원가입 완료",
    data:newUser
  }
  return new NextResponse(JSON.stringify(response), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

