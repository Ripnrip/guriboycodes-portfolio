import "./index.css";
import { Composition } from "remotion";
import { ProjectExplainer } from "./ProjectExplainer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Explainer"
        component={ProjectExplainer}
        durationInFrames={150} // 5 seconds @ 30fps
        fps={30}
        width={1080}
        height={1350} // Social media aspect ratio
        defaultProps={{
          title: "Flow",
          description: "Dynamic Island iOS app — beautiful, recent, uniquely Apple",
          tech: "Swift / SwiftUI",
          imagePath: "http://localhost:5173/projects/project-1.png"
        }}
      />
    </>
  );
};
