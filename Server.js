const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config();

const app = express();
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// /start कमांड
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `नमस्ते ${msg.from.first_name}! UPSC बॉट में स्वागत है।\n\nकृपया कमांड चुनें:\n/quiz - क्विज शुरू करें\n/pyq - पिछले वर्ष के प्रश्न\n/book - किताबें खोजें`);
});

// क्विज कमांड
bot.onText(/\/quiz/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '📝 क्विज शुरू हो रही है...\n\nप्रश्न: भारत का संविधान कब लागू हुआ?\n\nविकल्प:\nA. 1947\nB. 1950\nC. 1952\nD. 1949');
});

// PYQ कमांड
bot.onText(/\/pyq (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const topic = match[1];
  bot.sendMessage(chatId, `🔍 "${topic}" पर पिछले वर्ष के प्रश्न:\n\n1. संविधान सभा की पहली बैठक कब हुई? (UPSC 2020)\n2. मौलिक अधिकार कौन-से हैं? (UPSC 2019)`);
});

// बुक कमांड
bot.onText(/\/book (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const bookName = match[1];
  bot.sendMessage(chatId, `📖 ${bookName} के बारे में जानकारी:\n\nअध्याय 1: परिचय\nअध्याय 2: मुख्य अवधारणाएँ\n[पूरी किताब डाउनलोड करें]`);
});

// सर्वर स्टार्ट करें
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
