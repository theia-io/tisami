// Providers.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
// import { AnalyticsContext, initAnalytics } from "./analytics";
import { DBContext, initDB } from "./db";

export function Providers({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState(initDB());
//   const [analytics, setAnalytics] = useState(initAnalytics());

  useEffect(() => {
    setDb(initDB());
    // setAnalytics(initAnalytics());
  }, []);

  return (
    <DBContext.Provider value={db}>
      {/* <AnalyticsContext.Provider value={analytics}> */}
        {children}
      {/* </AnalyticsContext.Provider> */}
    </DBContext.Provider>
  );
}
