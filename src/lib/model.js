import * as tf from '@tensorflow/tfjs';

// Create or load your model
export async function createModel() {
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [4], units: 8, activation: 'relu' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' })
    ]
  });

  model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

// Prediction function
export async function predictBot(features, model) {
  const tensor = tf.tensor2d([Object.values(features)]);
  const prediction = model.predict(tensor);
  return prediction.dataSync()[0];
}