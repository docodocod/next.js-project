import {useState} from "react";
import {
    Button, ModalHeader, ModalBody, ModalFooter, Input, Switch,CircularProgress
} from "@nextui-org/react";
import {CustomModalType, FocusedTodoType, Todo} from "@/types";
import 'react-toastify/dist/ReactToastify.css';

const CustomModal = ({focusedTodo, modalType, onClose,onEdit,onDelete}: {
    focusedTodo: Todo,
    modalType: CustomModalType,
    onClose: () => void,
    onEdit:(id:string,title:string,isDone:boolean)=>void,
    onDelete:(id:string)=>void
}) => {
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
    //수정된 상태
    const [isDone, setIsDone] = useState(focusedTodo.is_done)

    const [isLoading,setIsLoading]=useState(false);
    //수정된 입력
    const [editedTodoInput,setEditTodoInput]=useState<string>(focusedTodo.title);

    //상세보기 method
    const DetailModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">상세보기</ModalHeader>
                <ModalBody>
{/*                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">ID : </span>
                        <p>{focusedTodo.id}</p>
                    </div>*/}
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">할일 내용 : </span>
                        <p>{focusedTodo.title}</p>
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className='font-bold'>완료여부 : </span>
                        <p>{`${isDone ? ' 완료 ' : ' 미완료 '}`}</p>
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className='font-bold'>작성일 : </span>
                        <p>{convertUTCToKoreanTime(focusedTodo.created_at)}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </>
        )
    };

    //수정하기 method
    const EditModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
                <ModalBody>
{/*                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">ID : </span>
                        <p>{focusedTodo.id}</p>
                    </div>*/}
                    <Input
                        autoFocus
                        isRequired
                        label="할일 내용"
                        placeholder="할일을 입력해주세요"
                        variant="bordered"
                        defaultValue={focusedTodo.title}
                        value={editedTodoInput}
                        onValueChange={setEditTodoInput}
                    />
                    <div className="flex py-2 space-x-4">
                        <span className='font-bold'>완료여부 : </span>
                        <Switch defaultSelected={focusedTodo.is_done}
                               onValueChange={setIsDone}
                                color="warning"
                        />
                        {`${isDone ? '완료' : '미완료' }`}
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className='font-bold'>작성일 : </span>
                        <p>{`${convertUTCToKoreanTime(focusedTodo.created_at)}`}</p>`
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onPress={onClose}>
                        닫기
                    </Button>
                    <Button color="warning" variant="flat" onPress={()=>{
                        setIsLoading(true);
                        onEdit(focusedTodo.id,editedTodoInput,isDone)
                    }}>
                        {isLoading ?
                          <CircularProgress color="warning" aria-label="Loading..." size='sm'/> :
                          "수정"}
                    </Button>
                </ModalFooter>
            </>
        )
    }

    //삭제하기 method
    const DeleteModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">할일 삭제</ModalHeader>
                <ModalBody>
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">할일 내용 : </span>
                        <p>{focusedTodo.title}</p>
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className='font-bold'>완료 여부 : </span>
                        <p>{`${isDone ? '완료' : '미완료'}`}</p>
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className='font-bold'>작성일 : </span>
                        <p>{convertUTCToKoreanTime(focusedTodo.created_at)}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onPress={onClose}>
                        닫기
                    </Button>
                    <Button color="warning" variant="flat" onPress={()=>{
                        setIsLoading(true);
                        onDelete(focusedTodo.id)
                    }}>
                        {isLoading ?
                          <CircularProgress color="danger" aria-label="Loading..." size='sm'/> :
                          "삭제"}
                    </Button>
                </ModalFooter>
            </>
        )
    }
    
    //modal 호출
    const getModal = (type: string) => {
        switch (type) {
            case 'detail':
                return DetailModal();
            case 'edit':
                return EditModal();
            case 'delete':
                return DeleteModal();
            default:
                break;
        }
    }
    return (
        <>
            {getModal(modalType)}
        </>
    )
}

export default CustomModal;