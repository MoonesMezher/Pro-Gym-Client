const Stats = () => {
    return (
        <section className="py-16 bg-skin">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-5xl font-bold text-main">15+</div>
                    <div className="text-xl mt-2 text-purple">Years Experience</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-main">10k+</div>
                    <div className="text-xl mt-2 text-purple">Members</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-main">50+</div>
                    <div className="text-xl mt-2 text-purple">Expert Trainers</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-main">24/7</div>
                    <div className="text-xl mt-2 text-purple">Open Access</div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Stats