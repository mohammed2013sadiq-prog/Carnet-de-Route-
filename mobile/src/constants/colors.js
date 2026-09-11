import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const colors = {
  ink: '#25312F',
  muted: '#78817D',
  paper: '#F7F5F0',
  white: '#FFFFFF',
  terracotta: '#B95735',
  terracottaDark: '#8D3F27',
  sage: '#AABBA7',
  sageLight: '#E4ECE2',
  sand: '#E9D8C5',
  line: '#E8E4DD',
  danger: '#B0443E',
};

const expoHost = Constants.expoConfig?.hostUri?.split(':')[0];
const defaultHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const defaultApiBaseUrl = `http://${expoHost || defaultHost}:3000`;

export const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || defaultApiBaseUrl;
