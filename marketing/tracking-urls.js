const BASE_URL = 'https://leadiq.yourdomain.com';

const trackingUrls = {
  linkedin: `${BASE_URL}/?utm_source=linkedin&utm_medium=social&utm_campaign=launch`,
  twitter: `${BASE_URL}/?utm_source=twitter&utm_medium=social&utm_campaign=launch`,
  productHunt: `${BASE_URL}/?utm_source=producthunt&utm_medium=social&utm_campaign=launch`,
  email: `${BASE_URL}/?utm_source=email&utm_medium=newsletter&utm_campaign=launch`
};

module.exports = trackingUrls;