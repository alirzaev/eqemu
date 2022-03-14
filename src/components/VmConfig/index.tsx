import * as React from 'react';

import { HorizontalLayout } from '../HorizontalLayout';
import { Cpu } from '../Cpu';
import { Ram } from '../Ram';
import { OpticalDrive } from '../OpticalDrive';
import { HardDrive } from '../HardDrive';
import { BootDevice } from '../BootDevice';
import { GraphicsCard } from '../GraphicsCard';
import { AudioDevice } from '../AudioDevice';
import { NetworkCard } from '../NetworkCard';
import { SpiceAgent } from '../SpiceAgent';
import { SpiceServer } from '../SpiceServer';
import { Chipset } from '../Chipset';

import './index.css';

export function VmConfig() {
    return (
        <div className="vm-config">
            <div className="vm-config-inner">
                <HorizontalLayout even={true}>
                    <Cpu />
                    <Chipset />
                    <Ram />
                </HorizontalLayout>

                <OpticalDrive />
                <HardDrive />

                <HorizontalLayout even={true}>
                    <BootDevice />
                    <GraphicsCard />
                </HorizontalLayout>

                <HorizontalLayout even={true}>
                    <AudioDevice />
                    <NetworkCard />
                </HorizontalLayout>

                <SpiceAgent />
                <SpiceServer />
            </div>
        </div>
    );
}
