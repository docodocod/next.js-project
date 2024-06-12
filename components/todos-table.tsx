"use client";

import {useState} from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Input, Button, Popover, PopoverContent, PopoverTrigger, Spinner,
    Modal,ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure,
    Dropdown,DropdownTrigger,DropdownMenu,DropdownItem
} from "@nextui-org/react";
import {CustomModalType, FocusedTodoType, Todo} from "@/types";
import {useRouter} from "next/navigation"
import {ToastContainer, toast} from 'react-toastify';
import {VerticalDotsIcon} from './icons';
import 'react-toastify/dist/ReactToastify.css';

const TodosTable = ({todos}: { todos: Todo[] }) => {
    const [todoAddEnable, setTodoAddEnable] = useState(false);
    const [newTodoInput, setNewTodoInput] = useState('');
    // 로딩상태
    const [isLoading, setIsLoading]=useState<Boolean>(false);

    //띄우는 모달 상태
    const [currentModalData,setCurrentModalData]=useState<FocusedTodoType>({
        focusedTodo: null,
        modalType: "detail" as CustomModalType
    })
    const router=useRouter();
    const notify = () => toast.success("등록이 완료되었습니다.",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
    const ChangeDateFormat= (today: Date)=>{
        const date=new Date(today);
        const options = {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const koreanTimeString = new Intl.DateTimeFormat('ko-KR', options).format(date);
        return koreanTimeString;
    }


    const TodoRow = (aTodo: Todo) => {
        return <TableRow key={aTodo.id}>
            <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
            <TableCell>{aTodo.title}</TableCell>
            <TableCell>{aTodo.is_done ? "완료" : "실패"}</TableCell>
            <TableCell>{ChangeDateFormat(aTodo.created_at)}</TableCell>
            <TableCell>
                <div className="relative flex justify-end items-center gap-2">
                    <Dropdown className="bg-background border-1 border-default-200">
                        <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-400"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(key)=>{
                            console.log(key);
                            setCurrentModalData({focusedTodo:aTodo, modalType : key as CustomModalType})
                            onOpen();
                        }}>
                            <DropdownItem key="detail">상세보기</DropdownItem>
                            <DropdownItem key="update">수정</DropdownItem>
                            <DropdownItem key="delete">삭제</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </TableCell>
        </TableRow>
    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const ModalComponent = () => {
        return (
            <div>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}
                       isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{currentModalData.modalType}</ModalHeader>
                                <ModalBody>

                                </ModalBody>
                                <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        );
    }

    const AddTodoHandler = async (title:string) => {
        if (!todoAddEnable){return}
        setTodoAddEnable(false);
        setIsLoading(true);
        await new Promise(f=>setTimeout(f,600));
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'POST',
            body: JSON.stringify({
                title: title
            }),
            cache: 'no-store'
        })
        router.refresh();
        setNewTodoInput('');
        notify();
        setIsLoading(false);
        setTodoAddEnable(false);
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
        <div className='flex flex-col space-y-2'>
            {ModalComponent()}
            <ToastContainer/>
            <div className="flex flex-wrap w-100 md:flex-nowrap gap-4">
                <Input type="text" label="오늘 할 일"
                       value={newTodoInput}
                       onValueChange={(changedInput: string) => {
                           setNewTodoInput(changedInput);
                           setTodoAddEnable(changedInput.length > 0);
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
            <div className="h-6">{isLoading && <Spinner size='sm' color="warning"/>}
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>아이디</TableColumn>
                    <TableColumn>할일 내용</TableColumn>
                    <TableColumn>완료 여부</TableColumn>
                    <TableColumn>생성일</TableColumn>
                    <TableColumn>액션</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"할일을 추가 해주세요."}>
                    {todos && todos.map((aTodo: Todo) => (
                        TodoRow(aTodo)
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TodosTable;
