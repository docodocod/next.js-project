"use client";

import {useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spinner
} from "@nextui-org/react";
import {Todo} from "@/types";
import {useRouter} from "next/navigation"

const TodosTable = ({todos}: { todos: Todo[] }) => {

    const [todoAddEnable, setTodoEnable] = useState(false);

    const [newTodoInput, setNewTodoInput] = useState('');

    // 로딩상태
    const [isLoading, setIsLoading]=useState<Boolean>(false);

    const router=useRouter();

    const TodoRow = (aTodo: Todo) => {
        return <TableRow key={aTodo.id}>
            <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
            <TableCell>{aTodo.title}</TableCell>
            <TableCell>{aTodo.is_done ? "완료" : "실패"}</TableCell>
            <TableCell>{aTodo.created_at}</TableCell>
        </TableRow>
    }

    const AddTodoHandler = async (title:string) => {
        if (!todoAddEnable){return}

        setIsLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'POST',
            body: JSON.stringify({
                title: title
            }),
            cache: 'no-store'
        })
        router.refresh();
        setNewTodoInput('');
        setIsLoading(false);
        console.log(`할일 추가완료: ${newTodoInput}`);
    }

    const DisAbleTodoButton = () => {
        return <Popover placement="top" showArrow={true}>
            <PopoverTrigger>
                <Button color="default" className="h-14">
                    추가
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">경고</div>
                    <div className="text-tiny">할일을 작성해주세요.</div>
                </div>
            </PopoverContent>
        </Popover>
    }

    return (
        <>
            <div className="flex flex-wrap w-64 md:flex-nowrap gap-4">
                <Input type="text" label="오늘 할 일"
                       value={newTodoInput}
                       onValueChange={(changedInput: string) => {
                           setNewTodoInput(changedInput);
                           setTodoEnable(changedInput.length > 0);
                       }}/>
                {todoAddEnable ?
                    <Button color="warning" className="h-14 flex flex-wrap "
                            onPress={async () => {
                                await AddTodoHandler(newTodoInput)
                            }}>
                        추가
                    </Button> :
                    <DisAbleTodoButton/>
                }
            </div>
            {isLoading ?? <Spinner color="warning"/>}
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
