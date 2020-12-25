import Twitter from "twitter-lite";
import { nits } from "../../utils/nits";

const terms = nits.map((nit) => `"${nit[0]}"`).join(" OR ");
const query = `${terms} -filter:retweets -filter:replies`;

export default async (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  // const data = await client.get("search/tweets", {
  //   q: query,
  //   count: 25,
  //   result_type: "recent",
  // });

  // const results = data?.statuses ?? [];
  // const firstResult = results[0];

  // if (!firstResult) return;

  // const {
  //   id_str: id,
  //   text,
  //   user: { screen_name: handle },
  // } = firstResult;

  // const nitMatch = nits.find((nit) => {
  //   const re = new RegExp(nit[0], "i");
  //   return re.test(text);
  // });

  // if (!nitMatch) return;

  // const tweet = await client.post("statuses/update", {
  //   status: `@${handle} Hi! I think you mean, '${nitMatch[1]}' 😊`,
  //   in_reply_to_status_id: id,
  //   auto_populate_reply_metadata: true,
  // });

  res.statusCode = 200;
  res.json({ tweet: "TODO" });
};
