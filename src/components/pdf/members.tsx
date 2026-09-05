import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Member } from "../../utlis/type";

interface DataSets {
  data: Member[];
}

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const MemberPDF = ({ data }: DataSets) => {
  const year = new Date().getFullYear();

  const generateReportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    /* =========================================================
         CONFIGURATION
      ========================================================= */

    const PAGE_WIDTH = doc.internal.pageSize.width;
    const PAGE_HEIGHT = doc.internal.pageSize.height;

    const MARGIN = 15;
    const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

    const COLORS = {
      primary: [5, 85, 39] as [number, number, number],
      secondary: [71, 22, 36] as [number, number, number],
      light: [243, 247, 244] as [number, number, number],
      border: [220, 225, 221] as [number, number, number],
      text: [45, 45, 45] as [number, number, number],
      muted: [110, 110, 110] as [number, number, number],
      white: [255, 255, 255] as [number, number, number],
    };

    const img = new Image();
    img.src = "/logo.png";

    img.onload = () => {
      /* =========================================================
           HEADER
        ========================================================= */

      doc.addImage(img, "PNG", MARGIN, 10, 25, 25);

      doc.setTextColor(...COLORS.primary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);

      doc.text("CEPARCREA", 45, 17);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.muted);

      doc.text("Coopérative d'épargne et crédit de l'amitié", 45, 23);

      doc.text("Goma — République Démocratique du Congo", 45, 28);

      /* =========================================================
           TITRE
        ========================================================= */

      doc.setTextColor(...COLORS.secondary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);

      doc.text("LISTE DES MEMBRES", PAGE_WIDTH / 2, 45, {
        align: "center",
      });

      /* =========================================================
           INFORMATIONS
        ========================================================= */

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.muted);

      doc.text(`Année : ${year}`, MARGIN, 51);

      doc.text(`Nombre de membres : ${data.length}`, PAGE_WIDTH - MARGIN, 51, {
        align: "right",
      });

      /* =========================================================
           LIGNES DE COULEURS
           Même largeur que le tableau et le footer
        ========================================================= */

      doc.setFillColor(...COLORS.primary);
      doc.rect(MARGIN, 55, CONTENT_WIDTH, 1.2, "F");

      doc.setFillColor(...COLORS.light);
      doc.rect(MARGIN, 56.2, CONTENT_WIDTH, 1, "F");

      doc.setFillColor(...COLORS.secondary);
      doc.rect(MARGIN, 57.2, CONTENT_WIDTH, 1, "F");

      /* =========================================================
         TABLEAU
      ========================================================= */

      const head = [
        ["#", "Nom complet", "Téléphone", "Adresse", "Type", "État"],
      ];

      const body = data.map((item, index) => [
        index + 1,
        item.nom_complet.toLocaleUpperCase() ?? "—",
        item.phone ?? "—",
        item.adresse ?? "—",
        item.type_member_nom ?? "—",
        item.status ?? "—",
      ]);

      autoTable(doc, {
        startY: 62,

        head,
        body,

        theme: "grid",

        tableWidth: CONTENT_WIDTH,

        margin: {
          left: MARGIN,
          right: MARGIN,
        },

        styles: {
          font: "helvetica",
          fontSize: 8,
          cellPadding: 3,

          textColor: COLORS.text,

          lineColor: COLORS.border,
          lineWidth: 0.2,

          valign: "middle",
        },

        headStyles: {
          fillColor: COLORS.primary,
          textColor: COLORS.white,

          fontStyle: "bold",
          fontSize: 8,

          halign: "center",
          valign: "middle",

          cellPadding: 3,
        },

        bodyStyles: {
          fillColor: COLORS.white,
        },

        alternateRowStyles: {
          fillColor: COLORS.light,
        },

        /* =======================================================
             4 COLONNES UNIQUEMENT
          ======================================================= */

        columnStyles: {
          0: {
            halign: "center",
            cellWidth: 10,
          },

          1: {
            halign: "left",
            cellWidth: 45,
            fontStyle: "bold",
          },

          2: {
            halign: "left",
            cellWidth: 30,
          },

          3: {
            halign: "left",
            cellWidth: 40,
          },

          4: {
            halign: "center",
            cellWidth: 30,
          },

          5: {
            halign: "center",
            cellWidth: 25,
          },
        },

        /* =======================================================
             FOOTER
          ======================================================= */

        didDrawPage: () => {
          const footerY = PAGE_HEIGHT - 15;

          doc.setDrawColor(...COLORS.border);
          doc.setLineWidth(0.2);

          // Même début et même fin que le tableau
          doc.line(MARGIN, footerY, PAGE_WIDTH - MARGIN, footerY);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(...COLORS.muted);

          doc.text(`© ${year} — CEPARCREA`, MARGIN, PAGE_HEIGHT - 9);

          doc.text(
            `Page ${doc.getNumberOfPages()}`,
            PAGE_WIDTH - MARGIN,
            PAGE_HEIGHT - 9,
            {
              align: "right",
            },
          );
        },
      });

      /* =========================================================
           RÉSUMÉ
        ========================================================= */

      const lastAutoTable = (doc as JsPDFWithAutoTable).lastAutoTable;

      const finalY = (lastAutoTable?.finalY ?? 75) + 10;

      if (finalY < PAGE_HEIGHT - 35) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.primary);

        doc.text("Résumé", MARGIN, finalY);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.muted);

        doc.text(
          `Total des membres enregistrés : ${data.length}`,
          MARGIN,
          finalY + 6,
        );
      }

      /* =========================================================
           EXPORT
        ========================================================= */

      doc.save(`liste_des_membres_${year}.pdf`);
    };

    img.onerror = () => {
      console.error("Impossible de charger le logo.");
    };
  };

  return (
    <span
      // type="button"
      onClick={generateReportPDF}
      className="inline-flex 
      items-center 
      rounded-lg 
      bg-green-800 
      px-6 
      py-2 
      text-xs 
      font-medium 
      text-white 
      transition 
      hover:bg-green-900 
      active:scale-95 
      cursor-pointer"
    >
      PDF
    </span>
  );
};

export default MemberPDF;
