import React from 'react'
import styles from '../styles/NicheCard.module.css'

function NicheCard({children,id}) {
  return (
    <div id={id} className={styles.infobox}>
        {children}
    </div>
  )
}

export default NicheCard