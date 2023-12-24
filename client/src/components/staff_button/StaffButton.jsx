const StaffButton = ({ oC, color, children }) => {
    const btnColor = (color === 'red') ? 'bg-red-600' : 'bg-green-600'
    const css = `${btnColor} text-white py-2 px-4 rounded`

    return (<button
        className={css}
        onClick={() => { if (oC) oC() }}>
        {children}
    </button>)
}

export default StaffButton