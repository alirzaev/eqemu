import * as React from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNewImagePath, setNewImageSize, createNewImage, resetNewImageState } from '../../store/slices/newImage';
import { setHardDrivePath } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';

import './index.css';

const MIN_IMAGE_SIZE = 0.5;

const MAX_IMAGE_SIZE = 512;

const IMAGE_SIZE_STEP = 0.1;

function ImagePath() {
    const { path, status } = useAppSelector(state => state.newImage);
    const disabled = status === 'pending';
    const dispatch = useAppDispatch();

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
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => dispatch(selectNewImagePath())}
                    disabled={disabled}
                >
                    Select
                </button>
            </div>
        </div>
    );
}

function ImageSize() {
    const { size, status } = useAppSelector(state => state.newImage);
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
                    <span>{MIN_IMAGE_SIZE} GiB</span>
                    <input
                        type="range"
                        id="newImageSizeRange"
                        min={MIN_IMAGE_SIZE}
                        max={MAX_IMAGE_SIZE}
                        step={IMAGE_SIZE_STEP}
                        className="form-range"
                        value={size}
                        onChange={({ target }) => setSize(target.value)}
                        disabled={disabled}
                    />
                    <span>{MAX_IMAGE_SIZE} GiB</span>
                </div>
                <div className="create-new-image-size-numeric">
                    <div className="input-group">
                        <input
                            type="number"
                            min={MIN_IMAGE_SIZE}
                            max={MAX_IMAGE_SIZE}
                            step={IMAGE_SIZE_STEP}
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
    const { status, path } = useAppSelector(state => state.newImage);
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
    const { status } = useAppSelector(state => state.newImage);
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
