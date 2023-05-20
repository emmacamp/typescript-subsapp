import { Sub } from '../types';

interface Props {
    subs: Array<Sub>
}

export const List = ({ subs }: Props) => {

    const renderList = (): JSX.Element[] => {
        return subs.map(sub => (
            <li key={sub.description}>
                <img src={"https://i.pravatar.cc/125?u="+sub.avatar} alt={sub.nick} />
                <div className="container__card__info">
                    <h4>{sub.nick} ({sub.subMonths})</h4>
                    <p>{sub.description?.substring(0, 100)}</p>
                </div>
            </li>
        ))

    }

    return (
        <ul>
            {renderList()}
        </ul>
    )
}