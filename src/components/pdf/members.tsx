import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Member } from "../../utlis/type";

interface dataSets {
  data: Member[];
}
interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const MemberPDF = ({ data }: dataSets) => {
  const year = new Date().getFullYear();

  const generateReportPDF = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = "/logo.png";
    const COLORS = {
      primary: [5, 85, 39] as [number, number, number], // Vert CEPARCREA
      secondary: [71, 22, 36] as [number, number, number], // Bordeaux
      light: [243, 247, 244] as [number, number, number], // Fond des lignes
      border: [211, 215, 210] as [number, number, number], // Bordures
      text: [40, 40, 40] as [number, number, number], // Texte
      white: [255, 255, 255] as [number, number, number], // Blanc
    };

    img.onload = () => {
      // Logo
      doc.addImage(img, "PNG", 15, 10, 27, 27);

      // Texte après le logo
      doc.setFontSize(10);
      doc.text("CEPARCREA / Goma", 15, 45);
      doc.text("Coopérative", 15, 49);

      doc.setFontSize(10);
      doc.text("LISTE DE MEMBRES", 105, 45, { align: "center" });
      doc.setFontSize(8);

      doc.setFillColor(...COLORS.primary);
      doc.rect(15, 51, 181, 1, "F");
      doc.setFillColor(...COLORS.light);
      doc.rect(15, 52, 181, 1, "F");
      doc.setFillColor(...COLORS.secondary);
      doc.rect(15, 53, 181, 1, "F");
      // ID			Adresse	Type de membre	Etat
      const head = [
        ["ID", "Nom complet", "Téléphone", "Adresse", "Type", "Etat"],
      ];

      const body = data.map((item) => {
        return [
          item.id ?? "",
          item.nom_complet ?? "",
          item.phone ?? "",
          item.adresse ?? "",
          item.type_member ?? "",
          item.status ?? "",
        ];
      });

      autoTable(doc, {
        startY: 55,
        head,
        body,
        theme: "grid",

        styles: {
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
          halign: "center",
          valign: "middle",
          fontSize: 9,
        },

        bodyStyles: {
          fillColor: COLORS.white,
        },

        alternateRowStyles: {
          fillColor: COLORS.light,
        },

        columnStyles: {
          0: { halign: "center" }, // Date
          1: { halign: "center" }, // Numéro
          2: { halign: "left" }, // Libellé
          3: { halign: "center" }, // Type
          4: { halign: "right" }, // Montant
          5: { halign: "right" }, // Solde
        },

        didParseCell(data) {
          // Mettre en évidence la colonne Montant
          if (data.section === "body" && data.column.index === 4) {
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.textColor = COLORS.secondary;
          }

          // Mettre encore plus en évidence le Solde
          if (data.section === "body" && data.column.index === 5) {
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.textColor = COLORS.primary;
          }
        },
      });

      // const total = data.reduce((sum, d) => sum + Number(d.montant), 0);
      const lastAutoTable = (doc as JsPDFWithAutoTable).lastAutoTable;
      const finalY = (lastAutoTable?.finalY ?? 75) + 20;

      // new

      doc.setFont("helvetica", "bold");
      // doc.text("Résumé des totaux :", 60, finalY);

      autoTable(doc, {
        startY: finalY + 10,
        margin: { left: 60 },
        theme: "plain",
        styles: { fontSize: 10 },
        body: [],
        didParseCell: function (data) {
          const raw = data.row.raw;
          if (Array.isArray(raw) && String(raw[0]) === "Solde :") {
            data.cell.styles.fontSize = 11;
            data.cell.styles.fontStyle = "bold";
          }
        },
      });

      // === PIED DE PAGE ===
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(7);
      doc.setTextColor(120);
      doc.text(`© ${year} — CEPARCREA | Alt Space`, 75, pageHeight - 20);

      doc.save(`list_compte_epargne.pdf`);
    };
    img.onerror = () => {
      console.error("Impossible de charger le logo.");
    };
  };
  return (
    <span
      className="bg-green-800 py-2 px-4 rounded text-xs text-white cursor-pointer"
      onClick={generateReportPDF}
    >
      PDF
    </span>
  );
};

export default MemberPDF;
