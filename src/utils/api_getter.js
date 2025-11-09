const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

export async function accessSecret() {
  const name = 'projects/1035533351041/secrets/Firebase_API/versions/latest';

  try {
    const [accessResponse] = await client.accessSecretVersion({ name });
    const payload = accessResponse.payload.data.toString('utf8');
    return payload;
  } catch (error) {
    console.error('Error accessing secret:', error);
    throw error;
  }
}