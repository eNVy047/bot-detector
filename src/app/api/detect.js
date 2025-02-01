"use client";

import detectWhatsAppBot from './whatsapp';
import detectTelegramBot from './telegram';
import detectFacebookBot from './facebook';
import detectInstagramBot from './instagram'; // Assuming you want to include instagram as well

export default async function handler(req, res) {
  const whatsappDetection = await detectWhatsAppBot(req);
  const telegramDetection = await detectTelegramBot(req);
  const facebookDetection = await detectFacebookBot(req);
  const instagramDetection = await detectInstagramBot(req);

  res.status(200).json({
    message: 'Bot detection API endpoint',
    whatsapp: whatsappDetection,
    telegram: telegramDetection,
    facebook: facebookDetection,
    instagram: instagramDetection,
  });
}
