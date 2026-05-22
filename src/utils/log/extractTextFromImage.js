import Tesseract from "tesseract.js";

export async function extractTextFromImage(
  canvas
) {
  const result =
    await Tesseract.recognize(
      canvas,
      "eng",
      {
        logger: (m) =>
          console.log(m),
      }
    );

  return result.data.text;
}