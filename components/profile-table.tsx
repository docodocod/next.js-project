"use client";

import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {useSession} from "next-auth/react";


export default function MyProfileTable() {
  const {data:session}=useSession();
  /*const title=session?.user?.data?.school;
  const getSchoolImage=async (school: string | null | undefined)=>{
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/school`, {
      method: 'POST',
      body: JSON.stringify({
        title: school
      }),
      cache: 'no-store'
    })
    return res.data;
  }
  const schoolImage=getSchoolImage(title);
  console.log(schoolImage);*/
  return (
    <Card className="py-4">
      {session?.user &&
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{session?.user?.data?.nick}</p>
        <small className="text-default-500">{session?.user?.data?.email}</small>
        <h4 className="font-bold text-large">{session?.user?.data?.school}</h4>
      </CardHeader>
      }
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/Yonsei.png"
          width={270}
        />
      </CardBody>
    </Card>
  );
}
