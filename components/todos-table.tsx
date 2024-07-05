"use client";

import {useState} from "react";
import {
    Table, TableHeader,TableColumn, TableBody, TableRow, TableCell,
    Input, Button, Popover, PopoverContent, PopoverTrigger, Spinner,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import {CustomModalType, FocusedTodoType, Todo} from "@/types";
import {useRouter} from "next/navigation"
import {ToastContainer, toast} from 'react-toastify';
import {VerticalDotsIcon} from './icons';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from "@/components/custom-modal";
import Calendar from "@/components/calendar";

//할일 테이블
const TodosTable = ({todos,userId}: { todos: Todo[] ,userId:string|null|undefined}) => {
    //버튼
    const [todoAddEnable, setTodoAddEnable] = useState(false);
    // 할 일 입력
    const [newTodoInput, setNewTodoInput] = useState('')
    // 로딩상태
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    //띄우는 모달 상태
    const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
        focusedTodo: null,
        modalType: "detail" as CustomModalType
    });
    // 내용 갱신
    const router = useRouter();
    
    // 할일 성공시 알람
    const notifySuccessEvent = (msg:string) => toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
    
    //한국시간으로 변환
    function convertUTCToKoreanTime(utcTimeString: Date): string {
        const date = new Date(utcTimeString); // UTC 시간 문자열을 Date 객체로 변환

        // options 객체 설정
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const koreanTimeString = new Intl.DateTimeFormat('ko-KR', options).format(date);
        return koreanTimeString;
    }

    //완료 여부 checking
    const checkIsDone=(isDone:boolean)=>(isDone ? "line-through text-gray-900/50 dark: text-white/40":
        "");

    // 할일 표
    const TodoRow = (aTodo: Todo, index: number) => {
        return <TableRow key={aTodo.id}>
            <TableCell className={checkIsDone(aTodo.is_done)}>{index}</TableCell>
            <TableCell className={checkIsDone(aTodo.is_done)}>{aTodo.title}</TableCell>
            <TableCell>{aTodo.is_done ? "완료" : "실패"}</TableCell>
            <TableCell className={checkIsDone(aTodo.is_done)}>{`${convertUTCToKoreanTime(aTodo.created_at).slice(0,12)}`}</TableCell>
            <TableCell>
                <div className="relative flex justify-end items-center gap-2">
                    <Dropdown className="bg-background border-1 border-default-200">
                        <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-400"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(key) => {
                            console.log(key);
                            setCurrentModalData({focusedTodo: aTodo, modalType: key as CustomModalType})
                            onOpen();
                        }}>
                            <DropdownItem key="detail">상세보기</DropdownItem>
                            <DropdownItem key="edit">수정</DropdownItem>
                            <DropdownItem key="delete">삭제</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </TableCell>
        </TableRow>
    }

    //open 함수 
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    //모달 토글 창
    const ModalComponent = () => {
        return (
            <div>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}
                       isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            (currentModalData.focusedTodo && <CustomModal
                                focusedTodo={currentModalData.focusedTodo} modalType={currentModalData.modalType}
                                onClose={onClose}
                                onEdit={async (id,title,isDone)=>{
                                    console.log(id,title,isDone);
                                    await EditTodoHandler(id,title,isDone);
                                    onClose();
                                }}
                                onDelete={async (id:string)=>{
                                    console.log(id);
                                    await DeleteTodoHandler(id);
                                    onClose();
                                }}
                            />)
                        )}
                    </ModalContent>
                </Modal>
            </div>
        );
    }

    //할일 추가 method
    const AddTodoHandler = async (title:string,userId:string|null|undefined) => {
        if (!todoAddEnable){return}
        setTodoAddEnable(false);
        setIsLoading(true);
        await new Promise(f=>setTimeout(f,600));
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                userId: userId
            }),
            cache: 'no-store'
        })
        router.refresh();
        setNewTodoInput('');
        notifySuccessEvent("추가되었습니다.");
        setIsLoading(false);
        setTodoAddEnable(false);
        console.log(`할일 추가완료: ${newTodoInput}`);
    }

    //할일 수정 method
    const EditTodoHandler = async (id:string,editedTitle:string,editedIsDone:boolean) => {
        setIsLoading(true);
        await new Promise(f => setTimeout(f, 600));
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                title: editedTitle,
                is_done:editedIsDone,
            }),
            cache: 'no-store'
        })
        router.refresh();
        setNewTodoInput('');
        notifySuccessEvent("수정되었습니다.");
        setIsLoading(false);
        setTodoAddEnable(false);
        console.log(`할일 수정완료: ${newTodoInput}`);
    }

    //할일 삭제 method
    const DeleteTodoHandler = async (id:string) => {
        setIsLoading(true);
        await new Promise(f => setTimeout(f, 600));
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method: 'DELETE',
            cache: 'no-store'
        })
        router.refresh();
        notifySuccessEvent("삭제 되었습니다.");
        setIsLoading(false);
        console.log(`할일 삭제 완료: ${newTodoInput}`);
    }

    //추가 버튼 누를시 경고 method
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
            <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center">
                <Input className="flex-grow max-w-[320px]" type="text" label="오늘 할 일"
                       value={newTodoInput}
                       onValueChange={(changedInput: string) => {
                           setNewTodoInput(changedInput);
                           setTodoAddEnable(changedInput.length > 0);
                       }}/>
                {todoAddEnable ?
                        <Button color="warning" className="h-14"
                                onPress={async () => {
                                    await AddTodoHandler(newTodoInput,userId)
                                }}>
                            추가
                        </Button> :
                        <DisAbleTodoButton/>
                }
            </div>
            <div className="h-6">{isLoading && <Spinner size='sm' color="warning"/>}
            </div>
            <div><Calendar/></div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn className="text-center">번호</TableColumn>
                    <TableColumn className="text-center w-32">할일 내용</TableColumn>
                    <TableColumn className="text-center">완료 여부</TableColumn>
                    <TableColumn className="text-center">생성일</TableColumn>
                    <TableColumn className="text-center">액션</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"할일을 추가 해주세요."}>
                    {todos && todos.map((aTodo: Todo,index: number) => (
                        TodoRow(aTodo,index+1)
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TodosTable;
