import type { Metadata } from "next";
import { Saira } from "next/font/google";

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "S3 Seismic Clone",
  description: "S3 Seismic website clone",
};

export default function S3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={saira.className}>
      <style>{`
        .s3-root {
          --s3-turquoise: #13d8cb;
          --s3-orange: #ff6006;
          --s3-blue-dark: #233041;
          --s3-blue: #2b394c;
          --s3-blue-light: #364458;
          --s3-light: #f2f5f8;
          --s3-typo-blue: #4e5d73;
          --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
          --ease-in: cubic-bezier(0.12, 0, 0.39, 0);
          --ease-in-out: cubic-bezier(0.86, 0, 0.07, 1);
          --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
      <div className="s3-root">{children}</div>
    </div>
  );
}
