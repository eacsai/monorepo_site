export const devBaseURL = 'http://103.79.78.232:7001';
export const proBaseURL = 'http://103.79.78.232:7001';
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
export const TIMEOUT = 5000;
