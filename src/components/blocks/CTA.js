import Link from "next/link"

const CTA = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-main to-purple text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    READY TO START YOUR <span className="text-skin">FITNESS JOURNEY</span>?
                </h2>
                <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-200">
                    Join thousands of members who have transformed their lives with Pro Gym. Your first session is on us!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/auth/signup" className="bg-skin text-main hover:bg-skin px-8 py-4 rounded-full font-bold text-lg">
                    GET STARTED TODAY
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CTA