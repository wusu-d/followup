export const compressImage = async (
  file: File,
  maxSizeKB = 200,
  outputType = 'image/jpeg'
): Promise<File | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(null);
          return;
        }

        let width = img.width;
        let height = img.height;
        let quality = 0.7;

        // Resize the image if it's too large
        const maxWidth = 1920;
        const maxHeight = 1080;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const compress = () => {
          const dataUrl = canvas.toDataURL(outputType, quality);
          const binaryData = atob(dataUrl.split(',')[1]);
          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const view = new Uint8Array(arrayBuffer);
          for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: outputType });

          if (blob.size <= maxSizeKB * 1024 || quality <= 0.1) {
            const compressedFile = new File([blob], file.name, {
              type: outputType,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            quality -= 0.1;
            compress();
          }
        };

        compress();
      };
    };

    reader.onerror = () => {
      resolve(null);
    };
  });
};
