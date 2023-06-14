## 🚀・SonicSniper - 2023
Best Websocket Based Proxyless Vanity Sniper Which Uses `GUILD_UPDATE` To Fetch The Vanity When Updated Or Removed!

## ⭐・Features
- `Proxyless`
- `Supports Multiple Server`
- `Supports Multiple Vanities`
- `0.4-0.5s Claim Time`
- `Fully websocket based (No 3rd Party Client`
- `Undetected`

## ⚙️・Configuration
```json
{
    "sniping_token": "Main Sniping Token (It Must Be In The Server You Want To Snipe",
    "logging": {
        "ratelimit": {
            "token": "WEBHOOK_TOKEN",
            "id": "WEBHOOK_ID"
        },
        "successs": {
            "token": "WEBHOOK_TOKEN",
            "id": "WEBHOOK_ID"
        },
        "errror": {
            "token": "WEBHOOK_TOKEN",
            "id": "WEBHOOK_ID"
        }
    },
    "target_servers": [
        "Place the servers u want to snipe, for example : ",
        "1112639901775704087",
    ],
    "target_vanity": {
        "Server Id With That Vanity": "Vanity URL, Must Be In Order. For Example :",
        "1112639901775704087": "hcaptcha",
    },
    "upgraded_servers": [
        {
            "token": "Upgraded server = Level 3 Servers. Place The Token Of The ID With Level 3 Server In Which u want to hold the vanity",
            "server_id": "LVL_3_SERVER_ID"
        },
        {
            "token": "TOKEN WITH ONE MORE LEVEL 3 SERVER, U can do as many as u want",
            "server_id": "2ND_LVL_3_SERVER_ID"
        }
    ]
}
```

## 🔥・Starting Up!
```bash
# First install nodejs v16.6.0 From https://nodejs.org
$ git clone https://github.com/Itz-Void/SonicSniper
$ cd SonicSniper
$ npm install 
$ node main
```

## 🤝・Contributing
Any ideas on how to improve the checker? Or just think you got something you want to see being added? [Open a new issue](https://github.com/Itz-Void/SonicSniper/issues)!

## 🧊 ・Contact me
You can [Open a new issue](https://github.com/Itz-Void/SonicSniper/issues) or @presets is my discord.
