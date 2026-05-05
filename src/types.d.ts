declare module 'jspdf' {
    interface jsPDF {
      lastAutoTable?: {
        finalY: number;
      };
      autoTable?: (options: any) => jsPDF;
    }
  }

declare module '*.webp' {
  const src: any;
  export default src;
}