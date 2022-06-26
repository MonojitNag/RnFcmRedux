import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput,
     TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();



    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        console.log('call useEffcet Login');
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
    
  
    const onClickListner = () => {
        //Check for the Email TextInput
        if (!email.trim()) {
            alert('Please Enter Email');
            return;
        } else if (!password.trim()) {
            alert('Please Enter Password');
            return;
        } else {

            console.log(email, password, user);
            setLoading(true);

            auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    //once we are logged in , we move to the home screen
                    setLoading(false);
                    navigation.replace('DashBoard')
                })
                .catch(err => {
                    //if failure, stop the spinner and show the error message
                    // this.setState({ loading: false, message: err.message });
                    console.log('Monojit--->', err.message);
                    setLoading(false);
                    alert(err.message);
                });

            //Login Method
            /*auth()
                .createUserWithEmailAndPassword('monojit.aot@gmail.com', '123456!')
                .then(() => {
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });*/

        }

    }
    if (user) {
        navigation.replace('DashBoard');
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                hidden={false}
            />

            <Image 
                style={styles.logoImgStyle}
                source={require('../assets/images/laptop_logo.jpeg')}
            />

            <TextInput
                style={styles.testInputStyle}
                placeholder='Please Enter Email'
                placeholderTextColor='black'
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                style={styles.testInputStyle}
                placeholder='Please Enter Password'
                placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
            />
            {
                loading ? <ActivityIndicator size="large" style={{ marginTop: 10 }} /> : null
            }

            <TouchableOpacity
                onPress={onClickListner}
                style={styles.touchableStyle}
            >
                <Text style={styles.textBtnStyle}>LOGIN</Text>
            </TouchableOpacity>

        </View>
    );


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImgStyle:{
        width:90,
        height:90,
        marginBottom:20
    },
    testInputStyle: {
        width: '80%',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 7,
        padding: 6,
        marginTop: 15
    },
    touchableStyle: {
        marginTop: 25,
        backgroundColor: '#5609ba',
        width: '80%',
        borderRadius: 5,
    },
    textBtnStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 7
    }
})
export default Login;