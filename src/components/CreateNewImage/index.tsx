import * as React from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setHardDrivePath } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { DiskImageFormat, View } from '../../enums';
import { MAX_NEW_IMAGE_SIZE, MIN_NEW_IMAGE_SIZE } from '../../consts/newImage';
import { getImageFileFormat } from '../../utils';

import './index.css';

const NEW_IMAGE_SIZE_STEP = 0.1;

type ImageCreationStatus = 'pending' | 'failed' | 'ready';

interface NewImageState {
    path: string;
    size: number;
    status: ImageCreationStatus;
}

function useNewImageState() {
    const [path, setPath] = React.useState('');
    const [size, setSize] = React.useState(25);
    const [status, setStatus] = React.useState<ImageCreationStatus>('ready');

    return [
        {
            path,
            size,
            status,
        },
        setPath,
        setSize,
        setStatus,
    ] as [NewImageState, typeof setPath, typeof setSize, typeof setStatus];
}

export function CreateNewImage() {
    const [state, setPath, setSize, setStatus] = useNewImageState();
    const dispatch = useAppDispatch();
    const isPending = state.status === 'pending';

    const setImagePath = async () => {
        const result = await electron.dialog.showSaveDialog({
            defaultPath: state.path,
            filters: [
                { name: 'QEMU disk image', extensions: ['qcow2'] },
                { name: 'VMware disk image', extensions: ['vmdk'] },
                { name: 'VirtualBox disk image', extensions: ['vdi'] },
            ],
        });

        if (!result.canceled && result.filePath) {
            let newPath = result.filePath;

            newPath = electron.path.extname(newPath) === '' ? `${newPath}.${DiskImageFormat.QCOW2}` : newPath;
            setPath(newPath);
        }
    };

    const setImageSize = (value: string) => {
        setSize(Number.parseFloat(value));
    };

    const createImage = async () => {
        setStatus('pending');

        const { path, size } = state;
        const format = getImageFileFormat(path);

        try {
            const result = await electron.system.createImage(path, format, size);
            const ok = typeof result === 'string';

            if (ok) {
                setStatus('ready');
                dispatch(setHardDrivePath(path));
                dispatch(setWindowActiveView(View.VM_VIEW));
            } else {
                setStatus('failed');
            }
        } catch (_) {
            setStatus('failed');
        }
    };

    const imagePathNode = (
        <div>
            <label htmlFor="newImagePath" className="form-label">
                Path
            </label>
            <div className="input-group mb-2">
                <input
                    id="newImagePath"
                    className="form-control"
                    type="text"
                    value={state.path}
                    disabled={isPending}
                    readOnly
                />
                <button className="btn btn-outline-primary" type="button" onClick={setImagePath} disabled={isPending}>
                    Select
                </button>
            </div>
        </div>
    );

    const imageSizeNode = (
        <div>
            <label htmlFor="newImageSizeRange" className="form-label">
                Image size
            </label>
            <div className="create-new-image-size-block">
                <div className="create-new-image-size-range">
                    <span>{MIN_NEW_IMAGE_SIZE} GiB</span>
                    <input
                        type="range"
                        id="newImageSizeRange"
                        min={MIN_NEW_IMAGE_SIZE}
                        max={MAX_NEW_IMAGE_SIZE}
                        step={NEW_IMAGE_SIZE_STEP}
                        className="form-range"
                        value={state.size}
                        onChange={e => setImageSize(e.target.value)}
                        disabled={isPending}
                    />
                    <span>{MAX_NEW_IMAGE_SIZE} GiB</span>
                </div>
                <div className="create-new-image-size-numeric">
                    <div className="input-group">
                        <input
                            type="number"
                            min={MIN_NEW_IMAGE_SIZE}
                            max={MAX_NEW_IMAGE_SIZE}
                            step={NEW_IMAGE_SIZE_STEP}
                            className="form-control"
                            value={state.size}
                            onChange={e => setImageSize(e.target.value)}
                            disabled={isPending}
                        />
                        <span className="input-group-text">GiB</span>
                    </div>
                </div>
            </div>
        </div>
    );

    let imageStatusNode;
    switch (state.status) {
        case 'failed':
            imageStatusNode = <span className="text-danger">Failed to create an image</span>;
            break;
        case 'pending':
            imageStatusNode = <span className="text-secondary">Creating...</span>;
            break;
        default:
            imageStatusNode = null;
    }

    const imageControlsNode = (
        <div className="create-new-image-controls">
            <button type="button" className="btn btn-primary" onClick={createImage} disabled={isPending}>
                Create
            </button>
            {imageStatusNode}
        </div>
    );

    return (
        <div className="create-new-image">
            <div className="create-new-image-header">
                <h1>Create a new disk image</h1>
            </div>
            <div className="create-new-image-main">
                {imagePathNode}
                {imageSizeNode}
                {imageControlsNode}
            </div>
            <div className="create-new-image-footer">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch(setWindowActiveView(View.VM_VIEW))}
                    disabled={isPending}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
