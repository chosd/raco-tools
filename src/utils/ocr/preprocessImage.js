export async function preprocessImage(
  imageElement
) {
  return new Promise((resolve, reject) => {

    try {

      if (!window.cv) {
        reject(
          new Error("OpenCV not loaded")
        );
        return;
      }

      const canvas =
        document.createElement("canvas");

      const ctx =
        canvas.getContext("2d");

      const MAX_WIDTH = 2000;

        let width =
        imageElement.width;

        let height =
        imageElement.height;

        if (width > MAX_WIDTH) {

        const ratio =
            MAX_WIDTH / width;

        width = MAX_WIDTH;
        height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

      ctx.drawImage(
        imageElement,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const src =
        cv.imread(canvas);

      const gray =
        new cv.Mat();

      const threshold =
        new cv.Mat();

      cv.cvtColor(
        src,
        gray,
        cv.COLOR_RGBA2GRAY
        );

        console.log(gray.type());
        console.log(gray.cols, gray.rows);

      cv.threshold(
        gray,
        threshold,
        150,
        255,
        cv.THRESH_BINARY
      );

      cv.bitwise_not(
        threshold,
        threshold
      );

      // 출력용 canvas
      const outputCanvas =
        document.createElement("canvas");

      outputCanvas.width =
        canvas.width;

      outputCanvas.height =
        canvas.height;

      cv.imshow(
        outputCanvas,
        threshold
      );

      src.delete();
      gray.delete();
      threshold.delete();

      resolve(outputCanvas);

    } catch (err) {

      reject(err);
    }
  });
}