import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, auth, database, storage } from '../../config/config.js'
import PhotoList from '../components/photoList.js';
import UserAuth from '../components/auth.js';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        }
    }

    fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            that.setState({
                username: data.username,
                name: data.name,
                avatar: data.avatar,
                loggedin: true,
                userId: userId
            });
        });
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user) {
            if(user) {
                //logged in
                that.fetchUserInfo(user.uid);
            } else {
                //notlogged in
                that.setState({
                    loggedin: false
                });
            }
        });
    }

    logoutUser = () => {
        f.auth().signOut();
        alert('Logged out');

    }

    render() {
        return(
            <View style={{flex: 1}}>
                { this.state.loggedin == true ? (
                    <View style={{flex: 1}}>
                        <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey',borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>Profile</Text>
                        </View>
                        <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
                            <Image source={{uri: this.state.avatar}} style={{marginLeft: 10, width: 100, height: 100, borderRadius:50}} />
                            <View style={{marginRight:10}}>
                                <Text>{this.state.name}</Text>
                                <Text>{this.state.username}</Text>
                            </View>
                        </View>
                        <View style={{paddingBottom: 20, borderBottomWidth: 1,justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Upload')}
                                style={{width:'40%', backgroundColor: 'grey', marginTop:10, marginHorizontal: 40, paddingVertical:15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                                <Text style={{textAlign: 'center', color: 'white'}}>Upload New</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => this.logoutUser()}
                                style={{width:'40%', marginTop:10, marginHorizontal: 40, paddingVertical:15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                                <Text style={{textAlign: 'center', color: 'grey'}}>Logout</Text>
                            </TouchableOpacity>
                        </View> 

                        <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation}></PhotoList>

                    </View>  
                ) : (
                    <UserAuth message={'Please login to view your profile'}/>
                )}
            </View>
        )
    }
}

export default Profile;