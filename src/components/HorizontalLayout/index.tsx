import * as React from 'react';

import './index.css';

interface LayoutProps {
    even: boolean;
    children: React.ReactNode;
}

export function HorizontalLayout({ even, children }: LayoutProps) {
    return (
        <div
            className={`horizontal-layout ${even ? 'horizontal-layout-even' : ''}`}
        >
            {children}
        </div>
    );
}
