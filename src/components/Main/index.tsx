import * as React from 'react';

import { HorizontalLayout } from '../HorizontalLayout';
import { VmConfig } from '../VmConfig';
import { VmLauncher } from '../VmLauncher';

import './index.css';

export function Main() {
    return (
        <HorizontalLayout even={true}>
            <VmConfig />
            <VmLauncher />
        </HorizontalLayout>
    );
}
