import { ArrowRight, MousePointer2, Cpu, Factory, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center relative px-6 py-12 md:py-24">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full flex flex-col items-center z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-cyber-blue" />
            <h2 className="text-cyber-blue font-semibold uppercase tracking-wider text-sm md:text-base">
              Pioneering the Future of Automation
            </h2>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Aiotics<span className="text-cyber-blue">.</span>
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
            Integrating advanced AI with IoT to automate mechanical and high-risk industrial tasks. We build intelligent systems that work for you.
          </p>
          
          <Link to="/apply" className="inline-block">
            <button className="btn-primary flex items-center gap-3 text-lg px-10 py-4 group">
              Apply Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
          {/* Card 1 */}
          <div className="glass-card p-8 group hover:border-cyber-blue/30 transition-all cursor-default">
            <div className="bg-cyber-darker p-4 rounded-xl inline-block mb-6 border border-white/5 group-hover:border-cyber-blue/20">
              <Cpu className="w-8 h-8 text-cyber-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Intelligence</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leveraging state-of-the-art machine learning models to analyze sensor data in real-time and make autonomous decisions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 group hover:border-cyber-blue/30 transition-all cursor-default relative overflow-hidden">
             <div className="bg-cyber-darker p-4 rounded-xl inline-block mb-6 border border-white/5 group-hover:border-cyber-blue/20">
              <Factory className="w-8 h-8 text-cyber-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Industrial Scale</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Deploying robust IoT hardware that seamlessly communicates with legacy industrial mechanical systems at scale.
            </p>
          </div>

          {/* Card 3 (Action Card) */}
          <Link to="/apply" className="glass-card bg-cyber-blue/10 border-cyber-blue/20 hover:bg-cyber-blue/20 p-8 flex flex-col justify-center transition-all group">
            <h3 className="text-3xl font-bold text-white mb-6">
              Join The<br/>Mission.
            </h3>
            <div className="flex items-center text-cyber-blue font-semibold mt-auto">
              <span>View Openings</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex flex-col items-center text-gray-500 animate-bounce">
          <MousePointer2 className="w-6 h-6 mb-2" />
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
        </div>
        
      </div>
    </div>
  );
}
