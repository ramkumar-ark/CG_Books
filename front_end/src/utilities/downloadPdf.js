import { pdf } from "@react-pdf/renderer";

export const downloadPdf = async (Document, documentData) => {
    // Create a new PDF document
    const doc = Document(documentData);
  
    // Generate a blob from the PDF document
    const blob = await pdf(doc).toBlob();
  
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
  
    // Open a new window or tab to display the PDF
    const previewWindow = window.open(url, '_blank');
    
    // Remove the URL object when the window is closed
    previewWindow.addEventListener('beforeunload', () => URL.revokeObjectURL(url));
};