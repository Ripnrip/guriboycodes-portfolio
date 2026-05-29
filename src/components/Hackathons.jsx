import React, { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge.jsx';
import { Spotlight } from '@/components/ui/spotlight.jsx';
import { AnimatedCounter } from '@/components/ui/animated-counter.jsx';
import { Trophy, MapPin, Calendar, Users, Tv, Globe, Code, Play, X, ChevronRight, Star, Sparkles } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const hackathons = [
  {
    id: 1,
    name: "MLH Prime @ Bloomberg",
    year: "2017",
    location: "London, UK",
    flag: "🇬🇧",
    award: "1st Place",
    awardIcon: "🥇",
    participants: "500+",
    project: "Automated Search & Rescue Drone",
    description: "Autonomous drone coordination system for disaster relief using DJI SDK. Featured on a BBC documentary.",
    longDescription: "Won first place among 500+ participants by creating an innovative drone software using the DJI SDK (Objective-C) to find people in disaster and relief situations. The project was hosted at Bloomberg in London and gained significant media attention, earning a feature in a BBC hackathon documentary.",
    technologies: ["Objective-C", "DJI SDK", "Drone Technology", "Emergency Response", "Computer Vision"],
    media: "BBC Documentary",
    ghibliImage: "/images/hackathons/drone-sar-ghibli.png",
    thumbnail: "/images/thumbnails/mlh-2017-drone-thumb.jpg",
    videoUrl: "/videos/mlh-2017-drone-bbc.mp4",
    videoTitle: "London Drone SAR — BBC Documentary (MLH Prime 2017)",
    featured: true,
    color: "from-yellow-500/20 to-orange-500/10",
    borderColor: "border-yellow-500/40",
    glowColor: "shadow-yellow-500/20",
  },
  {
    id: 2,
    name: "HackZurich 2022",
    year: "2022",
    location: "Zurich, Switzerland",
    flag: "🇨🇭",
    award: "1st Place",
    awardIcon: "🥇",
    participants: "400+",
    project: "Elevate — AR Passenger Experience",
    description: "AR passenger experience app — #1 winner of the Schindler challenge at Europe's largest hackathon.",
    longDescription: "Won the Schindler challenge at HackZurich 2022 — Europe's largest hackathon with 3,000+ participants. Built Elevate, an AR-powered passenger experience app that transforms elevator rides into immersive journeys using ARKit and real-time spatial computing.",
    technologies: ["ARKit", "Swift", "SwiftUI", "Core ML", "Spatial Computing"],
    media: "HackZurich Interview",
    ghibliImage: "/images/hackathons/ethereal-dimension-ghibli.png",
    thumbnail: "/images/thumbnails/hackzurich-2022-elate.jpg",
    videoUrl: "/videos/hackzurich-2021-aron.mp4",
    videoTitle: "HackZurich — Aron AI Fitness (2021/2022 Highlights)",
    featured: true,
    color: "from-blue-500/20 to-cyan-500/10",
    borderColor: "border-blue-500/40",
    glowColor: "shadow-blue-500/20",
  },
  {
    id: 3,
    name: "HackZurich 2021",
    year: "2021",
    location: "Zurich, Switzerland",
    flag: "🇨🇭",
    award: "Built Aron AI",
    awardIcon: "🏆",
    participants: "400+",
    project: "Aron — AI Fitness App",
    description: "AI-powered fitness app with ML body pose detection, AR markers, and Garmin wearable integration.",
    longDescription: "Built Aron at HackZurich 2021 — an AI fitness coach using CoreML for real-time body pose detection, ARKit for exercise markers, and Garmin SDK integration for wearable data. The app featured squat, pushup, and lunge detection with live form correction feedback.",
    technologies: ["Swift", "SwiftUI", "CoreML", "ARKit", "Garmin SDK", "CreateML"],
    media: "HackZurich Demo",
    ghibliImage: "/images/hackathons/aron-ai-fitness-ghibli.png",
    thumbnail: "/images/thumbnails/hackzurich-2021-aron-thumb.jpg",
    videoUrl: "/videos/hackzurich-2021-aron.mp4",
    videoTitle: "Aron AI Fitness — HackZurich 2021",
    featured: true,
    color: "from-green-500/20 to-emerald-500/10",
    borderColor: "border-green-500/40",
    glowColor: "shadow-green-500/20",
  },
  {
    id: 4,
    name: "HackZurich 2018",
    year: "2018",
    location: "Zurich, Switzerland",
    flag: "🇨🇭",
    award: "Finalist",
    awardIcon: "🏆",
    participants: "400+",
    project: "Carly — AR Car Configurator",
    description: "AR car configurator with voice commands, ARKit, CoreML, and Credit Suisse/AMAG APIs.",
    longDescription: "Made it to the finals at HackZurich 2018 creating Carly — an innovative AR tool to help people buy and configure cars using augmented reality. Featured in an interview with Credit Suisse showcasing the potential of AR in automotive retail. Integrated AMAG APIs for real vehicle data.",
    technologies: ["ARKit", "Swift", "CoreML", "Voice Commands", "Credit Suisse API"],
    media: "Credit Suisse Interview",
    ghibliImage: "/images/hackathons/carly-ar-car-ghibli.png",
    thumbnail: "/images/thumbnails/hackzurich-2018-carly-thumb.jpg",
    videoUrl: "/videos/hackzurich-2018-carly.mp4",
    videoTitle: "Carly AR Car Configurator — HackZurich 2018",
    featured: true,
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-500/40",
    glowColor: "shadow-purple-500/20",
  },
  {
    id: 5,
    name: "Devcamp NYC @ Google",
    year: "2016",
    location: "New York, USA",
    flag: "🇺🇸",
    award: "1st Place",
    awardIcon: "🥇",
    participants: "300+",
    project: "Talent Management App",
    description: "App for modeling agencies to interact with talent and customers. Held at Google NYC.",
    longDescription: "Won first place by building a comprehensive talent management application for modeling agencies to streamline interactions between agencies, talent, and customers. Held at Google NYC headquarters.",
    technologies: ["iOS", "Swift", "Backend APIs", "UI/UX"],
    media: "Google NYC Venue",
    thumbnail: "/images/thumbnails/mlh-2017-drone.jpg",
    featured: false,
    color: "from-red-500/20 to-pink-500/10",
    borderColor: "border-red-500/30",
    glowColor: "shadow-red-500/10",
  },
  {
    id: 6,
    name: "UPC Barcelona",
    year: "2016",
    location: "Barcelona, Spain",
    flag: "🇪🇸",
    award: "Open Source",
    awardIcon: "🌟",
    participants: "250+",
    project: "Refugee Crowdsourcing App",
    description: "Crowdsourcing app with pinned locations for safety, danger, and help for refugees.",
    longDescription: "Built a crowdsourcing app with local whereabouts for refugees — pinned locations for safety, danger, and help. The project was open-sourced on GitHub to help the refugee community.",
    technologies: ["Mobile", "Crowdsourcing", "Social Impact", "Open Source"],
    media: "GitHub Open Source",
    featured: false,
    color: "from-orange-500/20 to-yellow-500/10",
    borderColor: "border-orange-500/30",
    glowColor: "shadow-orange-500/10",
  },
  {
    id: 7,
    name: "Copenhacks @ Microsoft",
    year: "2017",
    location: "Copenhagen, Denmark",
    flag: "🇩🇰",
    award: "Participant",
    awardIcon: "🚀",
    participants: "200+",
    project: "Innovation Project",
    description: "Innovative tech solution at Microsoft Copenhagen campus.",
    longDescription: "Participated in Copenhacks held at Microsoft in Copenhagen, Denmark, working on innovative technology solutions and networking with international developers.",
    technologies: ["Various", "Innovation", "Microsoft Technologies"],
    media: "Microsoft Venue",
    featured: false,
    color: "from-sky-500/20 to-blue-500/10",
    borderColor: "border-sky-500/30",
    glowColor: "shadow-sky-500/10",
  },
  {
    id: 8,
    name: "HackNY @ NYU",
    year: "2016",
    location: "New York, USA",
    flag: "🇺🇸",
    award: "Participant",
    awardIcon: "🚀",
    participants: "400+",
    project: "NYC Innovation",
    description: "Premier NYC hackathon at New York University.",
    longDescription: "Participated in one of NYC's premier hackathons held at New York University, focusing on innovative solutions for urban challenges and technology advancement.",
    technologies: ["Web", "Mobile", "Urban Tech"],
    media: "NYU Venue",
    featured: false,
    color: "from-violet-500/20 to-purple-500/10",
    borderColor: "border-violet-500/30",
    glowColor: "shadow-violet-500/10",
  },
];

// ─── Award Badge Styles ───────────────────────────────────────────────────────

const getAwardStyle = (award) => {
  if (award === '1st Place') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
  if (award.includes('Finalist') || award.includes('Built')) return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  if (award === 'Open Source') return 'bg-green-500/20 text-green-300 border-green-500/40';
  return 'bg-white/10 text-white/60 border-white/20';
};

// ─── Video Player Modal ───────────────────────────────────────────────────────

const VideoModal = ({ video, onClose }) => {
  const videoRef = useRef(null);
  if (!video) return null;
  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-primary/20"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Video */}
        <div className="aspect-video bg-black">
          <video
            ref={videoRef}
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            playsInline
          />
        </div>

        {/* Info bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-black/80 to-primary/10 border-t border-primary/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{video.flag}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{video.videoTitle || video.project}</h3>
              <p className="text-sm text-white/60">{video.name} · {video.location} · {video.year}</p>
            </div>
            <span className={`ml-auto text-xs px-3 py-1 rounded-full border font-semibold ${getAwardStyle(video.award)}`}>
              {video.awardIcon} {video.award}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Hackathon Detail Modal ───────────────────────────────────────────────────

const DetailModal = ({ hackathon, onClose, onPlayVideo }) => {
  if (!hackathon) return null;
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-br ${hackathon.color} backdrop-blur-xl border ${hackathon.borderColor} rounded-2xl overflow-hidden max-h-[85vh] overflow-y-auto shadow-2xl ${hackathon.glowColor}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
        >
          <X size={16} className="text-white" />
        </button>

        {/* Ghibli Image */}
        {hackathon.ghibliImage && (
          <div className="relative h-52 overflow-hidden">
            <img
              src={hackathon.ghibliImage}
              alt={hackathon.project}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="text-3xl">{hackathon.flag}</span>
              <span className={`text-xs px-3 py-1 rounded-full border font-bold badge-shiny ${getAwardStyle(hackathon.award)}`}>
                {hackathon.awardIcon} {hackathon.award}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{hackathon.name} {hackathon.year}</h3>
            <p className="text-sm text-white/60 flex items-center gap-2">
              <MapPin size={14} /> {hackathon.location}
              {hackathon.participants && <><Users size={14} className="ml-2" /> {hackathon.participants} participants</>}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white/90 mb-2">{hackathon.project}</h4>
            <p className="text-sm text-white/70 leading-relaxed">{hackathon.longDescription}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {hackathon.technologies.map((tech, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
                {tech}
              </span>
            ))}
          </div>

          {hackathon.media && (
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Tv size={14} />
              <span>Media: {hackathon.media}</span>
            </div>
          )}

          {/* Play Video Button */}
          {hackathon.videoUrl && (
            <button
              onClick={() => { onClose(); onPlayVideo(hackathon); }}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-200 hover:scale-[1.02] group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Play size={14} className="text-white fill-white ml-0.5" />
              </div>
              Watch Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Featured Card ────────────────────────────────────────────────────────────

const FeaturedCard = ({ hackathon, onSelect, onPlayVideo }) => (
  <Spotlight>
    <div
      className={`group relative rounded-2xl overflow-hidden border ${hackathon.borderColor} bg-gradient-to-br ${hackathon.color} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${hackathon.glowColor}`}
      onClick={() => onSelect(hackathon)}
    >
      {/* Ghibli / Thumbnail Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hackathon.ghibliImage || hackathon.thumbnail}
          alt={hackathon.project}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play button overlay (only if has video) */}
        {hackathon.videoUrl && (
          <button
            onClick={e => { e.stopPropagation(); onPlayVideo(hackathon); }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-110 transition-transform">
              <Play size={24} className="text-white fill-white ml-1" />
            </div>
          </button>
        )}

        {/* Award badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-bold backdrop-blur-sm badge-shiny ${getAwardStyle(hackathon.award)}`}>
            {hackathon.awardIcon} {hackathon.award}
          </span>
        </div>

        {/* Flag */}
        <div className="absolute bottom-3 left-3 text-2xl">{hackathon.flag}</div>

        {/* Video indicator */}
        {hackathon.videoUrl && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
            <Tv size={10} />
            <span>Video</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1">{hackathon.name}</h3>
        <p className="text-xs text-white/50 flex items-center gap-2 mb-3">
          <MapPin size={11} /> {hackathon.location} · {hackathon.year}
        </p>
        <p className="text-sm font-semibold text-white/90 mb-2">{hackathon.project}</p>
        <p className="text-xs text-white/60 leading-relaxed line-clamp-2">{hackathon.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {hackathon.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/15">
              {tech}
            </span>
          ))}
          {hackathon.technologies.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50 border border-white/15">
              +{hackathon.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Users size={11} />
            <span>{hackathon.participants}</span>
          </div>
          <span className="text-xs text-primary/80 flex items-center gap-1 group-hover:gap-2 transition-all">
            Details <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </div>
  </Spotlight>
);

// ─── Video Reel Section ───────────────────────────────────────────────────────

const VideoReel = ({ onPlayVideo }) => {
  const videos = hackathons.filter(h => h.videoUrl && h.thumbnail);
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-center mb-2"><span className="text-shimmer-slow">Featured Media</span></h3>
      <p className="text-center text-foreground/50 text-sm mb-8">Click any card to watch the video</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map(h => (
          <div
            key={h.id}
            className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-[1.03]"
            onClick={() => onPlayVideo(h)}
          >
            <div className="relative aspect-video bg-black/50">
              <img
                src={h.thumbnail}
                alt={h.project}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                onError={e => { e.target.style.background = '#1a1a2e'; e.target.style.display = 'block'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                  <Play size={18} className="text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Flag */}
              <div className="absolute top-2 left-2 text-lg">{h.flag}</div>
            </div>

            <div className="p-3 bg-black/40 backdrop-blur-sm">
              <p className="text-xs font-semibold text-white line-clamp-1">{h.project}</p>
              <p className="text-[10px] text-white/50 mt-0.5">{h.name} · {h.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Easter Egg */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => onPlayVideo({
            flag: '✨',
            award: 'Easter Egg',
            awardIcon: '🎉',
            project: 'Working With Me',
            name: 'Behind the Scenes',
            location: 'Everywhere',
            year: '2024',
            videoUrl: '/videos/working-with-me.mp4',
            videoTitle: 'What it\'s like working with me 😄',
            thumbnail: null,
            technologies: [],
            color: 'from-pink-500/20 to-purple-500/10',
            borderColor: 'border-pink-500/40',
            glowColor: 'shadow-pink-500/20',
          })}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 hover:border-primary/60 text-foreground/70 hover:text-foreground transition-all duration-300 hover:scale-105"
        >
          <Sparkles size={16} className="text-primary group-hover:animate-spin" />
          <span className="text-sm font-medium">Click to preview what it's like working with me</span>
          <Sparkles size={16} className="text-accent group-hover:animate-spin" />
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Hackathons = () => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  const featured = hackathons.filter(h => h.featured);
  const others = hackathons.filter(h => !h.featured);

  const stats = [
    { label: "Total Hackathons", value: 28, suffix: "+", icon: <Code className="h-5 w-5" /> },
    { label: "Countries Visited", value: 6, suffix: "+", icon: <Globe className="h-5 w-5" /> },
    { label: "1st Place Wins", value: 2, suffix: "", icon: <Trophy className="h-5 w-5" /> },
  ];

  return (
    <section id="hackathons" className="py-20 px-6 md:px-8 bg-hero-gradient">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-animated">Hackathon Journey</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            28+ hackathons across the globe — from NYC to Barcelona, London to Zurich.
            Building innovative solutions, winning competitions, and inspiring communities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <Spotlight key={index}>
              <div className="glass rounded-2xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="text-primary mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-shimmer mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-foreground/50">{stat.label}</div>
              </div>
            </Spotlight>
          ))}
        </div>

        {/* Featured Hackathon Cards with Ghibli Art */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-2"><span className="text-shimmer-slow">Featured Achievements</span></h3>
          <p className="text-center text-foreground/50 text-sm mb-8">Click any card for details · hover for video preview</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(h => (
              <FeaturedCard
                key={h.id}
                hackathon={h}
                onSelect={setSelectedHackathon}
                onPlayVideo={setPlayingVideo}
              />
            ))}
          </div>
        </div>

        {/* Video Reel */}
        <VideoReel onPlayVideo={setPlayingVideo} />

        {/* Other Hackathons */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8"><span className="text-shimmer-slow">More Hackathons</span></h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map(h => (
              <Spotlight key={h.id}>
                <div
                  className={`group rounded-xl p-4 border ${h.borderColor} bg-gradient-to-br ${h.color} cursor-pointer hover:scale-[1.02] transition-all duration-300`}
                  onClick={() => setSelectedHackathon(h)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{h.flag}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getAwardStyle(h.award)}`}>
                      {h.awardIcon} {h.award}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{h.name}</h4>
                  <p className="text-xs text-white/50 mb-2">{h.location} · {h.year}</p>
                  <p className="text-xs text-primary/80 font-medium">{h.project}</p>
                </div>
              </Spotlight>
            ))}
          </div>
        </div>

      </div>

      {/* Modals */}
      <DetailModal
        hackathon={selectedHackathon}
        onClose={() => setSelectedHackathon(null)}
        onPlayVideo={setPlayingVideo}
      />
      <VideoModal
        video={playingVideo}
        onClose={() => setPlayingVideo(null)}
      />
    </section>
  );
};

export default Hackathons;
