import type { UserFireStore } from "@/schemas/user.schema";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export const useFriendInfo = (friendUId: string) => {

    const db = useFirestore();
    const friendRef = doc(db, "users", friendUId);

    const {data: friend} = useFirestoreDocData(friendRef, {
        suspense: true
    });

    return {
        friend: friend as UserFireStore
    };
}