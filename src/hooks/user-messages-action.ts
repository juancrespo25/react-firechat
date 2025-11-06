import type { LastMessage, Message } from "@/schemas/room.schema";
import { addDoc, collection,  doc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useMessagesActions = (roomId: string) => {

    const { data: user } = useUser();
    const db = useFirestore();
    const messagesRef = collection(db, "rooms", roomId, "message");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    const { data: message } = useFirestoreCollectionData(messagesQuery, {
        suspense: true,
        idField: "id"
    });

    const sendMessage = async (text: string) => {

        if (!user) throw new Error("useMessagesActions: 401");
        if (!text.trim()) throw new Error("useMessagesActions: 400");

        const timestamp = serverTimestamp();

        //create message

        const messageData: Omit<Message, "id"> = {
            senderId: user.uid,
            text,
            timestamp
        };

        //update last message in room
        const roomRef = doc(db, "rooms", roomId);
        const lastMessage: LastMessage = {
            senderId: user.uid,
            text,
            timestamp
        }

        await updateDoc(roomRef, {
            lastMessage
        });

        await Promise.all([
            addDoc(messagesRef, messageData),
            await updateDoc(roomRef, {
                lastMessage
            })
        ])
    }
    return { messages: message as Message[],
        sendMessage
    };
}

