import { useEffect } from 'react'
import style from './style.module.scss'

interface PropsInterface {
    entries: number,
    changeEntries: (e: number)=>void
    options?: null | string[]
}

/**
 * Render Select
 * 
 * @param {PropsInterface} props
 * @param {number} props.entries
 * @param {Function} props.changeEntries
 * @param {null | string[]} [props.options]
 * 
 * @returns {JSX.Element}
 */
export default function Select({entries, changeEntries, options}: PropsInterface): JSX.Element {
    useEffect(()=> {
        if(options) {
            const [firstOption] = options;
            changeEntries(parseInt(firstOption, 10))
        }
    }, [])


    return (
        <>
            <div className={style['table-select-entries']}>
                <label htmlFor="select-entries">Show</label>
                <select id="select-entries" value={entries} onChange={(e) => changeEntries(parseInt(e.target.value, 10))}>
                    {
                        options? 
                            options.map((option, idx)=><option key={`option-${idx}`} value={`${option}`}>{option}</option>)
                            :
                            <>
                                <option value="10">10</option>
                                <option value="25" >25</option>
                                <option value="50" >50</option>
                                <option value="100">100</option>
                            </>
                    }
                </select>
                <p>entries</p>
            </div>
        </>
    )
}