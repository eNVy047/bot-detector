export function extractFeatures(userData, tweets) {
    const features = {
      followerRatio: userData.public_metrics.followers_count / 
                    (userData.public_metrics.following_count || 1),
      tweetFrequency: tweets.length / 
                     ((Date.now() - new Date(userData.created_at).getTime()) / 
                     (1000 * 60 * 60 * 24)),
      usernameEntropy: calculateEntropy(userData.username),
      profileScore: userData.description ? 1 : 0,
    };
    return features;
  }
  
  function calculateEntropy(str) {
    const charCounts = [...str].reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});
  
    return Object.values(charCounts).reduce((sum, count) => {
      const p = count / str.length;
      return sum - p * Math.log2(p);
    }, 0);
  }