import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">About Game Galaxy</h1>
        <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-lg text-white/90 mb-6">
            Welcome to Game Galaxy, your premier destination for brain-training games and cognitive enhancement. Our platform is designed to make learning and mental exercise both fun and engaging.
          </p>
          <p className="text-lg text-white/90 mb-6">
            Each game in our collection has been carefully crafted to target different aspects of cognitive function, including:
          </p>
          <ul className="list-disc list-inside text-white/90 space-y-2 mb-6">
            <li>Problem-solving abilities</li>
            <li>Pattern recognition</li>
            <li>Strategic thinking</li>
            <li>Memory enhancement</li>
            <li>Concentration and focus</li>
          </ul>
          <p className="text-lg text-white/90">
            Whether you're looking to sharpen your mind or simply enjoy some challenging entertainment, Game Galaxy has something for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;