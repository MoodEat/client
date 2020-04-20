import React,{useState} from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../stores/actions';
import { Layout, Text, Button,  } from '@ui-kitten/components';
import { Icon, Input } from '@ui-kitten/components';

const EmailIcon = (props) => (
<Icon {...props} name='email-outline'/>
);

export default function Login() {
    const dispatch = useDispatch()
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

    function loginForm() {
        let data = {
            email, password
        }
        console.log(data,'--=-=-=');
        dispatch(allActions.POST_LOGIN(data))
        setEmail('')
        setPassword('')
    }


    return (
        <Layout style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assets/home.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={styles.bottom}>
                <View style={styles.inputForm}>
                    <Input
                        value={email}
                        label='Email'
                        status='warning'
                        placeholder='Place your Text'
                        accessoryRight={EmailIcon}
                        onChangeText={email => setEmail(email)}
                    />
                    <Input
                        value={password}
                        label='Password'
                        status = 'warning'
                        placeholder='Place your Text'
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={password => setPassword(password)}
                    />
                    <Button title="Sign in" onPress={() => loginForm()} >Login</Button>
                </View>
            </View>
        </Layout>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        
    },
    top: {
        flex: 4,
        width: '100%'
    },
    bottom: {
        flex: 2,
        backgroundColor: '#f0c869',
        textDecorationColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopRightRadius: 70,
        borderTopLeftRadius: 70
    },
    inputForm: {
        width: '70%'
    },
    button: {
        margin: 2,
        borderRadius: 100,
        height: 100,
        width: 80
    }
});