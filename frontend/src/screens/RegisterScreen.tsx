import styles from "../styles/RegisterScreen.style";
import { SafeAreaView, TextInput, Text, View, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import React, {useState} from "react";


const RegisterScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.topHalf}>
                <Image source={require('../../assets/logo/logo.png')}/>
                <Text style={styles.registerHeaderText}>Register</Text>
                <View style={styles.nameContainer}>
                    <TextInput 
                    style={styles.nameTextBox}
                    onChangeText={setFirstName} 
                    value={firstName}
                    placeholder="First Name"
                    />
                    <TextInput 
                    style={styles.nameTextBox}
                    onChangeText={setLastName} 
                    value={lastName}
                    placeholder="Last Name"
                    />
                </View>
                <TextInput 
                style = {styles.emailAndPasswordTextBox} 
                onChangeText={setEmail} 
                value={email}
                placeholder="Email"
                />
                <TextInput 
                secureTextEntry={true}
                style = {styles.emailAndPasswordTextBox} 
                onChangeText={setPassword} 
                value={password}
                placeholder="Password"
                />
                <TextInput 
                secureTextEntry={true}
                style = {styles.emailAndPasswordTextBox} 
                onChangeText={setRepassword} 
                value={repassword}
                placeholder="Re-enter Password"
                />
                <TouchableOpacity onPress={() => console.log('register button pressed')}>
                    <View style={styles.registerButtonContainer}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.bottomHalf}>
                <Text style={styles.registerWithText}>Register with</Text>
                <View style={styles.registerWithAppsContainer}>
                    <TouchableOpacity onPress={() => console.log('apple button pressed')}>
                        <Image 
                        source={require('../../assets/apple-login/apple-login.png')}
                        style={styles.brandImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('google button pressed')}>
                        <Image 
                        source={require('../../assets/google-login/google-login.png')}
                        style={styles.brandImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('facebook button pressed')}>
                        <Image 
                        source={require('../../assets/facebook-login/facebook-login.png')}
                        style={styles.brandImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;