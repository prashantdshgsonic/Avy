import React from 'react'
import s from './UserCard.module.css'

export default function UserCard({ id, firstName, lastName, image, jobTitle, email }) {
    return (
        <div className={s.userCard}>
            <img className={s.image} src={image} alt="user-card" />
            <div className={s.userInfoWrapper}>
                <p className={s.name}>{firstName} {lastName}</p>
                <p className={s.email}>{email}</p>
                <p className={s.jobtitle}>{jobTitle}</p>
            </div>
        </div>
    )
}
