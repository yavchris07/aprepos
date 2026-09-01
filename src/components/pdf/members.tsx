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

    const COLORS = {
      primary: [5, 85, 39] as [number, number, number],
      secondary: [71, 22, 36] as [number, number, number],
      light: [243, 247, 244] as [number, number, number],
      border: [220, 225, 221] as [number, number, number],
      text: [45, 45, 45] as [number, number, number],
      muted: [110, 110, 110] as [number, number, number],
      white: [255, 255, 255] as [number, number, number],
      success: [220, 247, 231] as [number, number, number],
      successText: [22, 101, 52] as [number, number, number],
      danger: [254, 226, 226] as [number, number, number],
      dangerText: [185, 28, 28] as [number, number, number],
    };

    const img = new Image();
    img.src = "/logo.png";

    img.onload = () => {
      /* =========================================================
         HEADER
      ========================================================= */

      // Logo
      doc.addImage(img, "PNG", 15, 10, 25, 25);

      // Nom de l'organisation
      doc.setTextColor(...COLORS.primary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);

      doc.text("CEPARCREA", 45, 17);

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.muted);

      doc.text(
        "Coopérative d'épargne et crédit de l'amitié",
        45,
        23,
      );

      doc.text("Goma — République Démocratique du Congo", 45, 28);


      /* =========================================================
         TITRE
      ========================================================= */

      doc.setTextColor(...COLORS.secondary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);

      doc.text("LISTE DES MEMBRES", 105, 45, {
        align: "center",
      });


      /* =========================================================
         INFORMATIONS DU RAPPORT
      ========================================================= */

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.muted);

      doc.text(
        `Année : ${year}`,
        15,
        51,
      );

      doc.text(
        `Nombre de membres : ${data.length}`,
        195,
        51,
        {
          align: "right",
        },
      );


      /* =========================================================
         LIGNE DE COULEURS
      ========================================================= */

      doc.setFillColor(...COLORS.primary);
      doc.rect(15, 55, 181, 1.2, "F");

      doc.setFillColor(...COLORS.light);
      doc.rect(15, 56.2, 181, 1, "F");

      doc.setFillColor(...COLORS.secondary);
      doc.rect(15, 57.2, 181, 1, "F");


      /* =========================================================
         TABLEAU
      ========================================================= */

      const head = [
        [
          "#",
          "Nom complet",
          "Téléphone",
          "Adresse",
          "Type",
          "État",
        ],
      ];

      const body = data.map((item, index) => [
        index + 1,
        item.nom_complet ?? "—",
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

        margin: {
          left: 15,
          right: 15,
        },

        styles: {
          font: "helvetica",
          fontSize: 7.5,
          cellPadding: 2.5,
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

        columnStyles: {
          0: {
            halign: "center",
            cellWidth: 10,
          },

          1: {
            halign: "left",
            cellWidth: 40,
            fontStyle: "bold",
          },

          2: {
            halign: "left",
            cellWidth: 28,
          },

          3: {
            halign: "left",
            cellWidth: 42,
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
           PERSONNALISATION DES CELLULES
        ======================================================= */

        didParseCell(cellData) {

          if (
            cellData.section === "body" &&
            cellData.column.index === 5
          ) {
            const value = String(cellData.cell.raw).toLowerCase();

            if (
              value === "actif" ||
              value === "active"
            ) {
              cellData.cell.styles.fillColor = COLORS.success;
              cellData.cell.styles.textColor =
                COLORS.successText;

              cellData.cell.styles.fontStyle = "bold";
            }

            if (
              value === "inactif" ||
              value === "inactive"
            ) {
              cellData.cell.styles.fillColor = COLORS.danger;
              cellData.cell.styles.textColor =
                COLORS.dangerText;

              cellData.cell.styles.fontStyle = "bold";
            }
          }
        },


        /* =======================================================
           FOOTER DE CHAQUE PAGE
        ======================================================= */

        didDrawPage: () => {

          const pageHeight =
            doc.internal.pageSize.height;

          const pageWidth =
            doc.internal.pageSize.width;

          doc.setDrawColor(...COLORS.border);

          doc.line(
            15,
            pageHeight - 15,
            pageWidth - 15,
            pageHeight - 15,
          );

          doc.setFont("helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(...COLORS.muted);

          doc.text(
            `© ${year} — CEPARCREA`,
            15,
            pageHeight - 9,
          );

          doc.text(
            `Page ${doc.getNumberOfPages()}`,
            pageWidth - 15,
            pageHeight - 9,
            {
              align: "right",
            },
          );
        },
      });


      /* =========================================================
         RÉSUMÉ
      ========================================================= */

      const lastAutoTable =
        (doc as JsPDFWithAutoTable).lastAutoTable;

      const finalY =
        (lastAutoTable?.finalY ?? 75) + 10;


      // Vérifier qu'il reste suffisamment de place
      if (
        finalY <
        doc.internal.pageSize.height - 35
      ) {

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.primary);

        doc.text(
          "Résumé",
          15,
          finalY,
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.muted);

        doc.text(
          `Total des membres enregistrés : ${data.length}`,
          15,
          finalY + 6,
        );
      }


      /* =========================================================
         EXPORT
      ========================================================= */

      doc.save(
        `liste_membres_${year}.pdf`,
      );
    };


    img.onerror = () => {
      console.error(
        "Impossible de charger le logo.",
      );
    };
  };


  return (
    <button
      type="button"
      onClick={generateReportPDF}
      className="inline-flex items-center rounded-lg bg-green-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-green-900 active:scale-95"
    >
      PDF
    </button>
  );
};

export default MemberPDF;

