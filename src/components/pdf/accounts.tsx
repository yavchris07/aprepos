import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Account } from "../../utlis/type";

interface dataSets {
  data: Account[];
}

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const AccountPDF = ({ data }: dataSets) => {
  const year = new Date().getFullYear();

  const generateReportPDF = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = "/logo.png";

    img.onload = () => {
      // Logo
      doc.addImage(img, "PNG", 15, 10, 27, 27);

      // Texte après le logo
      doc.setFontSize(10);
      doc.text("CEPARCREA / Goma", 15, 45);
      doc.text("Coopérative", 15, 49);

      doc.setFontSize(10);
      doc.text("LISTE DE COMPTES", 105, 45, { align: "center" });
      doc.setFontSize(8);
      // ID	Membre	Numero compte	Balance
      const head = [["ID", "Noms", "Numéro compte", "Balance"]];

      const body = data.map((item) => {
         
        return [
          item.id,
          item.membre_nom,
          item.numero_compte,
          item.balance
        ];
      });


      const COLORS = {
        gold: [212, 175, 55] as [number, number, number],
        dark: [40, 40, 40] as [number, number, number],
        light: [248, 248, 248] as [number, number, number],
        border: [210, 210, 210] as [number, number, number],
        text: [70, 70, 70] as [number, number, number],
      };

      autoTable(doc, {
        startY: 55,
        head,
        body,
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 2,
          textColor: COLORS.text,
          lineColor: COLORS.border,
          lineWidth: 0.2,
          valign: "middle",
        },

        headStyles: {
          fillColor: COLORS.dark,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
          fontSize: 10,
        },

        bodyStyles: {
          fillColor: [255, 255, 255],
        },

        alternateRowStyles: {
          fillColor: COLORS.light,
        },

        columnStyles: {
          0: { halign: "center" },
          1: { halign: "left" },
          2: { halign: "center" },
          3: { halign: "right" },
          4: { halign: "center" },
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
      doc.text(
        `© ${year} — CEPARCREA | Alt Space`,
        75,
        pageHeight - 20,
      );

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
      Liste comptes épargne
    </span>
  );
};

export default AccountPDF;
