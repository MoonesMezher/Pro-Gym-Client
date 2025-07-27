import time from "@/utils/time"

const Testimonials = ({ rates }) => {        
    return (
        <section className="py-20 bg-white" id="testimonials">
            <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-main mb-4">SUCCESS STORIES</h2>
                <div className="w-24 h-1 bg-purple mx-auto"></div>
            </div>
            
            {rates.length !== 0? <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {rates.map((e, i) => (
                    <div key={i} className="bg-skin p-8 rounded-xl shadow-lg">
                        <div className="flex items-center mb-6">
                            <img src={"http://localhost:4000/"+e.picture} alt={e._user.name} className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 object-cover" />
                            <div className="ml-4">
                                <h4 className="text-xl font-bold text-main">{e._user.name}</h4>
                                <p className="text-purple">Member since {time(e._user.createdAt)}</p>
                            </div>
                        </div>
                        <p className="text-main italic mb-4">
                            { e.message }
                        </p>
                        <div className="flex text-purple">
                            {[...Array(e.rate)].map((_, i) => (
                                <span key={i} className="text-xl">★</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>: <p>No data yet</p>}
            </div>
        </section>
    )
}

export default Testimonials