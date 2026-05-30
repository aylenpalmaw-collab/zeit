import { getMessaging, getToken } from 'firebase/messaging'
import app from '../lib/firebase'

const messaging = getMessaging(app)

export async function getNotificationToken() {

  try {

    const token = await getToken(
      messaging,
      {
        vapidKey:
          import.meta.env
            .VITE_FIREBASE_VAPID_KEY
      }
    )

    console.log(
      'FCM TOKEN:',
      token
    )

    return token

  } catch (error) {

    console.error(error)

    return null
  }
}