export const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number = 0.5
): Promise<{ blob: Blob; fileName: string }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            // Set up the canvas to match the aspect ratio of the image
            let width = img.width;
            let height = img.height;

            // Calculate the new dimensions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.floor((maxWidth / width) * height);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.floor((maxHeight / height) * width);
                    height = maxHeight;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);

                // Convert the canvas content to a blob (compressed image)
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const fileExtension = file.name.split('.').pop()
                            resolve({ blob, fileName: file.name });
                        } else {
                            reject(new Error('Canvas is empty or failed to convert.'));
                        }
                    },
                    file.type || 'image/jpeg',
                    quality // Compression quality from 0 to 1
                );
            } else {
                reject(new Error('Failed to get 2D context for canvas.'));
            }
        };

        img.onerror = () => reject(new Error('Failed to load image.'));

        // Convert file to a data URL and set it as the source of the Image object
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                img.src = e.target.result as string;
            } else {
                reject(new Error('Failed to read file as Data URL.'));
            }
        };
        reader.onerror = () => reject(new Error('FileReader error.'));
        reader.readAsDataURL(file);
    });
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result as string); // This is the Base64 string
            } else {
                reject(new Error('Failed to convert blob to Base64.'));
            }
        };
        reader.onerror = () => reject(new Error('FileReader error.'));
        reader.readAsDataURL(blob);
    });
};
