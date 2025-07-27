import { FaDumbbell, FaHeartbeat, FaRunning } from "react-icons/fa"

const Features = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-main mb-4">WHY CHOOSE PRO GYM</h2>
                <div className="w-24 h-1 bg-purple mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-skin p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div className="bg-main w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <FaRunning className="text-3xl text-skin" />
                    </div>
                    <h3 className="text-2xl font-bold text-main mb-4">Modern Equipment</h3>
                    <p className="text-purple">
                    State-of-the-art fitness equipment from leading brands to maximize your workout efficiency.
                    </p>
                </div>
                
                <div className="bg-skin p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div className="bg-main w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <FaHeartbeat className="text-3xl text-skin" />
                    </div>
                    <h3 className="text-2xl font-bold text-main mb-4">Expert Trainers</h3>
                    <p className="text-purple">
                    Certified professionals with years of experience to guide you towards your fitness goals.
                    </p>
                </div>
                
                <div className="bg-skin p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div className="bg-main w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <FaDumbbell className="text-3xl text-skin" />
                    </div>
                    <h3 className="text-2xl font-bold text-main mb-4">Personalized Plans</h3>
                    <p className="text-purple">
                    Custom workout and nutrition plans tailored to your body type and fitness objectives.
                    </p>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Features