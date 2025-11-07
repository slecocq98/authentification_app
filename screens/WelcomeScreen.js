import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  useEffect(() => {
    axios.get('https://expense-tracker-492b1-default-rtdb.europe-west1.firebasedatabase.app/expenses/message.json?auth=' + token, {
    })
      .then(response => {
        setFetchedMessage(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
