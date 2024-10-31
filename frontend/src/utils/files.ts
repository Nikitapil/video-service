export const getImageFileFromCanvas = (canvas: HTMLCanvasElement, fileName: string): Promise<File> => {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], fileName, { type: 'image/jpg' });
        resolve(file);
      }
    });
  });
};
