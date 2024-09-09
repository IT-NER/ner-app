import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import KanitRegular from "~/assets/fonts/Kanit/Kanit-Regular.ttf";
import KanitBold from "~/assets/fonts/Kanit/Kanit-Bold.ttf";
import KanitItalic from "~/assets/fonts/Kanit/Kanit-Italic.ttf";
import KanitBoldItalic from "~/assets/fonts/Kanit/Kanit-BoldItalic.ttf";

pdfMake.fonts = {
  Kanit: {
    normal: "Kanit-Regular.ttf",
    bold: "Kanit-Bold.ttf",
    italics: "Kanit-Italic.ttf",
    bolditalics: "Kanit-BoldItalic.ttf",
  },
};

pdfMake.vfs["Kanit-Regular.ttf"] = KanitRegular;
pdfMake.vfs["Kanit-Bold.ttf"] = KanitBold;
pdfMake.vfs["Kanit-Italic.ttf"] = KanitItalic;
pdfMake.vfs["Kanit-BoldItalic.ttf"] = KanitBoldItalic;

export default (_, inject) => {
  inject("pdfMake", pdfMake);
};
