import { useState, useEffect } from "react";
import { copyStatusSchema } from "./../utils/schemas";
import { z } from "zod";

type CopyStatus = z.infer<typeof copyStatusSchema>;

export const useCopyStatus = () => {
  const [status, setStatus] = useState<CopyStatus>(
    copyStatusSchema.parse({
      message: "",
      type: "idle",
    }),
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (status.type === "success" || status.type === "error") {
      timeout = setTimeout(() => {
        setStatus(copyStatusSchema.parse({ message: "", type: "idle" }));
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [status.type]);

  const setCopySuccess = (message: string) => {
    setStatus(copyStatusSchema.parse({ message, type: "success" }));
  };

  const setCopyError = (message: string) => {
    setStatus(copyStatusSchema.parse({ message, type: "error" }));
  };

  return { status, setCopySuccess, setCopyError };
};
