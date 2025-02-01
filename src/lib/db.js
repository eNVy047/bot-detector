import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export async function saveDetectionResult(data) {
  const { error } = await supabase
    .from('detections')
    .insert({
      username: data.username,
      probability: data.botProbability,
      features: data.features
    });

  return { error };
}