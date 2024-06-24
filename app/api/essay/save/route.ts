import {passingEssayCrawlingAPI} from "@/data/passingEssayData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
  const Essays=await passingEssayCrawlingAPI();
  const response={
    message:"모든 수기 저장",
    data:Essays+"개 저장 완료"
  }
  return NextResponse.json(response, {status: 201});
}

