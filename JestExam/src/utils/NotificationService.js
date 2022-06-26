import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
    }
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("This is the old token.", fcmToken);

    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("This the new generate token.", fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        } catch (error) {
            console.log(error, 'FcmToken Error Message')
        }

    }
}

export const notificationListner = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:', remoteMessage.notification,
        );
        //navigation.navigate(remoteMessage.data.type);
    });

    messaging().onMessage(async remoteMessage => {
        console.log('Monojit Foreground message: ', remoteMessage.notification);
    })

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:',  remoteMessage.notification,
                );

            }
        });
}

