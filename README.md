# Watch Twitter user for new tweets and send Telegram message

This program will get the latest tweet from a Twitter user, then it will compare it with the local saved latest tweet. 

If the fetched tweet is different than the stored one, then it will use a Telegram bot to send a new message to a Telegram user and notify it of the new tweet.

Requirements:
- Register a project in https://developer.twitter.com/
- Create a Telegram Bot via https://t.me/BotFather 
- Install Node.js https://nodejs.org/en/download/

Install:
- Download source code [here](https://github.com/joeperpetua/twitter-watch-to-tg/archive/refs/heads/main.zip)
- Extract the zip
- In the extracted folder run `npm install`

Fill the tokens.json template file with the following elements:
- twitterBearer (Twitter API bearer token)
- botToken (Telegram bot token)
- TgUserID (Telegram user to receive the message)
- TwUserID (Twitter user ID to watch new tweets from)
- TwUsername (Twitter user username to watch new tweets from)

Run:

- `node main.js`
