import React, { useState } from 'react';
import { FileText, Anchor, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const AboutUsSection = () => {
  const [activeCard, setActiveCard] = useState<string | null>('researcher');

  const roles = [
    {
      id: 'researcher',
      title: 'Researchers',
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Monitor satellite + eDNA resources, analyze data, update dashboards, and notify Fishermen + Authorities.',
      features: [
        'Access real-time satellite imagery and ocean data',
        'Analyze environmental DNA (eDNA) samples',
        'Generate comprehensive research reports',
        'Collaborate with global research networks',
        'Send alerts to fishermen and authorities'
      ]
    },
    {
      id: 'fisherman',
      title: 'Fishermen',
      icon: Anchor,
      gradient: 'from-cyan-500 to-teal-500',
      description: 'Get early alerts on no-fishing zones, disaster warnings, ship movement, and safe fishing areas.',
      features: [
        'Receive real-time weather and sea condition alerts',
        'Get notifications about restricted fishing zones',
        'Access safe fishing area recommendations',
        'Track vessel movements in your vicinity',
        'Emergency communication channels'
      ]
    },
    {
      id: 'authorities',
      title: 'Authorities',
      icon: Shield,
      gradient: 'from-teal-500 to-emerald-500',
      description: 'Send disaster alerts, prevent illegal fishing, and maintain defense-based monitoring.',
      features: [
        'Monitor maritime activities in real-time',
        'Send emergency disaster alerts',
        'Track and prevent illegal fishing activities',
        'Coordinate with coast guard operations',
        'Maintain comprehensive surveillance logs'
      ]
    }
  ];

  const toggleCard = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-800 to-slate-700">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">About Our Platform</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            BLUE-HARBOUR serves three critical maritime communities with specialized tools and real-time intelligence
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = activeCard === role.id;
            
            return (
              <div
                key={role.id}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 ${
                  isActive ? 'scale-105 shadow-2xl' : 'hover:bg-white/10'
                }`}
              >
                <div
                  onClick={() => toggleCard(role.id)}
                  className="p-6 cursor-pointer"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${role.gradient} mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{role.title}</h3>
                    {isActive ? (
                      <ChevronUp className="h-6 w-6 text-white" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-white" />
                    )}
                  </div>
                  
                  <p className="text-blue-200 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                {isActive && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {role.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className={`mt-1 h-2 w-2 rounded-full bg-gradient-to-r ${role.gradient} flex-shrink-0`}></div>
                            <span className="text-blue-100 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Collaborative Network Visualization */}
        <div className="mt-16 text-center">
          <div className="relative inline-block">
            <div className="flex items-center justify-center space-x-8 md:space-x-16">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-2 mx-auto">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm text-blue-200">Researchers</span>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-cyan-400 to-teal-400"></div>
                  <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-cyan-400 to-teal-400"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center mb-2 mx-auto">
                  <Anchor className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm text-blue-200">Fishermen</span>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-teal-400 to-emerald-400"></div>
                  <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-teal-400 to-emerald-400"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center mb-2 mx-auto">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm text-blue-200">Authorities</span>
              </div>
            </div>
            
            <p className="mt-6 text-blue-300 max-w-md mx-auto">
              All three roles work together in a connected ecosystem for comprehensive ocean monitoring and safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;