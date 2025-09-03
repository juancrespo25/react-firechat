import { useAuthAction } from "@/hooks/use-auth-action";
import { Button } from "./ui/button"
import { CardFooter } from "./ui/card"
import { toast } from "sonner";
import {Mail} from "lucide-react"
import { Link } from "react-router";

interface Props {
    type: "login" | "register"
    loading: boolean
}

const CardFooterAuth = (
    { type, loading }: Props
) => {

    const isLogin = type === "login";
    const { loginWithGoogle } = useAuthAction();

    const handleLoginWithGoogle = async () => {
        const result = await loginWithGoogle();
        if (result.success) {
            console.log("Logged in with Google successfully");
        }else{
            console.error("Error logging in with Google", result.error);
            toast.error(`Error: ${result.error?.message}`);
        }
    }
    return (
        <CardFooter className="flex flex-col items-center gap-4">
            <Button
                onClick={handleLoginWithGoogle}
                className="w-full"
                disabled={loading}
                variant={"outline"}
            >
                <Mail className="mr-2" />
                {isLogin ? "Login with Google" : "Register with Google"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? ": " Already have an account? "}
                <Link to={isLogin ? "/auth/register" : "/auth/login"}>
                    <Button
                        variant={"link"}
                        className="p-0 h-auto font-normal"
                    >
                        {isLogin ? "Register" : "Sign In"}
                    </Button>
                </Link>
            </p>
        </CardFooter>
    )
}
export default CardFooterAuth