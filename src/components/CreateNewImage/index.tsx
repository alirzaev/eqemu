import * as React from 'react';
import { useEffect } from 'react';
import { extname } from 'path';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setNewImageSize, createNewImage, resetNewImageState, setNewImagePath } from '../../store/slices/newImage';
import { setHardDrivePath } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { DiskImageFormat } from '../../enums';
import { MAX_NEW_IMAGE_SIZE, MIN_NEW_IMAGE_SIZE } from '../../consts/newImage';

import './index.css';

const NEW_IMAGE_SIZE_STEP = 0.1;

function ImagePath() {
    const path = useAppSelector(state => state.newImage.path);
    const status = useAppSelector(state => state.newImage.status);
    const disabled = status === 'pending';
    const dispatch = useAppDispatch();

    const selectPath = async () => {
        const result = await electron.dialog.showSaveDialog({
            defaultPath: path,
            filters: [
                { name: 'QEMU disk image', extensions: ['qcow2'] },
                { name: 'VMware disk image', extensions: ['vmdk'] },
                { name: 'VirtualBox disk image', extensions: ['vdi'] },
            ],
        });

        if (!result.canceled && result.filePath) {
            let newPath = result.filePath;

            newPath = extname(newPath) === '' ? `${newPath}.${DiskImageFormat.QCOW2}` : newPath;
            dispatch(setNewImagePath(newPath));
        }
    };

    return (
        <div>
            <label htmlFor="newImagePath" className="form-label">
                Path
            </label>
            <div className="input-group mb-2">
                <input
                    id="newImagePath"
                    className="form-control"
                    type="text"
                    value={path}
                    disabled={disabled}
                    readOnly
                />
                <button className="btn btn-outline-primary" type="button" onClick={selectPath} disabled={disabled}>
                    Select
                </button>
            </div>
        </div>
    );
}

function ImageSize() {
    const size = useAppSelector(state => state.newImage.size);
    const status = useAppSelector(state => state.newImage.status);
    const disabled = status === 'pending';
    const dispatch = useAppDispatch();

    const setSize = (value: string) => dispatch(setNewImageSize(Number.parseFloat(value)));

    return (
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
                        value={size}
                        onChange={({ target }) => setSize(target.value)}
                        disabled={disabled}
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
                            value={size}
                            onChange={({ target }) => setSize(target.value)}
                            disabled={disabled}
                        />
                        <span className="input-group-text">GiB</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ImageStatus() {
    const path = useAppSelector(state => state.newImage.path);
    const status = useAppSelector(state => state.newImage.status);
    const disabled = status === 'pending' || !path;
    const dispatch = useAppDispatch();

    const handler = async () => {
        const { payload } = await dispatch(createNewImage());

        if (payload === 'ready') {
            dispatch(setHardDrivePath(path));
            dispatch(setWindowActiveView('main'));
        }
    };

    return (
        <div className="create-new-image-status">
            <button type="button" className="btn btn-primary" onClick={handler} disabled={disabled}>
                Create
            </button>
            {status === 'failed' && <span className="text-danger">Failed to create an image</span>}
            {status === 'pending' && <span className="text-secondary">Creating...</span>}
        </div>
    );
}

export function CreateNewImage() {
    const status = useAppSelector(state => state.newImage.status);
    const disabled = status === 'pending';
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(resetNewImageState());
        };
    }, []);

    return (
        <div className="create-new-image">
            <div className="create-new-image-header">
                <h1>Create a new disk image</h1>
            </div>
            <div className="create-new-image-main">
                <ImagePath />
                <ImageSize />
                <ImageStatus />
            </div>
            <div className="create-new-image-footer">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch(setWindowActiveView('main'))}
                    disabled={disabled}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
