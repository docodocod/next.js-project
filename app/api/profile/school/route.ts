import { NextRequest, NextResponse } from "next/server";
import {getSchoolImage} from "@/data/admissionOfficeData";

export async function POST(request:NextRequest) {
  const body=await request.json();
  const schoolImage=await getSchoolImage(body);
  const response={
    message:"학교 이미지 가져오기 성공",
    data:schoolImage
  }
  return NextResponse.json(response, {status: 201});
}