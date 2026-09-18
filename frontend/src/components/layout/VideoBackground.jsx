// import React from "react";

// function VideoBackground() {
//   return (
//     <div className="site-video-background">
//       <video
//         className="site-video-background__video"
//         autoPlay
//         muted
//         loop
//         playsInline
//         preload="auto"
//       >
//         <source
//           src="/assets/langloop-background.mp4"
//           type="video/mp4"
//         />
//       </video>

//       <div className="site-video-background__overlay" />
//       <div className="site-video-background__purple-glow" />
//     </div>
//   );
// }

// export default VideoBackground;
import React from "react";

function VideoBackground() {
  return (
    <div
      className="site-video-background"
      aria-hidden="true"
    >
      <video
        className="site-video-background__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/assets/langloop-background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="site-video-background__overlay" />

      <div className="site-video-background__purple-glow" />
    </div>
  );
}

export default VideoBackground;