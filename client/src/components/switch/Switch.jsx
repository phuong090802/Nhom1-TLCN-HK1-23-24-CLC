const Switch = ({ active, oC, id }) => {
    return (
        <div
            onClick={() => oC(id)}
            className={`flex w-14 h-7 rounded-full ${active ? "bg-dark_blue" : "bg-gray-400 "} cursor-pointer`}
        >
            <span className={`h-7 w-7 border bg-white rounded-full transition-all duration-500 ${active ? "ml-7" : ""}`}></span>
        </div>
    )
}

export default Switch