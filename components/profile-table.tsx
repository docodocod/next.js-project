"use client";

import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {useSession} from "next-auth/react";


export default function MyProfileTable() {
  const {data:session}=useSession();

  return (
    <Card className="py-4">
      {session?.user?.data &&
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{session.user.data.nick}</p>
        <small className="text-default-500">{session.user.data.email}</small>
        <h4 className="font-bold text-large">{session.user.data.school}</h4>
      </CardHeader>
      }
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/Catholic.jpg"
          width={270}
        />
      </CardBody>
    </Card>
  );
}
