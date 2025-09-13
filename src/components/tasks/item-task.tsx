import { useTaksActions } from "@/hooks/use-task.actions"
import type { Task } from "@/schemas/schemas"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Props {
    task: Task
}
const ItemTask = ({ task }: Props) => {

    const { deleteTask, toggleTaskCompletion } = useTaksActions()
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            try {
                await deleteTask(task.id)
                toast.success("Task deleted successfully")
            } catch (error) {
                console.log(error);
                toast.error("Failed to delete task")
            }
        })
    }

    const handleToggleCompletion = async () => {
        startTransition(async () => {
            try {
                await toggleTaskCompletion(task.id)
                toast.success("Task updated successfully")
            } catch (error) {
                console.log(error);
                toast.error("Failed to update task")
            }
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle
                    className={
                        cn(
                            "text-lg font-semibold",
                            task.completed ? "line-through text-gray-500" : ""
                        )
                    }
                >
                    {task.title}
                </CardTitle>
                <CardAction className="space-x-2">
                    <Button
                        variant={"outline"}
                        onClick={handleToggleCompletion}
                        disabled={isPending}
                    >
                        Update
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        Delete
                    </Button>
                </CardAction>
                {
                    task.descripcion && (
                        <CardContent>
                            {task.descripcion}
                        </CardContent>
                    )
                }
            </CardHeader>
        </Card>
    )
}
export default ItemTask