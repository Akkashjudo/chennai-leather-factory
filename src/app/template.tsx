"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { ease } from "@/lib/motion";

// The first render (the server-rendered page) must not start hidden — that would
// delay LCP. Only client-side route changes get the light entrance.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);
  return (
    <m.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </m.div>
  );
}
