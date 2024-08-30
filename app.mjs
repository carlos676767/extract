
import { recognize } from "node-native-ocr";
import { ExecutableCodeLanguage, GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import promptIa from "./promptIa.mjs";
import exceljs from "exceljs"


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
      const gemini = new GoogleGenerativeAI("AIzaSyDkS5SMkywdZbQ14g1P7DrWsDCB7MUmHUc");
      const geminiModel = await gemini.getGenerativeModel({ model: "gemini-pro", });
      if (!this.prompt) throw new Error("coloque o prompt");
      const result = await geminiModel.generateContent(this.prompt);
      const response = await result.response;
      const text = response.text();
      return Gemini.converterForObjectJsonJs(text);
    } catch (error) {
      console.log(error);
    }
  }

  static converterForObjectJsonJs(text) {
    return text.replace(/json/g, "").replace(/`/g, "").replace(/\{\}/g, "");
  };
};

class ExcelDataHandler {
  static async #extrairDadosDaImagem() {
    const imageProcessor = new ImageProcessor("F://extract//IMG.jpg");
    const imageResult = await imageProcessor.loadImage();
    const geminiAi = new Gemini(promptIa(imageResult));
    const extractedData = await geminiAi.parseAndFilter();
    return extractedData;
  }

  static async preencherPlanilhaComDados() {
    const dados = await this.#extrairDadosDaImagem();
    if (dados) {
      console.log(dados);
      const { Nome, CPF, NomedoPaiMae, DatadeEntrada, Bairro, DatadeNascimento, HoradeEntrada, DatadeSaída, HoradeSaída, Telefone } = JSON.parse(dados);
      this.atualizarPlanilha(Nome, CPF, Bairro,  DatadeEntrada, HoradeEntrada, DatadeSaída,Telefone, HoradeSaída, NomedoPaiMae, DatadeNascimento)
      return;
    }
  }

  static async atualizarPlanilha(nome, cpf, Bairro, telefone, dataEntrada, horaEntrada, dataSaida, horaSaida,nomePais, nascimento) {
    try {
      const planilha = new exceljs.Workbook();
      const carregarPlanilha = await planilha.xlsx.readFile("F://extract//planilhatest.xlsx");
      const planilhaModel = carregarPlanilha.getWorksheet(1);
      planilhaModel.getCell("F11").value = nome
      planilhaModel.getCell("F14").value = cpf
      planilhaModel.getCell("F17").value = Bairro
      planilhaModel.getCell("C21").value = dataEntrada
      planilhaModel.getCell("C24").value = horaEntrada
      planilhaModel.getCell("K24").value = dataSaida
      planilhaModel.getCell("C27").value = horaSaida
      planilhaModel.getCell("F27").value = telefone
      planilhaModel.getCell('J14').value = nomePais
      planilhaModel.getCell("N14").value = nascimento
      await planilha.xlsx.writeFile("F://extract//planilhatest.xlsx");
    } catch (error) {
      console.error("Erro ao atualizar a planilha:", error);
    }
  }
};

ExcelDataHandler.preencherPlanilhaComDados();