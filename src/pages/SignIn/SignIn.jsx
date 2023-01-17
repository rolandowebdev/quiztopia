import { FormContainer } from '../../layouts';
import { Input, Button, FormFooter } from '../../components';

const SignIn = () => (
  <FormContainer>
    <form className="flex flex-col w-full gap-4">
      <Input id="email" label="email" type="email" placeholder="Type your email here..." />
      <Input id="password" label="password" type="password" forgotPassword />
      <Button type="submit">sign in</Button>
    </form>
    <FormFooter text="Don't have an account?" type="sign up" />
  </FormContainer>
);

export default SignIn;
