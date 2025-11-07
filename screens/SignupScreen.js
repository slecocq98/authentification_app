import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authContext.authenticate(token);
      setIsAuthenticating(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Creating user failed', 'Please check your credentials and try again.');
      setIsAuthenticating(false);
    } r

  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
