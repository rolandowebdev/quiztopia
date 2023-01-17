import { FormContainer } from '../../layouts';
import { Input, Button, FormFooter } from '../../components';

const SignUp = () => (
  <FormContainer>
    <form className="flex flex-col w-full gap-4">
      <Input id="email" label="email" type="email" placeholder="Type your email here..." />
      <Input id="password" label="password" type="password" />
      <Input id="confirmPassword" label="confirm password" type="password" />
      <Button type="submit">sign up</Button>
    </form>
    <FormFooter text="Already have an account?" type="sign in" />
  </FormContainer>
);

export default SignUp;
