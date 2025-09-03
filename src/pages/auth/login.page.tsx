import { Button } from "@/components/ui/button";
import { useAuthAction } from "../../hooks/use-auth-action";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { toast } from "sonner";

const LoginPage = () => {

  const { loginWithGoogle } = useAuthAction();

  const handleLoginWithGoogle = async () => {
    
    const result = await loginWithGoogle();

    if (result.success) {
      console.log("Login successfully");
    } else {
      console.error("Error during login:", result.error);
      toast.error(`Login Failed`);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account using Email and Password or with Google
        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLoginWithGoogle}
          className="w-full"
        >Login with Google</Button>
      </CardFooter>
    </Card>
  )
}
export default LoginPage