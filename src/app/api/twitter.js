import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req, res) {
  const { username } = req.query;

  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  try {
    const user = await client.v2.userByUsername(username, {
      'user.fields': ['created_at', 'public_metrics', 'description']
    });

    const tweets = await client.v2.userTimeline(user.data.id, {
      max_results: 100
    });

    res.status(200).json({
      data: {
        user: user.data,
        tweets: tweets.data.data
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'API Error' });
  }
}