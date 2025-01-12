
//CÓDIGO MODIFICADO POR DV.YER🇦🇱 NO SEAS CABRO NO QUITES LOS DERECHOS ↩️
//Código de Bot (SonGoku) 

import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `⌛Por favor, envia un link de Youtube para descargar su audio.`, m);

    let maxRetries = 4; 
    let attempt = 0;
    let success = false;

    await conn.reply(m.chat, `《⏳》Descargando su audio. Si ocurre un error, se intentará hasta ${maxRetries} veces. Por favor, espera...`, m);

    while (attempt < maxRetries && !success) {
        try {
            let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`);
            let json = await api.json();
            let title = json.result.metadata.title;
            let dl_url = json.result.download.url;

            await conn.sendMessage(m.chat, { 
                audio: { url: dl_url }, 
                fileName: `${title}.mp3`, 
                mimetype: 'audio/mp4' 
            }, { quoted: m });

            await conn.reply(m.chat, `《✅》Su audio fue enviado con éxito. ¡Disfrútalo!`, m);
            success = true; 

        } catch (error) {
            console.error(error);
            attempt++;
        }
    }

    if (!success) {
        await conn.reply(m.chat, `《❌》Ocurrió un error al intentar descargar el audio después de ${maxRetries} intentos. Por favor, verifica el enlace e inténtalo nuevamente.`, m);
    }
};

HS.command = ['ytmp3'];

export default HS;