export async function sendTelegramMessage({ botToken, chatId, message }: any) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    if (response.ok) {
      console.log("Message sent successfully to Telegram channel");
      return true;
    } else {
      throw new Error("Failed to send message to Telegram channel");
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
