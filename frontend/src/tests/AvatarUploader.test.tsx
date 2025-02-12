import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AvatarUploader from '../modules/shared/components/AvatarUploader.tsx';

describe('Avatar uploader tests', () => {
  const file = new File(['image content'], 'test-image.png', { type: 'image/png' });
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');

    vi.mock('../utils/files.ts', () => ({
      getImageFileFromCanvas: vi.fn(() => file)
    }));
  });

  it('should upload file correctly', () => {
    render(
      <AvatarUploader
        initialImageSrc={''}
        loading={false}
        setAvatarFile={() => {}}
      />
    );

    fireEvent.change(screen.getByTestId('upload-input'), { target: { files: [file] } });

    expect(screen.getByTestId('cropper-block')).toBeInTheDocument();
  });
});
