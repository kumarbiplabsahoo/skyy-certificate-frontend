// import styles from "./templete.module.css";
// import CertImage from "../../assets/svg/PGP.png";
// import { useRef, useEffect } from "react";

// export default function PGPTemp({ 
//   zoom, 
//   position, 
//   isDragging,
//   activeCSS,
//   textContent,
//   fontStyles,
//   textColor,
//   fontFamily
// }) {
//   const containerRef = useRef(null);
//   const overlayRef = useRef(null);

//   useEffect(() => {
//     if (containerRef.current && overlayRef.current) {
//       // Center the transform origin based on container dimensions
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       overlayRef.current.style.transformOrigin = `${width/2}px ${height/2}px`;
//     }
//   }, []);

//   // Combine dynamic CSS with passed styles
//   const combinedCSS = `
//     ${activeCSS}
//     .text-overlay {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       pointer-events: none;
//     }
    
//     .student-name, .course-name, .completion-date, 
//     .certificate-number, .signature {
//       font-family: ${fontFamily || 'Arial'};
//       color: ${textColor || '#000000'};
//       font-weight: ${fontStyles?.bold ? 'bold' : 'normal'};
//       font-style: ${fontStyles?.italic ? 'italic' : 'normal'};
//       text-decoration: ${fontStyles?.underline ? 'underline' : 'none'};
//       transform-origin: center center;
//     }
//   `;

//   return (
//     <div 
//       ref={containerRef}
//       className={styles.container}
//       style={{
//         overflow: 'hidden',
//         position: 'relative',
//         width: '100%',
//         height: '100%'
//       }}
//     >
//       <style>{combinedCSS}</style>
//       <div
//         ref={overlayRef}
//         style={{
//           transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
//           willChange: 'transform',
//           transition: 'transform 0.1s ease-out'
//         }}
//       >
//         <img
//           src={CertImage}
//           alt="pgpcert"
//           className={styles.certificateImage}
//           style={{
//             width: '100%',
//             height: 'auto',
//             display: 'block',
//             cursor: isDragging ? "grabbing" : "grab",
//           }}
//         />
//         <div 
//           className="text-overlay"
//           dangerouslySetInnerHTML={{ __html: textContent }}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%'
//           }}
//         />
//       </div>
//     </div>
//   );
// }