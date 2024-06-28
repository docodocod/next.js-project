import { SVGProps } from "react";

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
  password:string
}