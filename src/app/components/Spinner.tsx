import React from "react";
import { z } from "zod";

const SpinnerSchema = z.object({
  size: z.number().optional().default(44),
  color: z.string().optional().default("#0078D4"),
});

type SpinnerProps = z.infer<typeof SpinnerSchema>;

export default function Spinner(props: SpinnerProps) {
  const { size, color } = SpinnerSchema.parse(props);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="absolute h-3 w-3 rounded-full"
          style={{
            backgroundColor: color,
            top: "50%",
            left: "50%",
            transform: `rotate(${index * 72}deg) translate(${size / 2 - 6}px) rotate(-${index * 72}deg)`,
            animation: `windows11Spin 4s ease-in-out infinite, windows11Fade 4s ease-in-out infinite ${
              index * 0.2
            }s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes windows11Spin {
          0% {
            transform: rotate(0deg) translate(${size / 2 - 6}px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translate(${size / 2 - 6}px)
              rotate(-360deg);
          }
        }
        @keyframes windows11Fade {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
