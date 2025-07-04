import { useSectionContext } from "@/context/SectionScopeProvider";
import { useEffect, useRef } from "react";

const Video = ({
  playOnFragment,
  playbackRate,
  ...props
}: React.VideoHTMLAttributes<HTMLVideoElement> & {
  playOnFragment?: number;
  playbackRate?: number;
}) => {
  const { isPresent, fragment } = useSectionContext();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate || 1;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (isPresent && fragment === playOnFragment && videoRef.current) {
      videoRef.current.play();
    } else if (
      (videoRef.current &&
        playOnFragment !== undefined &&
        fragment < playOnFragment) ||
      (!isPresent && videoRef.current)
    ) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isPresent, fragment, playOnFragment]);

  return (
    <video
      ref={videoRef}
      src={props.src}
      className={props.className}
      loop={props.loop}
      muted={props.muted}
      {...props}
    />
  );
};

export default Video;
