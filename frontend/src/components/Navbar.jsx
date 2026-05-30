import { Menu, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-6 border-b border-white/5 relative z-10">
      <div className="flex items-center gap-4">
        <button className="p-2 bg-cyber-dark rounded-md border border-white/10 hover:border-cyber-blue/50 transition-colors">
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-4 bg-cyber-dark rounded-full pl-6 pr-2 py-2 border border-white/10">
          <span className="text-sm text-gray-400 font-medium">No Account?</span>
          <Link to="/apply" className="text-cyber-blue text-sm font-semibold hover:underline">
            Apply
          </Link>
          <UserCircle className="w-8 h-8 text-white ml-2" />
        </div>
      </div>
    </nav>
  );
}
