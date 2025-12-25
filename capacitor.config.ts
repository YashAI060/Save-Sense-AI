
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.02158b60be9343568802f74d84a33494',
  appName: 'PakSaver',
  webDir: 'dist',
  server: {
    url: 'https://02158b60-be93-4356-8802-f74d84a33494.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#16a34a',
      showSpinner: false
    }
  }
};

export default config;
