import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShell } from '../../store/slices/launcher';
import { ShellDelimeter } from '../../enums';
import { buildQemuCmdArgs } from '../../utils';

import './index.css';

const ShellList: Array<{ text: string; value: ShellDelimeter }> = [
    {
        text: 'cmd',
        value: ShellDelimeter.Cmd,
    },
    {
        text: 'PowerShell',
        value: ShellDelimeter.PowerShell,
    },
    {
        text: 'bash',
        value: ShellDelimeter.Bash,
    },
];

export function VmLauncher() {
    const shell = useAppSelector(state => state.launcher.shell);
    const { vm: config, system } = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const onChangeShellHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as ShellDelimeter;

        dispatch(setShell(value));
    };

    const script = buildQemuCmdArgs(config, system).join(` ${shell}\n`);

    const onClickCopyButtonHandler = () => {
        navigator.clipboard.writeText(script);
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
                                onChange={onChangeShellHandler}
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
                        onClick={onClickCopyButtonHandler}
                    >
                        Copy
                    </button>
                </div>
                <div className="launcher-panel">
                    <button type="button" className="btn btn-primary">
                        Launch VM
                    </button>
                </div>
            </div>
        </div>
    );
}
