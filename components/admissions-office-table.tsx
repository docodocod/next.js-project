"use client";

import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {Admission} from "@/types";

export default function AdmissionTable({admissionList}:{admissionList:Admission[]}){

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {admissionList.map((admission, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("admission pressed")}>
          <CardBody className="overflow-visible p-0">
            <a href={admission.href} target="_blank">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={admission.title}
              className="w-full object-cover h-[140px]"
              src={admission.img}
            /></a>
          </CardBody>
          <CardFooter className="text-small text-center">
            <b className="text-center">{admission.title}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
