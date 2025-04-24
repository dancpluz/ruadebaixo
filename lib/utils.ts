export function checkEnvVars(envVars: string[]) {
  envVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`A variável ${envVar} não foi definida`);
    }
  });
}

export function buildImgUrl(url?: string) {
  return url ? process.env.NEXT_PUBLIC_STRAPI_API_URL + url :  undefined;
}