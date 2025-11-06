import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useMessagesActions } from "@/hooks/user-messages-action"
import { toast } from "sonner"
import { useTransition } from "react"

interface Props {
  roomId: string
}
const FormMessageChat = ({ roomId }: Props) => {

  const [isLoading, startTransition] = useTransition();

  const { sendMessage } = useMessagesActions(roomId)

  const form = useForm<MessageZodSchemaType>({
    resolver: zodResolver(messageZodSchema),
    defaultValues: {
      text: ""
    }
  })

  async function onSubmit(values: MessageZodSchemaType) {
    startTransition(async () => {
      try {
        await sendMessage(values.text);
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Error sending message");
      }
    })
  }

  return <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input
                placeholder="shadcn"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "enviando mensaje" : "enviar"}
      </Button>
    </form>
  </Form>
}
export default FormMessageChat