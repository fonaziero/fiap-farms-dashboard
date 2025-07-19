import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToCSV(filename: string, data: Record<string, any>[]) {
    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','), // cabeçalho
        ...data.map(row => headers.map(field => JSON.stringify(row[field] ?? '')).join(','))
    ].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
}

export function exportToPDF(filename: string, data: Record<string, any>[]) {
    const doc = new jsPDF();
    const headers = [Object.keys(data[0])];
    const rows = data.map(row => headers[0].map(key => row[key]));

    autoTable(doc, {
        head: headers,
        body: rows,
    });

    doc.save(`${filename}.pdf`);
}
