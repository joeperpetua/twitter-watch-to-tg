const needle = require("needle");
const fs = require('fs');
const fetch = require('node-fetch');
const tokens = require('./tokens.json');

const endpointURL = `https://api.twitter.com/2/users/${tokens.TwUserID}/tweets`;

async function getRequestTwitter() {
  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    "max_results": 5
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2ListTweetsLookupJS",
      authorization: `Bearer ${tokens.twitterBearer}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

async function sendTG(tweetID){
    console.log("Sending TG message");
    
    const url = `https://api.telegram.org/bot${tokens.botToken}/sendMessage?chat_id=${tokens.TgUserID}&parse_mode=Markdown&text=There is a new Tweet! \nhttps://twitter.com/${tokens.TwUsername}/status/${tweetID}`;

    try {
        const res = await fetch(encodeURI(url));
        console.log(`Tg message status: ${res.status}`)
    } catch (error) {
        console.log(error);
    }
}

(async () => {
  try {
    // Make request
    const response = await getRequestTwitter();
    if(!response.data){return}

    const latestFetched = response.data[0].text;
    const latestFetchedID = response.data[0].id;
    let latest;

    try {
        latest = fs.readFileSync('./latest_tweet', 'utf8')
    } catch (err) {
        console.error(err)
    }

    console.log(`Latest fetched: ${latestFetched} \nLatest registered: ${latest}`);

    if (latestFetched != latest) {
        try {
            fs.writeFileSync('./latest_tweet', latestFetched)
            console.log("file written succesfully")
        } catch (err) {
            console.error(err)
        }

        await sendTG(latestFetchedID);
    }else{
        console.log("No new tweet")
    }


  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();