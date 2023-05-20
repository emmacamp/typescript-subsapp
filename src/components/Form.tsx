import { Sub } from '../types';
import { useNewFormReducer } from '../hooks/useNewSubForm'

interface FormProps {
    onNewSub: (newSub: Sub) => void
}


export const Form = ({ onNewSub }: FormProps) => {
    // const [inputValues, setInputValues] = useState<FormState["inputValues"]>(INITIAL_STATE)
    const [inputValues, dispatch] = useNewFormReducer();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        onNewSub(inputValues)
        handleClear()
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.preventDefault()
        const { name, value } = evt.target;
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }

        })
    }
    const handleClear = () => {
        dispatch({
            type: "clear"
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick" />
            <input onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="subMonths" />
            <input onChange={handleChange} value={inputValues.avatar} type="text" name="avatar" placeholder="avatar" />
            <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="description" />
            <button type='submit'>
                Save new sub!
            </button>
            <button type='button' onClick={handleClear}>
                Clear
            </button>
        </form>
    )
}
