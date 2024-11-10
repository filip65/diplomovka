import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: {
      printToPdf: (fileName: string) => Promise<boolean>;
      chooseFilePath: () => Promise<string>;
      saveProject: (state: string) => Promise<boolean>;
      openProject: () => void;
      onOpen: (channel: string, func: (data: any) => void) => void;
      getAppVersion: () => string;
      quit: () => void;
    };
  }
}
