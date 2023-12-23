const Filter = ({ params, setParams, data, name, w, value}) => {
    const handleFilter = (e) => {
        setParams({
            ...params,
            [name]: e.target.value,
            page: 0
        })
    }
    return (
        <select 
        className={`border px-2 py-1 rounded  ${w ? w : ''}`} 
        onChange={e => handleFilter(e)} name={name}
        >
            {data &&
                data.map((opt, i) => {
                    return (<option key={i} value={opt.value}>{opt.key}</option>)
                })
            }

        </select>
    )
}

export default Filter