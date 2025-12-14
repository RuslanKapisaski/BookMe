export default function About() {
  return (
    <section className="bg-sky-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-sky-400">BookMe</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            BookMe is a modern booking platform that connects travelers with
            unique places to stay — quickly, safely, and effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-gray-300">
              Our mission is to make traveling easier by giving people access to
              beautiful homes, apartments, and unique places around the world.
              Whether you travel solo, with friends, or with family — BookMe
              helps you find the perfect stay.
            </p>
            <p className="text-gray-300">
              We believe that booking accommodation should be simple,
              transparent, and enjoyable.
            </p>
          </div>

          <div className="bg-sky-900/50 rounded-xl p-8 shadow-lg">
            <ul className="space-y-2">
              <li>✔ Trusted hosts & verified properties</li>
              <li>✔ Simple & secure booking process</li>
              <li>✔ No hidden fees</li>
              <li>✔ Fast support & easy cancellations</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">
            Why Choose BookMe?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-sky-900/60 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Unique Places</h3>
              <p className="text-gray-300">
                From city apartments to seaside villas — discover stays you’ll
                love.
              </p>
            </div>

            <div className="bg-sky-900/60 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Real Guest Reviews</h3>
              <p className="text-gray-300">
                Every opinion on BookMe comes from real guests who have
                completed a booking, ensuring honest and trustworthy reviews.
              </p>
            </div>

            <div className="bg-sky-900/60 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Fast Booking</h3>
              <p className="text-gray-300">
                Book your stay in minutes with our smooth and intuitive
                experience.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
          <p className="text-gray-300">
            Join thousands of travelers who already trust BookMe.
          </p>
          <a
            href="/catalog"
            className="inline-block bg-sky-500 hover:bg-sky-600 transition px-8 py-3 rounded-lg font-semibold"
          >
            Explore Properties
          </a>
        </div>
      </div>
    </section>
  );
}
