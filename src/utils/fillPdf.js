import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
export async function fillPdf(formData, photoUrl, passportUrl, templateUrl) {
  const url = templateUrl
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  pdfDoc.registerFontkit(fontkit)
  const customFontBytes = await fetch('/fonts/Tinos-Regular.ttf').then(res => res.arrayBuffer())
  const customFont = await pdfDoc.embedFont(customFontBytes)
  console.log(pdfDoc)
  const page = pdfDoc.getPages()[0]
  const { width, height } = page.getSize()
  page.drawText('Huỳnh Thanh Sang', { x: 410, y: height - 222, size: 14, font: customFont })
  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}