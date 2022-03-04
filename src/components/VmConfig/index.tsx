import * as React from 'react';

import { HorizontalLayout } from '../HorizontalLayout';
import { Cpu } from '../Cpu';
import { Ram } from '../Ram';
import { OpticalDrive } from '../OpticalDrive';
import { HardDrive } from '../HardDrive';
import { BootDevice } from '../BootDevice';
import { GraphicsCard } from '../GraphicsCard';
import { AudioDevice } from '../AudioDevice';
import { NetworkSettings } from '../NetworkSettings';
import { SpiceAgent } from '../SpiceAgent';
import { SpiceServer } from '../SpiceServer';

import './index.css';

export function VmConfig() {
    return (
        <div className="vm-config">
            <div className="vm-config-inner">
                <HorizontalLayout even={true}>
                    <Cpu />
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
                    <NetworkSettings />
                </HorizontalLayout>

                <SpiceAgent />
                <SpiceServer />
            </div>
        </div>
    );
}
