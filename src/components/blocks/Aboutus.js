import { FaDumbbell, FaHeartbeat, FaRunning } from "react-icons/fa";

const AboutUs = () => {
    return (
        <section className="py-20 bg-white" id="aboutus">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-main mb-4">ABOUT US</h2>
                    <div className="w-24 h-1 bg-purple mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Feature 1 */}
                    <div className="text-center p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="bg-purple-100 p-4 rounded-full">
                                <FaDumbbell className="text-purple-600 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Professional Equipment</h3>
                        <p className="text-gray-600">
                            Our cutting-edge facility features premium-grade equipment from leading brands to ensure safe and effective workouts.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="text-center p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="bg-red-100 p-4 rounded-full">
                                <FaHeartbeat className="text-red-600 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Health First Approach</h3>
                        <p className="text-gray-600">
                            We prioritize your wellbeing with personalized health assessments and heart-rate monitored training programs.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="text-center p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="bg-blue-100 p-4 rounded-full">
                                <FaRunning className="text-blue-600 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Dynamic Training</h3>
                        <p className="text-gray-600">
                            Experience high-energy classes and innovative movement techniques designed to maximize your athletic performance.
                        </p>
                    </div>
                </div>

                <div className="mt-16 bg-gradient-to-r from-main to-purple rounded-2xl p-8 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="mb-6">
                            Founded in 2010, we're dedicated to transforming fitness into a lifestyle. Our certified trainers and community-focused environment help thousands achieve their goals every year.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;