import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import pdfFonts from "../assets/custom-font";

// import pdfFonts from "./vfs_fonts";

// Register the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default (_, inject) => {
  inject("pdfMake", pdfMake);
};
