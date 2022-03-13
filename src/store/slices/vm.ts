import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BootDevice, GraphicsCard } from '../../enums';
import { VmConfig } from '../../types';

type VmState = VmConfig;

const initialState: VmState = {
    memory: 1,
    cpu: {
        cores: 2,
    },
    cdrom: {
        enabled: false,
        path: '',
    },
    drive: {
        enabled: false,
        path: '',
    },
    bootDevice: BootDevice.HardDrive,
    graphics: {
        card: GraphicsCard.Standard,
    },
    audio: {
        enabled: false,
    },
    network: {
        enabled: false,
    },
    spiceAgent: {
        enabled: false,
    },
    spiceServer: {
        enabled: false,
        port: 3000,
        ticketing: false,
        password: '',
        usbRedirection: false,
    },
};

export const vmSlice = createSlice({
    name: 'vm',
    initialState,
    reducers: {
        setCpuCores: (state: VmState, action: PayloadAction<number>) => {
            state.cpu.cores = action.payload;
        },
        setMemory: (state: VmState, action: PayloadAction<number>) => {
            state.memory = action.payload;
        },
        setOpticalDriveEnabled: (state: VmState, action: PayloadAction<boolean>) => {
            state.cdrom.enabled = action.payload;
        },
        setOpticalDrivePath: (state: VmState, action: PayloadAction<string>) => {
            state.cdrom.path = action.payload;
        },
        setHardDriveEnabled: (state: VmState, action: PayloadAction<boolean>) => {
            state.drive.enabled = action.payload;
        },
        setHardDrivePath: (state: VmState, action: PayloadAction<string>) => {
            state.drive.path = action.payload;
        },
        setBootDevice: (state: VmState, action: PayloadAction<BootDevice>) => {
            state.bootDevice = action.payload;
        },
        setGraphicsCard: (state: VmState, action: PayloadAction<GraphicsCard>) => {
            state.graphics.card = action.payload;
        },
        setAudioEnabled: (state: VmState, action: PayloadAction<boolean>) => {
            state.audio.enabled = action.payload;
        },
        setNetworkEnabled: (state: VmState, action: PayloadAction<boolean>) => {
            state.network.enabled = action.payload;
        },
        setSpiceAgentEnabled: (state: VmState, action: PayloadAction<boolean>) => {
            state.spiceAgent.enabled = action.payload;
        },
        setSpiceServerEnabled: (state: VmState, action: PayloadAction<boolean>) => {
            state.spiceServer.enabled = action.payload;
        },
        setSpiceServerPort: (state: VmState, action: PayloadAction<number>) => {
            state.spiceServer.port = action.payload;
        },
        setSpiceServerTicketing: (state: VmState, action: PayloadAction<boolean>) => {
            state.spiceServer.ticketing = action.payload;
        },
        setSpiceServerPassword: (state: VmState, action: PayloadAction<string>) => {
            state.spiceServer.password = action.payload;
        },
        setSpiceServerUsbRedirection: (state: VmState, action: PayloadAction<boolean>) => {
            state.spiceServer.usbRedirection = action.payload;
        },
        setVmConfig: (state: VmState, action: PayloadAction<VmConfig>) => {
            const { audio, bootDevice, cdrom, cpu, drive, graphics, memory, network, spiceAgent, spiceServer } =
                action.payload;

            state.audio = audio;
            state.bootDevice = bootDevice;
            state.cdrom = cdrom;
            state.cpu = cpu;
            state.drive = drive;
            state.graphics = graphics;
            state.memory = memory;
            state.network = network;
            state.spiceAgent = spiceAgent;
            state.spiceServer = spiceServer;
        },
    },
});

export const {
    setCpuCores,
    setMemory,
    setOpticalDriveEnabled,
    setOpticalDrivePath,
    setHardDriveEnabled,
    setHardDrivePath,
    setBootDevice,
    setGraphicsCard,
    setAudioEnabled,
    setNetworkEnabled,
    setSpiceAgentEnabled,
    setSpiceServerEnabled,
    setSpiceServerPort,
    setSpiceServerTicketing,
    setSpiceServerPassword,
    setSpiceServerUsbRedirection,
    setVmConfig,
} = vmSlice.actions;

export default vmSlice.reducer;
