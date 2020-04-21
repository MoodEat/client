import React,{useState} from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../stores/actions';
import { Layout, Text, Button, Icon, Input} from '@ui-kitten/components';

const EmailIcon = (props) => (
<Icon {...props} name='email-outline'/>
);

const UserIcon = (props) => (
<Icon {...props} name='person-outline'/>
);

export default function Register(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    function registerForm() {
        let data = {
            name,email, password
        }
        console.log(data,'--=-=-=');
        dispatch(allActions.POST_REGISTER(data))
        setName('')
        setEmail('')
        setPassword('')
    }

    function goLoginScreen() {
        props.navigation.navigate('Login');
    }


    return (
        <Layout style={styles.container}>
            <Layout style={styles.layoutPage}>
                <View style={styles.top}>
                    <Text category='h3' style={styles.text} >
                        Welcome to MoodEat.
                    </Text>
                    <View style={styles.inputLayout}>
                        <Input
                            style={styles.inputForm}
                            value={name}
                            // label='Email'
                            status='basic'
                            placeholder='Name'
                            accessoryLeft={UserIcon}
                            onChangeText={name => setName(name)}
                        />
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
                    <Button title="Sign in" style={styles.buttonReg} status = 'primary' onPress={() => registerForm()} >
                        <Text style={styles.text}>Register</Text>
                        </Button>
                </View>
                <View style={styles.bottom}>
                    <Button style={styles.buttonLog} onPress={goLoginScreen}>
                        <Text style={styles.text}>Do You have an account?</Text>
                        <Text style={styles.text}>Login Here</Text>
                    </Button>
                </View>
            </Layout>
        </Layout>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        textDecorationColor: '#f0c869',
        backgroundColor: '#f0c869',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        borderBottomRightRadius: 15
    },
    center: {
        width: '100%',
        backgroundColor: '#f0c869',
        alignItems: 'flex-end',
        paddingTop: 0,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50
    },
    bottom: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#f0c869',
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
    buttonReg: {
        height: 50,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#fff',
        width: '90%'
    },
    buttonLog: {
        height: 50,
        paddingTop: 0,
        paddingLeft: 50,
        borderTopRightRadius: 10,
        marginTop: 20,
        width: '70%',
        borderColor: '#f0c869',
        backgroundColor: '#f0c869',
        textDecorationColor: '#000'
    },
    text: {
        color: '#000'
    }
});