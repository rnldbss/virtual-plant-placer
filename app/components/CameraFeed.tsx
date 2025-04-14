import { useEffect, useRef, useState } from "react";

import { SwitchCamera } from "lucide-react";

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facingMode, setFacingMode] = useState<"user" | "enviroment">(
    "enviroment"
  );

  const startCamera = async (mode: "user" | "enviroment") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log(`"${mode}" mode not found`, err);
    }
  };

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "enviroment" : "user"));
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />
      <button
        onClick={toggleCamera}
        className="absolute w-max h-max top-4 right-4"
        type="button"
      >
        <SwitchCamera />
      </button>
    </>
  );
}
