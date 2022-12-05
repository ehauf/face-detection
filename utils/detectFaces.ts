import canvas from "canvas";
import * as faceapi from "face-api.js";

const { Canvas, Image, ImageData } = canvas;
// @ts-ignore
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export async function detectFaces(file: string) {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./models");
  const image = await canvas.loadImage(file);

  const [result] = await Promise.all([
    faceapi.detectAllFaces(image as any),
    sleep(5000),
  ]);
  return result.length;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
