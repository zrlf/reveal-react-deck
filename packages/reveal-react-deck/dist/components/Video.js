import { jsx as _jsx } from "react/jsx-runtime";
import { useSectionContext } from "../context/SectionScopeProvider.js";
import { useEffect, useRef } from "react";
const Video = ({ playOnFragment, playbackRate, ...props }) => {
    const { isPresent, fragment } = useSectionContext();
    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate || 1;
        }
    }, [playbackRate]);
    useEffect(() => {
        if (isPresent && fragment === playOnFragment && videoRef.current) {
            videoRef.current.play();
        }
        else if ((videoRef.current &&
            playOnFragment !== undefined &&
            fragment < playOnFragment) ||
            (!isPresent && videoRef.current)) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isPresent, fragment, playOnFragment]);
    return (_jsx("video", { ref: videoRef, src: props.src, className: props.className, loop: props.loop, muted: props.muted, ...props }));
};
export default Video;
