import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (tableData: any[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text("Derma AI", doc.internal.pageSize.getWidth() / 2, 15, {
    align: "center",
  });

  // Add subtitle
  doc.setFontSize(12);
  doc.text("Total Users", doc.internal.pageSize.getWidth() / 2, 25, {
    align: "center",
  });

  const tableColumn = ["S.N", "User Name", "Email", "Joined", "Status"];
  const tableRows: any[] = [];

  tableData.forEach((user, index) => {
    const userData = [
      index + 1,
      user.name,
      user.email,
      user.created_at?.split("T")[0] || "",
      user.is_active ? "Active" : "Inactive",
    ];
    tableRows.push(userData);
  });

  // Move table down a little to avoid overlapping with title/subtitle
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 35, // table starts at y=35
  });

  doc.save("users.pdf");
};
