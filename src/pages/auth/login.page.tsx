
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import CardFooterAuth from "@/components/card-footer-auth";
import { useAuthAction } from "@/hooks/use-auth-action";


const LoginPage = () => {

  const { loading } = useAuthAction();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account using Email and Password or with Google
        </CardDescription>
      </CardHeader>
      <CardContent>
        ...
      </CardContent>
      <CardFooterAuth
        type="login"
        loading={loading}
      />

    </Card>
  )
}
export default LoginPage