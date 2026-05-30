export async function requestNotificationPermission() {

  if (!("Notification" in window)) {

    console.log("Este navegador no soporta notificaciones")

    return false
  }

  const permission =
    await Notification.requestPermission()

  return permission === "granted"
}