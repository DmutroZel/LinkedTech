const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const tg = require('node-telegram-bot-api');
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const TOKEN = '7885099216:AAFNDNF25aQo17a7HfMEtAHYDCTnehgWFpE';
const CHAT_ID = '5272650919';

const bot = new tg(TOKEN, { polling: true });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/order', (req, res) => {
    const { data, username, phone } = req.body;

    if (!data || !username || !phone) {
        return res.status(400).json({ error: 'Некоректні дані замовлення' });
    }

    let msg = `📦 *Нове замовлення!*\n👤 *Клієнт:* ${username}\n📞 *Телефон:* ${phone}\n🛍 *Товари:*\n`;
    data.forEach(item => {
        msg += `🔹 ${item.name} - *${item.price}$*\n`;
    });

    bot.sendMessage(CHAT_ID, msg, { parse_mode: 'Markdown' })
        .then(() => res.send('ok'))
        .catch(err => {
            console.error("Помилка надсилання повідомлення:", err);
            res.status(500).json({ error: 'Не вдалося відправити повідомлення' });
        });
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
