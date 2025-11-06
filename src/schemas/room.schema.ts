import type { FieldValue, Timestamp } from "firebase/firestore";

export interface Room {
    id: string;
    participantes: string[];
    createdAt: Timestamp | FieldValue;
    lastMessages: LastMessage | null;
}

export interface LastMessage {
    text: string;
    senderId: string;
    timestamp: Timestamp | FieldValue;
}

export interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: Timestamp | FieldValue;
}