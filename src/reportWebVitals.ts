const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (!onPerfEntry || typeof onPerfEntry !== "function") return;

  import("web-vitals").then((wv) => {
    // akses fungsi dari properti modul
    (wv as any).getCLS(onPerfEntry);
    (wv as any).getFID(onPerfEntry);
    (wv as any).getFCP(onPerfEntry);
    (wv as any).getLCP(onPerfEntry);
    (wv as any).getTTFB(onPerfEntry);
  });
};

export default reportWebVitals;
