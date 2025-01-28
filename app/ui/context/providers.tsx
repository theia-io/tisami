// Providers.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
// import { AnalyticsContext, initAnalytics } from "./analytics";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DBContext, initDB } from "./db";

export function Providers({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState(initDB());
  //   const [analytics, setAnalytics] = useState(initAnalytics());

  useEffect(() => {
    setDb(initDB());
    // setAnalytics(initAnalytics());
  }, []);

  const [session, setSessions] = useState<Session | null>(null);

  // getServerSession(authOptions).then((session) => {
  //   console.log("SESSION", session);
  //   setSessions(session);
  // });

  return (
    // <SessionProvider session={session}>
      <DBContext.Provider value={db}>
        {/* <AnalyticsContext.Provider value={analytics}> */}
        {children}
        {/* </AnalyticsContext.Provider> */}
      </DBContext.Provider>
    // </SessionProvider>
  );
}
