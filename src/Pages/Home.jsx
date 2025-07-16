import { motion } from "framer-motion";
import { Waves, FunctionSquare, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-[#1B0140] via-[#28095A] to-[#0F051D] min-h-screen w-screen ">
      <div className="fixed top-0 left-0 z-10 w-screen h-screen ">
        <img
          src="/tube_background.png"
          alt="Aurora Background"
          className="w-full h-full object-cover mix-blend-screen opacity-50"
        />
      </div>

      <div className="relative z-20 text-white text-center pt-40 px-4 w-screen  min-h-screen ">
        <section className="relative z-20 mt-24 px-4 flex flex-col items-center text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Visualize Surface Variations in Real Time
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Our sensor system detects and displays surface height differences in
            real-time. Using analog IR sensors and smart interpolation, you get
            accurate measurements and clear visual insights.
          </p>

          <div className="mt-12 rounded-xl overflow-hidden shadow-xl max-w-5xl w-full">
            <img
              src="/analytics_dashboard.png"
              alt="Analytics Dashboard"
              className="w-full object-cover"
            />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 text-left">
            {/* Block 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.4 }}
              className="bg-[#1c0b33] border border-[#2a124c] p-6 rounded-2xl shadow-md"
            >
              <Waves size={32} className="text-violet-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                IR-Based Height Sensing
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The system uses analog IR sensors—one for sending and one for
                receiving—to detect surface height changes based on voltage
                differences. These values are captured in real-time and sent to
                the microcontroller.
              </p>
            </motion.div>

            {/* Block 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.4 }}
              className="bg-[#1c0b33] border border-[#2a124c] p-6 rounded-2xl shadow-md"
            >
              <FunctionSquare size={32} className="text-violet-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Accurate Distance Conversion
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The voltage is converted to distance using binary search and
                linear interpolation over predefined reference points (5cm,
                10cm, 15cm, 20cm). This ensures reliable, high-precision
                readings for every point.
              </p>
            </motion.div>

            {/* Block 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.4 }}
              className="bg-[#1c0b33] border border-[#2a124c] p-6 rounded-2xl shadow-md"
            >
              <BarChart3 size={32} className="text-violet-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Real-Time 2D Surface Visualization
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Each sensor reading is first converted from voltage to distance
                on the microcontroller, then sent to the backend along with its
                GPS location and timestamp. The frontend receives these values
                and plots them dynamically on a 2D chart, allowing for real-time
                monitoring of surface variations over time and position.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative z-20 mt-28 px-6 md:px-12 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            System Features Built for Precision Monitoring
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Explore the core functionalities of our IR-based monitoring system,
            designed to capture and visualize surface height changes with
            accuracy and clarity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.4 }}
              className="bg-[#1c0b33] p-6 rounded-2xl border border-[#2a124c] shadow-md hover:shadow-purple-500/20 transition-shadow"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
                  {/* Sensor Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a9 9 0 0112.728 0M7.757 9.757a5 5 0 016.486 0M11.243 13.243a1 1 0 011.514 0"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                IR Sensor Processing
              </h3>
              <p className="text-gray-400 mb-3">
                Raw analog voltage from the IR sensors is processed using binary
                search and linear interpolation. This ensures accurate and
                stable distance measurement for each surface point.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.4 }}
              className="bg-[#1c0b33] p-6 rounded-2xl border border-[#2a124c] shadow-md hover:shadow-purple-500/20 transition-shadow"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
                  {/* Backend Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m0 0l-4-4m4 4l4-4M4 6h16"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Backend Integration
              </h3>
              <p className="text-gray-400 mb-3">
                Distance values are transmitted to the backend along with
                timestamp and GPS coordinates. This data pipeline keeps your
                readings organized and ready for structured visualization.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.4 }}
              className="bg-[#1c0b33] p-6 rounded-2xl border border-[#2a124c] shadow-md hover:shadow-purple-500/20 transition-shadow md:col-span-2"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
                  {/* Chart Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4-4 4 4 4-8 4 4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Real-Time 2D Chart Display
              </h3>
              <p className="text-gray-400 mb-3">
                On the frontend, incoming data is visualized in a dynamic 2D
                chart. Each point is plotted by location and time, making it
                easy to monitor surface variation trends as they happen.
              </p>
            </motion.div>
          </div>
          <section className="relative z-20 mt-28 px-6 md:px-12 text-white text-center">
            {/* Code Collaboration Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24 items-center">
              {/* Left: Feature Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.4 }}
                className="bg-[#1c0b33] p-6 md:p-10 rounded-2xl border border-[#2a124c] shadow-md text-left"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
                    {/* Backend icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m0 0l-4-4m4 4l4-4M4 6h16"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Backend Data Flow
                </h3>
                <p className="text-gray-400 mb-3">
                  The microcontroller calculates distance values from analog IR
                  sensors and sends them via HTTP request to the backend along
                  with GPS coordinates and timestamp. The backend receives this
                  data, stores it in the database, and makes it accessible
                  through a RESTful API. The frontend fetches this structured
                  data and visualizes it on a 2D chart in real time.
                </p>
                <a
                  href="https://documenter.getpostman.com/view/43131846/2sB2j1grtp#intro"
                  className="text-purple-400 hover:underline"
                >
                  View API structure
                </a>
              </motion.div>

              {/* Right: Code UI */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, amount: 0.4 }}
                className="bg-[#1c0b33] p-6 rounded-2xl border border-[#2a124c] shadow-md overflow-x-auto text-left text-sm font-mono text-gray-200"
              >
                <div className="mb-2 text-gray-400">api/sensor-readings/1</div>
                <pre className="bg-[#14022c] p-4 rounded-lg leading-relaxed">
                  <span className="text-blue-400">const</span> reading ={" "}
                  <span>{"{"}</span> <br />
                  &nbsp;&nbsp;<span className="text-purple-400">id</span>:{" "}
                  <span className="text-pink-400">1</span>,<br />
                  &nbsp;&nbsp;
                  <span className="text-purple-400">sensor_values</span>:{" "}
                  <span className="text-yellow-300">
                    [110, 125, 95, 115, 100]
                  </span>
                  ,<br />
                  &nbsp;&nbsp;<span className="text-purple-400">
                    latitude
                  </span>: <span className="text-green-300">"37.7749000"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">longitude</span>
                  : <span className="text-green-300">"-122.4194000"</span>,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-purple-400">created_at</span>:{" "}
                  <span className="text-blue-300">"2025-04-27T12:12:37Z"</span>
                  <br />
                  {"};"}
                </pre>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.6 }}
              className="bg-[#1c0b33] max-w-5xl mx-auto p-10 rounded-2xl border border-[#2a124c] shadow-md text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                IR-Based Surface Monitoring System
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
                This system is designed to detect and visualize surface height
                variations using analog IR sensors. The sensor board should be
                positioned with the IR sensors facing downward toward the
                surface. To reduce signal interference and improve accuracy,
                sensors operate in alternating mode—only one is active at a time
                while the others remain off. For each active sensor, 100
                readings are collected and averaged to produce a stable and
                reliable distance value.
                <br />
                <br />
                These values are sent to the backend with GPS coordinates and
                timestamps, then displayed on a real-time 2D chart on the
                dashboard for clear and continuous surface analysis.
              </p>
              <Link to="/dashboard/chart">
                <button className="px-6 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition">
                  Go to Dashboard
                </button>
              </Link>
            </motion.div>
          </section>
        </section>
      </div>
    </div>
  );
}
