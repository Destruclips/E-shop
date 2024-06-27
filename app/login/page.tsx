import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../Components/Container"
import FormWrap from "../Components/FormWrap"
import LoginForm from "./LoginForm"

const Login = async () => {

  const currentUser = await getCurrentUser()
  return (
    <Container>
        <FormWrap>
            <LoginForm currentUser={currentUser}/>
        </FormWrap>
    </Container>
  )
}

export default Login