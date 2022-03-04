import { ElectronBridge } from './types';

declare global {
    const electron: ElectronBridge;

    const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

    const MAIN_WINDOW_WEBPACK_ENTRY: string;
}
