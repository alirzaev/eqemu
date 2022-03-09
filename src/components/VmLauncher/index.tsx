import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShell } from '../../store/slices/launcher';
import { Shell } from '../../enums';
import { buildQemuCmdArgs, getShellMultilineDelimeter } from '../../utils';

import './index.css';

const ShellList: Array<{ text: string; value: Shell }> = [
    {
        text: 'cmd',
        value: Shell.Cmd,
    },
    {
        text: 'PowerShell',
        value: Shell.PowerShell,
    },
    {
        text: 'bash',
        value: Shell.Bash,
    },
];

export function VmLauncher() {
    const { shell } = useAppSelector(state => state.launcher);
    const { vm: config, system } = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const delimeter = getShellMultilineDelimeter(shell);
    const qemuArgs = buildQemuCmdArgs(config, system);
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
                                onChange={event => dispatch(setShell(event.target.value as Shell))}
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
