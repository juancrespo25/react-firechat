import type { Task } from "@/schemas/schemas";
import { collection, where, query, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useTaksActions = () => {

    const { data: user } = useUser();
    const db = useFirestore();
    const tasksCollectionRef = collection(db, "tasks");

    const tasksQuery = query(
        tasksCollectionRef,
        where("userId", "==", user!.uid)
    );

    const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
        idField: "id",
        suspense: true
    })

    //Create
    const createTask = async (data: {
        title: string;
        descripcion?: string;
    }) => {
        const newTask = {
            ...data,
            completed: false,
            userId: user!.uid,
        }

        return await addDoc(tasksCollectionRef, newTask);
    }

    //Delete

    const deleteTask = async (taskId: string) => {
        const taskDoc = doc(db, "tasks", taskId);
        await deleteDoc(taskDoc);
    }

    //Update
    const toggleTaskCompletion = async (taskId: string) => {

        const task = tasks.find((task) => task.id === taskId);

        if (!task) throw new Error("Task not found");

        const taskDoc = doc(db, "tasks", taskId);

        return await updateDoc(taskDoc, {
            completed: !task?.completed
        })

    }

    return {
        tasks: tasks as Task[],
        isLoading: status === "loading",
        createTask,
        deleteTask,
        toggleTaskCompletion
    }

}