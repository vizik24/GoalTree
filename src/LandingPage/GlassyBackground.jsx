import './GlassyBackground.css';

export default function GlassyBackground({ children }) {
    return (

      <div className="relative w-full min-h-screen overflow-hidden">
      {/* Animated gradient background */}
        <div className="absolute inset-0 gradient-background -z-10 h-5/20"></div>

        {/* Solid white to transparent (to top) overlay */}
        <div className="absolute inset-0 h-5/20 z-0 bg-gradient-to-t from-base-100 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
