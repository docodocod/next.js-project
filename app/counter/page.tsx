import { title } from "@/components/primitives";
import {Counter} from "@/components/counter";
export default function CounterPage() {
    return (
        <div className="flex flex-col">
            <h1 className={title()}>Counter</h1>
            <Counter/>
        </div>
    );
}
