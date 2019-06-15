import React from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { f, auth, database, storage } from '../../config/config.js'

class UserAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authStep: 0,
            email: '',
            password: '',
            name: '',
            username: '',
            moveScreen: false
        }
    }

    login = async() => {
        
        var email = this.state.email;
        var password = this.state.password;

        if(email != '' && password != '') {
            try {
                let user = await auth.signInWithEmailAndPassword(email, password); //'testuser@gmail.com', 'fakepass'
            } catch(error) {
                console.log(error);
                alert(error);
            }
        } else {
            alert('Email or password is empty!');
        }
    }

    createUserObj = (userObj, email, username, name) => {
        console.log(userObj, email, username, name,  userObj.uid);
        var user = {
            name: name,
            username: username,
            avatar: 'http://www.gravatar.com/avatar',
            email: email
        };

        database.ref('users').child(userObj.uid).set(user);  
    }

    signup = async() => {
        
        var email = this.state.email;
        var password = this.state.password;
        var username  = this.state.username;
        var name  = this.state.name;

        if(email != '' && password != '') {
            try {
                let user = await auth.createUserWithEmailAndPassword(email,password)
                .then((userObj) => this.createUserObj(userObj.user, email, username, name))
                .catch((error) => alert(error));
            } catch(error) {
                console.log(error);
                alert(error);
            }
        } else {
            alert('Email or password is empty!');
        }

    }
    
    componentDidMount = () => {
        if(this.props.moveScreen == true) {
            this.setState({moveScreen: true});
        }
    }
    
    showLogin = () => {
        if(this.state.moveScreen == true) {
            this.props.navigation.navigate('Upload');
            return false;
        }
        this.setState({authStep: 1})
    }
    
    showSignup = () => {
        if(this.state.moveScreen == true) {
            this.props.navigation.navigate('Upload');
            return false;
        }
        this.setState({authStep: 2})
    }

    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text>You are not logged in</Text>
                <Text>{this.props.message}</Text>
                {this.state.authStep == 0 ? (
                    <View style={{marginVertical: 20, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.showLogin()}>
                            <Text style={{fontWeight:'bold'}}>Login</Text>
                        </TouchableOpacity>
                        <Text style={{marginHorizontal:10}}>or</Text>
                        <TouchableOpacity onPress={() => this.showSignup()}>
                            <Text style={{fontWeight:'bold'}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{marginVertical:20}}>
                        {this.state.authStep == 1 ? (
                            <View>
                                <Text style={{fontWeight: 'bold', marginBottom:20}}>Login</Text>
                                <Text>Email adress:</Text>
                                <TextInput 
                                    editable = {true}
                                    keyboardType={'email-address'}
                                    placeholder={'Enter your email adress'}
                                    onChangeText={(text) => this.setState({email: text})}
                                    value={this.state.email}
                                    style={{width:250, marginVertical: 10, padding: 5, borderColor:'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <Text>Password:</Text>
                                <TextInput 
                                    editable = {true}
                                    secureTextEntry={true}
                                    placeholder={'Enter your password'}
                                    onChangeText={(text) => this.setState({password: text})}
                                    value={this.state.password}
                                    style={{width:250, marginVertical: 10, padding: 5, borderColor:'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <TouchableOpacity 
                                    onPress={() => this.login()}
                                    style={{backgroundColor:'green', paddingVertical:10, paddingHorizontal:20, borderRadius:5}}>
                                    <Text style={{color: 'white'}}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => this.setState({authStep: 0})}
                                    style={{borderColor:'black', borderWidth:1, marginVertical:10, paddingVertical:10, paddingHorizontal:20, borderRadius:5}}>
                                    <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Text style={{fontWeight: 'bold', marginBottom:20}}>Sign up</Text>
                                <Text>Email adress:</Text>
                                <TextInput 
                                    editable = {true}
                                    keyboardType={'email-address'}
                                    placeholder={'Enter your email adress'}
                                    onChangeText={(text) => this.setState({email: text})}
                                    value={this.state.email}
                                    style={{width:250, marginVertical: 10, padding: 5, borderColor:'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <Text>Password:</Text>
                                <TextInput 
                                    editable = {true}
                                    secureTextEntry={true}
                                    placeholder={'Enter your password'}
                                    onChangeText={(text) => this.setState({password: text})}
                                    value={this.state.password}
                                    style={{width:250, marginVertical: 10, padding: 5, borderColor:'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <Text>Name:</Text>
                                <TextInput 
                                    editable = {true}
                                    placeholder={'Enter your name'}
                                    onChangeText={(text) => this.setState({name: text})}
                                    value={this.state.name}
                                    style={{width:250, marginVertical: 10, padding: 5, borderColor:'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <Text>Username:</Text>
                                <TextInput 
                                    editable = {true}
                                    placeholder={'Enter your username'}
                                    onChangeText={(text) => this.setState({username: text})}
                                    value={this.state.username}
                                    style={{width:250, marginVertical: 10, padding: 5, borderColor:'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <TouchableOpacity 
                                    onPress={() => this.signup()}
                                    style={{backgroundColor:'blue', paddingVertical:10, paddingHorizontal:20, borderRadius:5}}>
                                    <Text style={{color: 'white'}}>Sign up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => this.setState({authStep: 0})}
                                    style={{borderColor:'black', borderWidth:1, marginVertical:10, paddingVertical:10, paddingHorizontal:20, borderRadius:5}}>
                                    <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            </View>
        )
    }
}

export default UserAuth;