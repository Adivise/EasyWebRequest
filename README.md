<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=EasyWebRequest&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> </a> 
</p>

<p align="center"> 
  <a href="https://discord.gg/SNG3dh3MbR" target="_blank"> <img src="https://discordapp.com/api/guilds/903043706410643496/widget.png?style=banner2"/> </a> 
</p>

<p align="center"> 
  <a href="https://ko-fi.com/nanotect" target="_blank"> <img src="https://ko-fi.com/img/githubbutton_sm.svg"/> </a> 
</p>

# 🛑 Please carefully read all requirement information and don't rush

## 📑 Feature
- [x] Twitch Auth Login/Logout
- [x] Send Beatmap Link (Currently Support osu!standard)
- [x] Mods Selector Dropdown Menu
- [x] Show History Request Lists
- [x] Easy to use

<details><summary>📎 Requirements [CLICK ME]</summary>
<p>

## 📎 Requirements

- Node.js+ **[Click Here](https://nodejs.org/en/download/)**
- MongoDB Community **[Click Here](https://www.mongodb.com/try/download/community)**
- osu!Api **[Click Here](https://osu.ppy.sh/home/account/edit)**
- Twitch OAuth **[Click Here](https://dev.twitch.tv/console/apps)**

</p>
</details>

## 📚 Installation for FontEnd

```
git clone https://github.com/Adivise/EasyWebRequest
cd EasyWebRequest/FontEnd
npm install
npm run build
```

## 📚 Installation for BackEnd

```
git clone https://github.com/Adivise/EasyWebRequest
cd EasyWebRequest/BackEnd
npm install
```

<details><summary>📄 Configuration [CLICK ME]</summary>
<p>

## 📄 Configuration for FontEnd

Goto `src/config.js.example` Copy or Rename `config.js.example` to `config.js` and fill out the values:

```js
module.exports = {
    REACT_APP_API_URL: 'http://localhost:3001', // port need same as in BackEnd/.env API PORT
}
```
After installation for `FontEnd` all you can use `npm run start` to start.

## 📄 Configuration for BackEnd

Goto `.env.example` Copy or Rename `.env.example` to `.env` and fill out the values:

```env
DATABASE=mongodb://127.0.0.1:27017/osu # MongoDB connection URL
REDIRECT_URL=http://localhost:3000 # redirect uri for twitch auth
PORT=3001 # API PORT

TWITCH_CLIENT=REPLACE_HERE # get from https://dev.twitch.tv/console/apps
TWITCH_SECRET=REPLACE_HERE # get from https://dev.twitch.tv/console/apps

OSU_OPPONENT=Suntury # osu! username your need to send requests, pt. you can set this to your own username

OSU_USERNAME=Suntury # osu! username for auth
OSU_PWD=REPLACE_HERE # osu! server password get from https://osu.ppy.sh/home/account/edit
API_KEY=REPLACE_HERE # osu! api key get from https://osu.ppy.sh/home/account/edit
```

After installation for BackEnd you can use `node index.js` to start.

</p>
</details>

## ❤️ Contributors

<a href="https://github.com/Adivise/EasyWebRequest/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Adivise/EasyWebRequest" />
</a>

## 🤖 Credits
- Inspired by: **[DRB - Request bot](https://btmc.live/requests/)**
- Original Source: **[osuGameMapDM](https://github.com/sadonEmsi/osuGameMapDM)**