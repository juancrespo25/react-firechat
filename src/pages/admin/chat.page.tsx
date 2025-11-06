import FormMessageChat from "@/components/chat/form-message-chat";
import ListRoomChat from "@/components/chat/list-room-chat"
import MessagesTask from "@/components/chat/messages-task"
import { Suspense, useState } from "react"

const ChatPage = () => {

  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  }

  return <div className="grid md: grid-cols-2">
    <section>
      {/*Mostrar las rooms*/}
      <Suspense fallback={<div>Cargando salas de chat...</div>}>
        <ListRoomChat handleClickRoomId={handleClickRoomId} />
      </Suspense>
    </section>
    <section>
      {/*Mostrar los mensajes*/}
      {roomId ? (
        <Suspense fallback={<div>Cargando mensajes...</div>}>
          <FormMessageChat roomId={roomId} />
          <MessagesTask roomId={roomId} />
        </Suspense>
      ) : (
        <div>Selecciona una sala de chat</div>
      )
      }
    </section>
  </div>
}
export default ChatPage