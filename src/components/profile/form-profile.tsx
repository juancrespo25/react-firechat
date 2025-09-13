import { useProfileActions } from "@/hooks/use-profile-actions"
import { profileZodSchema, type ProfileZodSchemaType } from "@/lib/zod.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import type { User } from "firebase/auth"
import { toast } from "sonner"

interface Props {
  user: User
}

const FormProfile = ({ user }: Props) => {

  const { loading, updateUserProfile } = useProfileActions();

  const form = useForm<ProfileZodSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || ""
    }
  });


  async function onSubmit(values: ProfileZodSchemaType) {
    const result = await updateUserProfile(values);

    if (result.success) {
      return toast.success("Profile updated successfully")
    }
    toast.error("Error updating profile")
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="displayName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              User Name
            </FormLabel>
            <FormControl>
              <input
                placeholder="User Name"
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="photoURL"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Photo URL
            </FormLabel>
            <FormControl>
              <input
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  </Form>
}
export default FormProfile


