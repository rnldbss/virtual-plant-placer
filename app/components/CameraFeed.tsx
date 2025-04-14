import { useEffect, useRef, useState } from "react";

import { SwitchCamera, ArrowBigLeft, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

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
      <div className="flex items-center justify-between fixed top-4 left-4 w-[calc(100%-32px)] z-20">
        <Link to={"/"} className="block bg-accent p-1 rounded-md text-level-0">
          <ArrowLeft />
        </Link>
        <button
          onClick={toggleCamera}
          type="button"
          className="block bg-accent p-1 rounded-md text-level-0 cursor-pointer"
        >
          <SwitchCamera />
        </button>
      </div>
    </>
  );
}
