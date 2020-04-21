import React,{useState} from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../stores/actions';
import { Layout, Text, Button, Icon, Input} from '@ui-kitten/components';
import Loading from '../components/Loading'

const EmailIcon = (props) => (
<Icon {...props} name='email-outline'/>
);

export default function Login(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const isLoading = useSelector((state) => state.user.isLoading);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    function loginForm() {
        let data = {
            email, password
        }
        console.log(data,'--=-=-=');
        dispatch(allActions.POST_LOGIN(data))
        setEmail('')
        setPassword('')
    }

    function goRegisterScreen() {
        props.navigation.navigate('Register');
    }

    if(isLoading) {
        return (
            <Loading />
        )
    }


    return (
        <Layout style={styles.container}>
            <Layout style={styles.layoutPage}>
                <View style={styles.top}>
                    <Text category='h3' style={styles.text} >
                        Welcome Back To
                    </Text>
                    <Text category='h3' style={styles.text} >
                        MoodEat
                    </Text>
                    <View style={styles.inputLayout}>
                        <Input
                            style={styles.inputForm}
                            value={email}
                            // label='Email'
                            status='basic'
                            placeholder='Email'
                            accessoryLeft={EmailIcon}
                            onChangeText={email => setEmail(email)}
                        />
                        <Input
                            style={styles.inputForm}
                            value={password}
                            // label='Password'
                            status = 'basic'
                            placeholder='Password'
                            accessoryLeft={renderIcon}
                            secureTextEntry={secureTextEntry}
                            onChangeText={password => setPassword(password)}
                        />
                    </View>
                </View>
                <View style={styles.center}>
                    <Button title="Sign in" style={styles.buttonLog} status = 'primary' onPress={() => loginForm()} >Login</Button>
                </View>
                <View style={styles.bottom}>
                    <Button style={styles.buttonReg} onPress={goRegisterScreen}>
                        <Text style={styles.text}>Don't You have an account? Register Here!</Text>
                    </Button>
                </View>
            </Layout>
        </Layout>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0c869',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 100
        
    },
    layoutPage:{
        flex: 1,
        backgroundColor: 'transparent',
        width: '95%',
        alignItems: 'flex-end'
    },
    top: {
        flex: 2,
        textDecorationColor: '#000',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        borderBottomRightRadius: 15
    },
    center: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        paddingTop: 0,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50
    },
    bottom: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopRightRadius: 15
    },
    inputLayout: {
        width: '70%',
        marginTop: 20,
        marginBottom: 20
    },
    inputForm:{
        borderRadius: 10,
        borderRadius: 10,
    },
    buttonLog: {
        height: 50,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: '90%'
    },
    buttonReg: {
        height: 50,
        marginTop: 20,
        paddingTop: 0,
        paddingLeft: 50,
        borderTopRightRadius: 10,
        width: '80%',
        borderColor: '#fff',
        backgroundColor: '#fff',
        textDecorationColor: '#000'
    },
    text: {
        color: '#000'
    }
});