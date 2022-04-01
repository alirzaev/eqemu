import * as React from 'react';
import { useState } from 'react';

import { HTMLOption } from '../../types';
import { Shell } from '../../enums';
import { useAppSelector } from '../../store/hooks';
import { buildQemuCmdArgs, getShellMultilineDelimeter } from '../../utils';

import './index.css';

const ShellList: Array<HTMLOption<Shell>> = [
    {
        text: 'cmd',
        value: Shell.CMD,
    },
    {
        text: 'PowerShell',
        value: Shell.POWERSHELL,
    },
    {
        text: 'bash',
        value: Shell.BASH,
    },
];

export function VmLauncher() {
    const [shell, setShell] = useState(Shell.CMD);
    const config = useAppSelector(state => state.vm);
    const system = useAppSelector(state => state.system);

    const delimeter = getShellMultilineDelimeter(shell);
    const qemuArgs = buildQemuCmdArgs(config, system.info);
    const script = qemuArgs.join(` ${delimeter}\n`);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(script);
    };

    const launchVm = () => {
        electron.vmManager.launchVm(qemuArgs.slice(1));
    };

    return (
        <div className="launcher">
            <div className="launcher-inner">
                <div className="launcher-shell-selector">
                    <p className="launcher-shell-selector-title">Generated shell script</p>
                    {ShellList.map(({ text, value }) => (
                        <div className="form-check form-check-inline" key={value}>
                            <input
                                id={`delimeter${value}`}
                                className="form-check-input"
                                type="radio"
                                name="delimeter"
                                value={value}
                                onChange={({ target }) => setShell(target.value as Shell)}
                                checked={shell == value}
                            />
                            <label htmlFor={`delimeter${value}`} className="form-check-label">
                                {text}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="launcher-script">
                    <code>{script}</code>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm launcher-script-btn-clipboard"
                        onClick={copyToClipboard}
                    >
                        Copy
                    </button>
                </div>
                <div className="launcher-panel">
                    <button type="button" className="btn btn-primary" onClick={launchVm}>
                        Launch VM
                    </button>
                </div>
            </div>
        </div>
    );
}
