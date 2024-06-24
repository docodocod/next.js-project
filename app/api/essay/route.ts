import {getAllPassingEssay} from "@/data/passingEssayData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
  const allPassingList=await getAllPassingEssay();
  const response={
    message:"모든 수기 불러오기 완료",
    data:allPassingList
  }
  return NextResponse.json(response,{status:201});
}