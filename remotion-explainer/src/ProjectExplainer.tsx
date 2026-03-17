import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img } from "remotion";

interface Props {
  title: string;
  description: string;
  tech: string;
  imagePath: string;
}

export const ProjectExplainer: React.FC<Props> = ({ title, description, tech, imagePath }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleSpring = spring({ frame, fps, delay: 10 });
  const descSpring = spring({ frame, fps, delay: 30 });
  const techSpring = spring({ frame, fps, delay: 50 });
  const imageSpring = spring({ frame, fps, delay: 5 });

  const imageOpacity = interpolate(imageSpring, [0, 1], [0, 1]);
  const imageScale = interpolate(imageSpring, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill className="bg-[#fdfcf0] flex flex-col items-center justify-center p-12 font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB6C1]/20 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#87CEEB]/20 rounded-full -ml-40 -mb-40 blur-3xl" />

      {/* Project Image */}
      <div 
        style={{ 
          opacity: imageOpacity, 
          transform: `scale(${imageScale})`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
        }}
        className="w-full h-[60%] rounded-3xl overflow-hidden border-8 border-white mb-8"
      >
        <Img 
          src={imagePath} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Text Content */}
      <div className="w-full text-center">
        <h1 
          className="text-6xl font-black text-[#5a4a42] mb-4"
          style={{ transform: `translateY(${interpolate(titleSpring, [0, 1], [50, 0])}px)`, opacity: titleSpring }}
        >
          {title}
        </h1>
        
        <p 
          className="text-2xl text-[#7a6a62] max-w-2xl mx-auto mb-6"
          style={{ transform: `translateY(${interpolate(descSpring, [0, 1], [30, 0])}px)`, opacity: descSpring }}
        >
          {description}
        </p>

        <div 
          className="inline-block px-6 py-2 bg-[#E6E6FA] text-[#5a4a42] rounded-full font-bold text-xl"
          style={{ transform: `scale(${techSpring})`, opacity: techSpring }}
        >
          {tech}
        </div>
      </div>

      {/* Ghibli Quote Overlay */}
      <div className="absolute bottom-8 right-12 text-[#7a6a62]/40 italic text-lg">
        "The world is beautiful."
      </div>
    </AbsoluteFill>
  );
};
