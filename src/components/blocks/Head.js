const Head = ({ title = "", desc = ""  }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-main">{title}</h1>
            <p className="text-purple">{desc}</p>
        </div>
    )
}

export default Head