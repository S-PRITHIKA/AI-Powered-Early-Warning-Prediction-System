import React from 'react';
import { Globe, Anchor, AlertTriangle, BarChart3, Users, Satellite } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Globe,
      title: 'Real-Time Ocean Data',
      description: 'Access live satellite imagery, sensor data, and environmental monitoring from across the globe',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '24/7 Monitoring'
    },
    {
      icon: Anchor,
      title: 'Fishermen Alerts',
      description: 'Instant notifications for weather conditions, safe fishing zones, and navigation guidance',
      gradient: 'from-cyan-500 to-teal-500',
      stats: 'Real-time Alerts'
    },
    {
      icon: AlertTriangle,
      title: 'Disaster & Illegal Fishing',
      description: 'Emergency response system with automated detection and prevention capabilities',
      gradient: 'from-red-500 to-orange-500',
      stats: 'Instant Response'
    },
    {
      icon: BarChart3,
      title: 'Smart Dashboards',
      description: 'Role-specific analytics and insights with customizable reporting tools',
      gradient: 'from-purple-500 to-indigo-500',
      stats: 'Custom Analytics'
    },
    {
      icon: Users,
      title: 'Collaborative Communication',
      description: 'Secure messaging and coordination between researchers, fishermen, and authorities',
      gradient: 'from-emerald-500 to-green-500',
      stats: 'Multi-Role Network'
    },
    {
      icon: Satellite,
      title: 'Advanced Monitoring',
      description: 'AI-powered analysis of maritime activities with predictive intelligence',
      gradient: 'from-violet-500 to-purple-500',
      stats: 'AI-Powered'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-700 to-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Platform Features</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Comprehensive tools and intelligence systems designed for modern maritime operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="mb-4">
                  <span className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.stats}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-blue-200 leading-relaxed group-hover:text-blue-100 transition-colors">
                  {feature.description}
                </p>

                {/* Hover effect indicator */}
                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 rounded-full`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Maritime Operations?
            </h3>
            <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
              Join thousands of researchers, fishermen, and authorities already using BLUE-HARBOUR 
              for safer, smarter ocean activities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">500+</div>
                <div className="text-sm text-blue-200">Active Researchers</div>
              </div>
              <div className="w-px h-12 bg-blue-400/30 mx-4"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">2,000+</div>
                <div className="text-sm text-blue-200">Registered Fishermen</div>
              </div>
              <div className="w-px h-12 bg-blue-400/30 mx-4"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">50+</div>
                <div className="text-sm text-blue-200">Maritime Authorities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;