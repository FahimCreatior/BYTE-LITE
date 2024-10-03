 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0k1UTN0RkRsd01DN1BkUG9QZCtFSk1tV1V5NHBmOE4xRlJpK3p6Tk9YND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXBxUnRKRDU4UjZLS21ocHJtY1orLzdGOXUxbG5wS2NuT0pQbWR5ZGV6MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RmJpVjlTZVlrWHM1UlNGMktOaWtVN0tUV1JrRC9EOStSVmpUeFQxQ0VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGQ0t4N1gzQ1NRVzcvTVZ2bnRWa016Vm9LTTdJSHZ0eW1EdDI3c2FLUFdRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1FUE1xV3FkWGorZWVHQ3E1Q2plWnFJbU03ZTRxa3ZuMkVjdjFvaDhoa2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVmWUJEa1l4TnkzazVJa3NTTU5tMDZmZS9od20vZDZiTVRDM01HSC92alE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU4vMkhtbENPYTY5UXBDNG9KSC9CakxhSkxCSEpNRVZIWFlsczEvVnAzRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDFBbm1ZRlowTEg1aWprdVZ2NE8yY29zaGc3eVQzYnBaOG5ZdFJvQi8zST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVQWVpJV3AzclBZYmlpb05pa1g3KzdGcnNYZzA0VlJLa3VBazZpM3pUb3BFeDhRR2ZWY2FteVBEc3E2N2FXNmlRL01RaFI0YmRaNWZoRGFTSFYwNUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgsImFkdlNlY3JldEtleSI6Ilg1ckNMci9rdDBxRGFmQU1vNk53dUtTU245RW9KTmkvcFAvcWtJdDEzVVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzk3NjMzNjI2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNDMDZDNUY1OEMzRUQ3Mzc1MkIzODc0NTQ0NUJCQzc4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjc5MzgxMDF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5NzYzMzYyNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwOEFBNUY2OTQzMEMzNDhDRkE1RkZGMDMyNzMyNUVDNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3OTM4MTA3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFdzFTdEdpcFRYT1hEbXM2dEVfNWZ3IiwicGhvbmVJZCI6ImNjMTRiNGE0LWJiYjEtNGNlYS05ZjdhLTUxNTc0MzgwMzE3MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkQ3RSZkVaOVF0NCszN1gwVjIremd5OUVBUVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM00zN3NLeitQd2dqMlg4UWk4NzB3UzE1dWl3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldLWDVGR0RDIiwibWUiOnsiaWQiOiIyNTQ3OTc2MzM2MjY6NjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRGVQQ01hc3RlciJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlNQcVpZR0VLUDgrTGNHR0J3Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSkJ4dWxmaGthK00zNTljMzhoUVBwWjBIbWR3YXdGMWpmKzh4TEd3bkVIYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibkZNMDliUWdjSU95Y0NWVXlheElsYVhjVnNYNEt1UFBDRFAvS3g5NkdQVjVBZkxFanBWNjRtU0N4UDExcUd6bXRqRU1DaWJsSTBkaVBqZXFBQUxOQWc9PSIsImRldmljZVNpZ25hdHVyZSI6IkhTMjFRY3BzS3piUWx1UmE1ckppN05WMDFiTDdwc1hWcWFFTDFuZkptMUhud1c3d0ZtZ3RCSkdUK09zeGYwTCs1VVQ3ZEdtVWZYTFZsbjBoVFM3aENnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk3NjMzNjI2OjYwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNRY2JwWDRaR3ZqTitmWE4vSVVENldkQjVuY0dzQmRZMy92TVN4c0p4QjMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc5MzgwOTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRTdXIn0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'off',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "FAHEEM",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254797633626",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
