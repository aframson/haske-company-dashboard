import React, { createContext, useState, useEffect } from 'react'


export const State = createContext();

function StateProvider({ children }) {


  const [storeName, setStoreName] = useState('')
  const [storeLegalName, setStoreLegalName] = useState('')
  const [about, setAbout] = useState('')
  const [industry, setIndustry] = useState('')
  const [editData,setEditData] = useState()



  const States = {
    // personal info states
    storeName,setStoreName,
    storeLegalName,setStoreLegalName,
    about,setAbout,
    industry,setIndustry,
    // 
    editData,setEditData
  }


  return (
    <State.Provider value={States}>
      {children}
    </State.Provider>
  )
}

export default StateProvider;