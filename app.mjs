// import config from "./config";
import { recognize } from "node-native-ocr";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import promptIa from "./promptIa.mjs";

class ImageProcessor {
  constructor(img) {
    this.img = img;
  }

  async loadImage() {
    try {
      const loadBufferImg = await fs.readFile(this.img);
      const loadImageBuffer = await recognize(loadBufferImg);
      return loadImageBuffer;
    } catch (error) {
      console.log(error);
    }
  }
}

class Gemini {
  constructor(prompt) {
    this.prompt = prompt;
  }

  async parseAndFilter() {
    try {
      const gemini = new GoogleGenerativeAI( "AIzaSyDkS5SMkywdZbQ14g1P7DrWsDCB7MUmHUc" );
      const geminiModel = await gemini.getGenerativeModel({ model: "gemini-pro", });
      if (!this.prompt) throw new Error("coloque o prompt");

      const result = await geminiModel.generateContent(this.prompt);
      const response = await result.response;
      const text = response.text();
      Gemini.converterForObjectJsonJs(text);
    } catch (error) {
      console.log(error);
    }
  }

  static converterForObjectJsonJs(text) {
    const converter = text.replace(/json/g, "").replace(/`/g, "")  .replace(/\{\}/g, "");
    const {
      Nome,
      CPF,
      NomedoPaiedaMãe,
      DatadaSaída,
      HoradaSaída,
      DatadeNascimento,
      HoradaEntrada,
    } = JSON.parse(converter);
    console.log(converter);
  }
}


(async () => {
  const dadosImage = new ImageProcessor("F://extract//img.jpg");
  const result = await dadosImage.loadImage();
  const geminiIa = new Gemini(promptIa(result));

  await geminiIa.parseAndFilter();
})();





