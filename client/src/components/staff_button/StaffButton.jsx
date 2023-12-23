const StaffButton = ({ oC, color, children }) => {

    const css = `${color ? `bg-[${color}]` : 'bg-green-600'} text-white py-2 px-4 rounded`

    return (<button
        className={css}
        onClick={() => { if (oC) oC() }}>
        {children}
    </button>)
}

export default StaffButton