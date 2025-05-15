import React from "react";
import s from './SubscriptionPage.module.css'
import checkMark from "../../assets/icons/checkMarkIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    purchaseBasic,
    purchaseEnterprise,
    purchasePro,
} from "../../store/slice/userActions";

function SubscriptionPage() {
    const { userToken } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { purchased } = useSelector((state) => state.user);

    const array = [
        {
            title: "Basic",
            trail: 14,
            price: 99,
            gameExperience: 1,
            users: 100,
            disabled: false, // Active
        },
        {
            title: "Pro",
            trail: false,
            price: 200,
            gameExperience: 5,
            users: 200,
            bestOption: true,
            disabled: true, // Make disabled
        },
        {
            title: "Enterprise",
            trail: false,
            price: 500,
            gameExperience: 10,
            users: 500,
            disabled: true, // Make disabled
        },
    ];

    const handlePurchaseClick = async (title) => {
        if (!userToken) {
            navigate("/register");
            return;
        }

        let action;
        switch (title) {
            case "Basic":
                action = purchaseBasic;
                break;
            case "Pro":
                // action = purchasePro;
                break;
            case "Enterprise":
                // action = purchaseEnterprise;
                break;
            default:
                console.error("Unknown plan type:", title);
                return;
        }

        dispatch(action(userToken)).then((actionResult) => {
            if (actionResult.type.includes('fulfilled')) {
                const url = actionResult.payload; // Убедитесь, что это соответствует структуре вашего ответа
                window.location.href = url; // Перенаправление пользователя
            } else {
                // Обработка ошибки или отклоненного промиса
                console.error("Purchase action was not fulfilled:", actionResult);
            }
        });
    };

    const card = ({
                      title,
                      trail,
                      price,
                      gameExperience,
                      users,
                      bestOption,
                      key,
                      disabled,
                  }) => {
        return (
            <div className={s.pricingCard} key={key}>
                <div className={s.pricingCardText}>
                    <h3>{title}</h3>
                    {trail && <p className={s.trail}>{trail}-day free trail</p>}
                    <p className={s.priceText}>
                        $ <span className={s.spanPrice}>{price}</span> /Per Month
                    </p>
                </div>
                <ul>
                    <li>
                        <img src={checkMark} alt="checkMark" />
                        <p>{gameExperience} game experience</p>
                    </li>
                    <li>
                        <img src={checkMark} alt="checkMark" />
                        <p>Up to {users} users 0,5c a user</p>
                    </li>
                </ul>
                <button
                    className={`${s.pricingButton} ${disabled ? s.disabled : ''}`}
                    onClick={() => !disabled && handlePurchaseClick(title)}
                    disabled={disabled} // используем свойство disabled
                >
                    Get Started
                </button>
                {bestOption && (
                    <div className={s.bestOption}>
                        <p>
                            Best <br /> Option
                        </p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={s.wrapper}>
            <div className={s.pricingContainer}>
                <h2>Pricing & Plans</h2>
                <div className={s.pricingCards}>
                    {array.map((elem, index) => card({ ...elem, key: index }))}
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPage;