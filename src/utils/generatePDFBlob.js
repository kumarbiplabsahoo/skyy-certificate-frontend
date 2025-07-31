// utils/generatePDFBlob.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDFBlob = async (element, fileName) => {
  if (!element) throw new Error("Missing DOM element to render.");

  const canvas = await html2canvas(element, {
    scale: 8,
    logging: false,
    dpi: 800,
  });

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  const pdf = new jsPDF({
    orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
    unit: "pt",
    format: [canvasWidth, canvasHeight],
  });

  pdf.addImage(imgData, "JPEG", 0, 0, canvasWidth, canvasHeight);
  pdf.save(fileName);

  return pdf.output("blob");
};
