import CardFooterAuth from "@/components/card-footer-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthAction } from "@/hooks/use-auth-action";

const RegisterPage = () => {

  const { loading } = useAuthAction();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register to your account using Email and Password or with Google
        </CardDescription>
      </CardHeader>
      <CardContent>
        ...
      </CardContent>
      <CardFooterAuth
        type="register"
        loading={loading}
      />

    </Card>
  )
}
export default RegisterPage