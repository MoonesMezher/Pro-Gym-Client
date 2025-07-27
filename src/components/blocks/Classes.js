"use client"

import Link from "next/link";

const Classes = ({ sections }) => {
    return (
        <section className="py-20 bg-main text-white" id="sections">
            <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">OUR FITNESS CLASSES</h2>
                <div className="w-24 h-1 bg-[#8CCDEB] mx-auto"></div>
            </div>
                {(sections.length != 0)? 
                    (<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sections.map((e, index) => (
                            <div key={index} className="bg-purple p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <img src={"http://localhost:4000/"+e.images[0]} width={30} height={30} className="rounded-full"/>
                                    <h3 className="text-2xl font-bold ml-2">{e.title}</h3>
                                </div>
                                <p className="text-skin mb-4">{e.description}</p>
                                <Link href={`/sections/${e._id}`} className="bg-[#8CCDEB] text-main hover:bg-[#6cb7db] px-4 py-2 rounded-full font-bold">
                                    See more
                                </Link>
                            </div>
                        ))}
                    </div>): (<p>No sections yet</p>)}
            </div>
        </section>
    )
}

export default Classes