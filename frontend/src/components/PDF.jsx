import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Set the workerSrc property
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 10,
    
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 2,
  },
});

const PDF = ({ url }) => {
  const [pdfText, setPdfText] = useState("");
  

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const loadingTask = getDocument({
          url,
          httpHeaders: { mode: "no-cors" },
        });
        const pdf = await loadingTask.promise;
        let textContent = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          textContent += text.items.map((item) => item.str).join(" ");
        }

        setPdfText(textContent);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, [url]);

  return (
    <PDFViewer width="100%" height="600">
      <Document loading="Loading PDF...">
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{pdfText}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDF;
