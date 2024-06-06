"use client";

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Input,Button} from "@nextui-org/react";
import {Todo} from "@/types";

const TodosTable = ({todos}: { todos: Todo[] }) => {

    const TodoRow = (aTodo: Todo) => {
        return (
            <TableRow key={aTodo.id}>
                <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
                <TableCell>{aTodo.title}</TableCell>
                <TableCell>{aTodo.is_done ? "완료" : "실패"}</TableCell>
                <TableCell>{aTodo.created_at}</TableCell>
            </TableRow>
        )
    }

    return (
        <>
            <div className="flex flex-wrap w-full md:flex-nowrap gap-4">
                <Input type="text" label="오늘 할 일" placeholder="할 일을 작성해주세요."/>
                <Button color="warning" className="h-14">
                    추가
                </Button>
            </div>

            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>아이디</TableColumn>
                    <TableColumn>할일 내용</TableColumn>
                    <TableColumn>완료 여부</TableColumn>
                    <TableColumn>생성일</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"할일을 추가 해주세요."}>
                    {todos && todos.map((aTodo: Todo) => (
                        TodoRow(aTodo)
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default TodosTable;
