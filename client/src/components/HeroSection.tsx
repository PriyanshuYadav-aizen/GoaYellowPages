const HeroSection = () => {


  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="relative px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Goa Yellow Pages
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the finest businesses in Goa with authentic ratings and
            detailed reviews. Your trusted guide to the best experiences in
            paradise.
          </p>
          {/* CTA buttons moved to footer */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
