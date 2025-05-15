import React from 'react'
import s from './TextCard.module.css'
import IconButton from '../../ui/iconButton/IconButton'
import temporaryImage from '../../assets/images/AVY-transparent-PNG.png'


export default function TextCard({  title, content }) {
  return (
    <div className={s.lessonCardWrapper}>
        <div className={s.lessonCardHeader}>
            <p>Lesson: {title}</p>
            <div className={s.actionBtns}>
                <IconButton icon={"delete"} />
                <IconButton icon={"edit"} />
            </div>
        </div>
        <div className={s.lessonCardcontent}>
            {/* <p>The lesson type is {itemType}</p> */}
            <p>The lesson type is text</p>
            <img src={temporaryImage} alt="" />
        </div>
    </div>
  )
}
