import { useEffect, useState } from 'react';
import './App.css';
import { List } from './components/List';
import { Form } from './components/Form';
import { Sub, SubsResponseFromApi } from './types';


interface AppSubs {
  subs: Array<Sub>
  newSubsNumber: number
}

function App() {
  // const [count, setCount] = useState<string | number>(0)
  const [subs, setSubs] = useState<AppSubs["subs"]>([]);
  // const [newSubsNumber, setNewSubsNumber] = useState<AppSubs["newSubsNumber"]>(0);



  useEffect(() => {
    const fetchSubs = async (): Promise<SubsResponseFromApi> => {
      const res = await fetch('http://localhost:3000/subs');
      return await res.json();
    }

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi) => {
      return apiResponse.map(subs => {
        const { description, months, nick, profileUrl } = subs;
        return {
          nick,
          description,
          subMonths: months,
          avatar: profileUrl,

        }
      })
    }
    

    fetchSubs()
      .then(mapFromApiToSubs)
      .then(setSubs)

    // fetchSubs()
    //   .then(apiResponse => {
    //     const subs = mapFromApiToSubs(apiResponse);
    //     setSubs(subs)
    //   })

  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => ([...subs, newSub]))
  }

  return (
    <>
      <h1>Popa Subs</h1>
      <section>
        <Form onNewSub={handleNewSub} />
        {/* <hr /> */}
        {
          subs && <List subs={subs} />
        }
      </section>
    </>
  )
}

export default App
