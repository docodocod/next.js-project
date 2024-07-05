import { SVGProps } from "react";
import { ISODateString } from "next-auth/src/core/types";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo={
  id: string;
  title: string;
  is_done: boolean;
  created_at: Date;
}

export type Essay={
  essay_id:string,
  essay_href: string,
  essay_title: string,
  essay_date: string,
}

export type Admission={
  title:string,
  img:string,
  href:string,
}

export type CustomModalType= 'detail' | 'edit' | 'delete'

export type FocusedTodoType={
  focusedTodo:Todo | null,
  modalType: CustomModalType
}

export type User={
  nick?:string,
  email:string,
  password:string,
  school:string,
}

export type Session={
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    data?:{
      nick:string|null
      email:string|null
      school:string|null
    }
  }
  expires: ISODateString
}