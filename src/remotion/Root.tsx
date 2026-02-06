import { Composition } from "remotion";
import "../app/globals.css";
import { TypeFast } from "../components/effects";
import { forwardRef, useEffect, useRef } from "react";

const Overlay = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="bg-blue-300 w-full">
      <div ref={ref} className="mx-auto p-5 my-5 w-fit">
        <TypeFast className="text-5xl bg-black text-[red]" />
      </div>
    </div>
  );
});

const MyComposition: React.FC = () => {
  return <Overlay />;
};

function findHeight() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  let height = 0;

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    height = overlay.offsetHeight;
  }, []);
  <Overlay ref={overlayRef} />;

  return height;
}

export const RemotionRoot: React.FC = () => {
  const height = findHeight();

  return (
    <Composition
      id="preview"
      component={MyComposition}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={height}
    />
  );
};
