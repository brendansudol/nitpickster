import sample from "lodash.sample";
import shuffle from "lodash.shuffle";
import Twitter from "twitter-lite";
import { emojis, nits } from "../../utils/data";

const NITPICKS_TO_SEARCH_FOR = 3;

export default async (req, res) => {
  try {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    // search for a random subset of nits on each run
    const nitsFiltered = shuffle(nits).slice(0, NITPICKS_TO_SEARCH_FOR);
    const terms = nitsFiltered.map((nit) => `"${nit[0]}"`).join(" OR ");
    const query = `${terms} -filter:retweets -filter:replies`;

    const data = await client.get("search/tweets", {
      q: query,
      count: 25,
      result_type: "recent",
    });

    // use first (most recent) result
    const result = (data?.statuses ?? [])[0];

    if (!result) {
      return res.status(200).json({
        query,
        origTweet: undefined,
        status: "NO_RESULTS",
      });
    }

    const {
      id_str,
      text,
      user: { screen_name: handle },
    } = result;

    const nitMatch = nitsFiltered.find((nit) => {
      const re = new RegExp(nit[0], "i");
      return re.test(text);
    });

    if (!nitMatch) {
      return res.status(200).json({
        query,
        origTweet: text,
        status: "NO_NIT",
      });
    }

    // compose reply tweet
    const actual = nitMatch[1];
    const emoji = sample(emojis);
    const reply = `@${handle} Hi! I think you mean, '${actual}' ${emoji}`;

    await client.post("statuses/update", {
      status: reply,
      in_reply_to_status_id: id_str,
      auto_populate_reply_metadata: true,
    });

    return res.status(200).json({
      query,
      origTweet: text,
      status: "SUCCESS",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message ?? e.toString() ?? "N/A",
      status: "ERROR",
    });
  }
};
