const MembershipPlans = () => {
    return (
        <section className="py-20 bg-skin">
            <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-main mb-4">MEMBERSHIP PLANS</h2>
                <div className="w-24 h-1 bg-purple mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                { 
                    name: "Basic", 
                    price: "299", 
                    features: ["Access to gym equipment", "3 group classes/week", "Locker access", "No trainer guidance"],
                    popular: false
                },
                { 
                    name: "Premium", 
                    price: "499", 
                    features: ["Unlimited equipment access", "Unlimited group classes", "Personal trainer (1 session/week)", "Locker + towel service", "Nutrition consultation"],
                    popular: true
                },
                { 
                    name: "Pro", 
                    price: "799", 
                    features: ["All Premium features", "Personal trainer (3 sessions/week)", "24/7 access", "Complimentary supplements", "Spa access (2 times/month)"],
                    popular: false
                }
                ].map((plan, index) => (
                <div 
                    key={index} 
                    className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                    plan.popular ? "border-4 border-purple transform scale-105" : ""
                    }`}
                >
                    {plan.popular && (
                    <div className="bg-purple text-white text-center py-2 font-bold">
                        MOST POPULAR
                    </div>
                    )}
                    <div className="p-8">
                    <h3 className="text-3xl font-bold text-main mb-2">{plan.name}</h3>
                    <div className="mb-6">
                        <span className="text-5xl font-bold text-purple">AED {plan.price}</span>
                        <span className="text-gray-600">/month</span>
                    </div>
                    <ul className="mb-8 space-y-3">
                        {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                            <div className="bg-sky rounded-full p-1 mr-3">
                            <div className="bg-main rounded-full w-3 h-3"></div>
                            </div>
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                    <button className={`w-full py-3 rounded-full font-bold ${
                        plan.popular 
                        ? "bg-purple text-white hover:bg-[#5d4a8f]" 
                        : "bg-main text-white hover:bg-[#09173f]"
                    }`}>
                        JOIN NOW
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
    )
}

export default MembershipPlans