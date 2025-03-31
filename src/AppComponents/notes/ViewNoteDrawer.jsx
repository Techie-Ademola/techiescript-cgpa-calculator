import React, { useState, useEffect, useRef } from "react";
import { copyToClipboard } from "../../utils/index";
import html2pdf from 'html2pdf.js';
import { toast } from "sonner";

const ViewNoteDrawer = ({
  isOpen,
  onClose,
  title,
  body,
  createdAt,
  image,
  archived,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef(null);

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
      const element = contentRef.current;
      
      // Configure PDF options with optimized image handling
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5], // smaller margins for better space usage
        filename: `${title.replace(/\s+/g, '_')}_note.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2,
          useCORS: true, // Enable CORS for external images
          logging: false,
          letterRendering: true,
          imageTimeout: 0, // Wait for images to load
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4',
          orientation: image ? 'portrait' : 'portrait', // Adjust based on image presence
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Add temporary PDF export class
      element.classList.add('pdf-export');

      // Generate and save PDF
      await html2pdf().set(opt).from(element).save();
      
      // Cleanup
      element.classList.remove('pdf-export');
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className={`history-drawer ${isOpen ? "opened" : ""}`}>
        <div
          className="drawer-header border-bottom mb-4 pb-2 position-sticky"
          style={{ top: "0", background: "#1a1a1a" }}
        >
          <h4>Note Details</h4>

          <div className="d-flex align-items-center">
            <div
              className="copy_icon mb-0 mr-3"
              onClick={() => copyToClipboard(`${title} \n\n${body}`)}
            >
              <i className="bi bi-copy text-white"></i>
            </div>
            <div
              className="copy_icon mb-0 mr-3"
              onClick={exportToPDF}
              title="Export as PDF"
              style={{ cursor: isExporting ? 'not-allowed' : 'pointer' }}
            >
              <i className={`bi ${isExporting ? 'bi-hourglass-split' : 'bi-send-check'} text-white`} title="Export to PDF"></i>
            </div>
            <button
              onClick={onClose}
              className="close_drawer btn btn-sm text-white"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>

        {/* Content to be exported as PDF */}
        <div ref={contentRef} className="pdf-content">
          <div className="note-header">
            <h2 className="note-title text-white">{title}</h2>
            {archived && (
              <span className="archived_badge">
                Archived
              </span>
            )}
            <p className="note-date">
              <small>{createdAt}</small>
            </p>
          </div>

          {image && (
            <div className="note-image">
              <img src={image} className="w-100 img-responsive img-fluid" alt="" />
            </div>
          )}

          <div className="note-body">
            <pre
              style={{
                textWrap: "wrap",
                lineHeight: "2",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
              className="text-muted text-left"
            >
              {body}
            </pre>
          </div>
        </div>
      </div>

      {/* Add CSS for PDF export */}
      <style>
        {`
          .pdf-export {
            background: white !important;
            color: black !important;
            padding: 0px !important;
          }

          .pdf-export .note-title,
          .pdf-export .note-body pre
           {
            color: black !important;
          }

          .pdf-content {
            max-width: 100%;
            margin: 0 auto;
          }

          .note-header {
            text-align: center;
            margin-bottom: 20px;
          }

          .note-title {
            font-size: 24px;
            margin-bottom: 10px;
            color: inherit;
          }

          .note-date {
            color: #666;
            font-style: italic;
          }

          .note-image {
            margin: 20px 0;
            text-align: center;
          }

          .note-image img {
            max-width: 100%;
            height: auto;
            margin: 0 auto;
          }

          .note-body {
            margin-top: 20px;
            line-height: 1.6;
          }

          .archived_badge {
            display: inline-block;
            padding: 4px 8px;
            background-color: #ffd700;
            color: #000;
            border-radius: 4px;
            font-size: 12px;
            margin-left: 10px;
          }

          @media print {
            .pdf-content {
              padding: 20px;
            }

            .note-body pre {
              white-space: pre-wrap !important;
              word-wrap: break-word !important;
              font-family: inherit !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ViewNoteDrawer;
