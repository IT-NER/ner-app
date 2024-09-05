import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Register the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default (_, inject) => {
  // Inject pdfMake into the Nuxt context
  inject("pdfMake", pdfMake);
};
