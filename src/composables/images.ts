export const checkImageBrightness = (
  event: CanvasImageSource
): "dark" | "light" => {
  const img = event as HTMLImageElement;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("2D context not supported");
  }

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;

  const sum = data.reduce((accumulator, currentValue, index) => {
    if (index % 4 === 0) {
      const r = currentValue;
      const g = data[index + 1];
      const b = data[index + 2];

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      return accumulator + brightness;
    }

    return accumulator;
  }, 0);

  const averageBrightness = sum / (img.width * img.height);

  return averageBrightness < 128 ? "dark" : "light";
};
