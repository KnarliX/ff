import { createRoot } from "react-dom/client";
import { VerificationPortal } from "@/pages/verification-portal";
import "@/styles/fonts.css";
import "@/styles/index.css";
import "aos/dist/aos.css";

createRoot(document.getElementById("root")!).render(
  <VerificationPortal />
);