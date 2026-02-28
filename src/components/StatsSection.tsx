export function StatsSection() {
  const stats = [
    {
      number: "10K+",
      label: "Monthly Readers",
      description: "People trust us for health guidance"
    },
    {
      number: "500+",
      label: "Articles Published",
      description: "Covering diverse health topics"
    },
    {
      number: "95%",
      label: "Reader Satisfaction",
      description: "Find our content helpful"
    },
    {
      number: "24/7",
      label: "Always Available",
      description: "Access health resources anytime"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center"
              >
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl text-[#64767C]">
                    {stat.number}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl mb-1 text-[#1A2227]">
                  {stat.label}
                </h3>
                <p className="text-sm text-[#64767C]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
