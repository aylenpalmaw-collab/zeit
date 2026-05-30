import admin from 'firebase-admin'
import fetch from 'node-fetch'
import { analyzeOpportunity } from '../src/utils/opportunityEngine.js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY

/*
=====================================
FIREBASE INIT
=====================================
*/

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

/*
=====================================
SUPABASE
=====================================
*/


/*
=====================================
FETCH DOLLAR
=====================================
*/

async function fetchDollar() {
  const res = await fetch(
    'https://dolarapi.com/v1/dolares/oficial'
  )
  return await res.json()
}

/*
=====================================
SEND PUSH
=====================================
*/

async function sendPush({ token, title, message }) {
  await admin.messaging().send({
    token,
    notification: {
      title,
      body: message
    }
  })
}

/*
=====================================
MAIN
=====================================
*/

async function run() {
  try {
    const data = await fetchDollar()
    const currentPrice = data.venta

    const resHistory = await fetch(
  `${SUPABASE_URL}/rest/v1/history?select=*`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  }
)

const historyData = await resHistory.json()

const history = historyData.map((h) => ({
  value: h.price
}))

    const opportunity = analyzeOpportunity({
      currentPrice,
      history
    })

    if (!opportunity) {
      console.log('Sin señales')
      return
    }

    const resTokens = await fetch(
  `${SUPABASE_URL}/rest/v1/fcm_tokens?select=token`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  }
)

const tokens = await resTokens.json()

    for (const t of tokens) {
      await sendPush({
        token: t.token,
        title: opportunity.title,
        message: opportunity.message
      })
    }

    console.log('Notificación enviada:', opportunity.type)
  } catch (err) {
    console.error(err)
  }
}

run()