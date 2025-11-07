import type { Room } from "@/schemas/room.schema"
import { useUser } from "reactfire"
import FriendEmail from "./friend-email";
import { Button } from "../ui/button";
import { Suspense } from "react";

interface Props {
  room: Room,
  handleClickRoomId: (id: string) => void
}
const RoomChat = ({ room, handleClickRoomId }: Props) => {

  const { data: user } = useUser();
  const friendUID = room.participantes.find((id) => id !== user?.uid) || "";

  return <Button onClick={() => handleClickRoomId(room.id)}>
    <Suspense fallback="Cargando Mensaje ...">
      <FriendEmail friendUID={friendUID} />
    </Suspense>
  </Button>
}
export default RoomChat