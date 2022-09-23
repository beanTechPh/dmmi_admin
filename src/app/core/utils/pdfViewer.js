import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';

  
export default function PDFViewer(props) {
      
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
    
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  return (
    <div className="pdf">
      <Document file={props.url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({length: numPages}, (_, i) => i + 1).map( num => <Page pageNumber={num} key={num} />)}
      </Document>
    </div>
  );
}