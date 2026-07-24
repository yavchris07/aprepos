import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatNumber } from "../../utils/format-amount";
import { logoBase64 } from "../../utils/logo-parse";
import { PaymentItem } from "../../features/types";
import { FaFileDownload } from "react-icons/fa";

interface dataSets {
  data: PaymentItem[];
}

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const AhadiPaidReport = ({ data }: dataSets) => {
  const church = localStorage.getItem("eglise");
  const year = new Date().getFullYear();
  // console.log("DATA : ", data);

  // const dataWithSolde = data.reduce(
  //   (acc, d, index) => {
  //     const previousSolde = index === 0 ? 0 : acc[index - 1].solde;

  //     const montantIn = d.type_payement === "in" ? d.montant : 0;
  //     const montantOut = d.type_payement === "out" ? d.montant : 0;

  //     acc.push({
  //       ...d,
  //       solde: previousSolde + montantIn - montantOut,
  //     });

  //     return acc;
  //   },
  //   [] as Array<(typeof data)[0] & { solde: number }>,
  // );
  const generateAhadiPaidReportPDF = () => {
    const doc = new jsPDF();

    // Logo ECC centré
    doc.addImage(logoBase64, "PNG", 85, 10, 30, 30);

    // Texte après le logo
    doc.setFontSize(12);
    doc.text("ECC / 3è CBCA", 15, 55);
    doc.text("Département de Finances", 15, 61);
    doc.text("B.P 485 Goma / RDC", 15, 67);

    doc.setFontSize(14);
    doc.text("AHADI LIBEREES", 105, 55, { align: "center" });
    doc.setFontSize(11);
    doc.text("Page: ________", 160, 55);
    doc.text("N°: ________", 160, 61);
    doc.text("Mois de (d') ________", 105, 67, { align: "center" });

    // Date, nons, montant, type monaie,
    const head = [["Date", "Noms", "Montant", "Type monnaie"]];

    const body = data.map((item) => [
      new Date(item.date_payement).toLocaleDateString(),
      item.nom,
      formatNumber(item.montant),
      item.type_monaie === "usd" ? "$" : "FC",
    ]);

    // Total in & out
    // const totals = dataWithSolde.reduce(
    //   (acc, item) => {
    //     acc.totalIn += Number(item.montant);
    //     // if (item.type_payement === "in") {
    //     //   acc.totalIn += Number(item.montant);
    //     // } else {
    //     //   acc.totalOut += Number(item.montant);
    //     // }
    //     return acc;
    //   },
    //   { totalIn: 0, totalOut: 0 },
    // );

    autoTable(doc, {
      startY: 75,
      head: head,
      body: body,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [220, 220, 220] },
    });

    // const total = data.reduce((sum, d) => sum + Number(d.montant), 0);
    const lastAutoTable = (doc as JsPDFWithAutoTable).lastAutoTable;
    const finalY = (lastAutoTable?.finalY ?? 75) + 20;

    doc.setFont("helvetica", "bold");
    // doc.text("Résumé des totaux :", 60, finalY);

  

    autoTable(doc, {
      startY: finalY + 10,
      margin: { left: 60 },
      theme: "plain",
      styles: { fontSize: 10 },
      body: [
    
      ],
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
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      `© ${year} — Prosphora, Libertion ahadi mensuelle | ${church}`,
      70,
      pageHeight - 20,
    );

    doc.save(`Ahadi_mensuel${church}.pdf`);
  };
  return (
    <div className="download">
      {}
      <button
        onClick={generateAhadiPaidReportPDF}
        className="btn"
        title="Exporter en PDF"
      >
        <FaFileDownload />
      </button>
    </div>
  );
};

export default AhadiPaidReport;
