import './cards.css';
import { useContext, useState } from 'react';
import Button from '@avtopro/button/dist/index';
import ItemCard from '@avtopro/item-card/dist/index';
// import ItemCardBlock from '@avtopro/item-card/src/ItemCardBlock';
import RobotPreloader from '@avtopro/preloader/dist/index';
import Placeholder from '@avtopro/placeholder/dist/index';
import PlaceholderRobot from '@avtopro/placeholder-robot/dist/index';
import { observer } from 'mobx-react-lite';
import { contextRoot } from '../../context/contextRoot';
import EditModal from '../EditModal';

function Cards() {
    const [isVisibleModal, setModalVisibility] = useState(false);
    const [cardToEdit, setCardToEdit] = useState(null);
    const { cards } = useContext(contextRoot);

    return (
        <section className="cards p-2 grid-modal">
            {cards.pending ? (
                <div className="g-col-2 g-start-2">
                    <RobotPreloader title="loading" />
                </div>
            ) : (
                cards.cardsList.map((el) => (
                    <ItemCard
                        className="card"
                        key={el.id}
                        title={
                            <div className="card__item">
                                <h5 className="card__title">
                                    Toyota {el.modelName}
                                </h5>
                                <p className="card__subtitle">
                                    engine: <span>{el.engine}</span>
                                </p>

                                <p className="card__subtitle">
                                    mileage: <span>{el.mileage} km</span>
                                </p>
                            </div>
                        }
                        controls={[
                            <Button
                                className="card__btn"
                                theme="youtube"
                                key="delete"
                                blockSize="sm"
                                onClick={() => {
                                    cards.deleteCard(el.id);
                                }}
                            >
                                delete
                            </Button>,
                            <Button
                                className="card__btn"
                                key="edit"
                                theme="light-blue"
                                blockSize="sm"
                                onClick={() => {
                                    setModalVisibility(true);
                                    setCardToEdit(el);
                                }}
                            >
                                edit
                            </Button>
                        ]}
                    >
                        {/* <ItemCardBlock> */}
                        <ul className="card__list">
                            {el.parts.map((part) => (
                                <li className="card__list-item" key={part.code}>
                                    <span style={{ display: 'block' }}>
                                        {part.name}
                                    </span>
                                    <span>{part.code}</span>
                                    <span>-({part.partCount})</span>
                                </li>
                            ))}
                        </ul>
                        {/* </ItemCardBlock> */}
                    </ItemCard>
                ))
            )}
            {!cards.pending && !cards.cardsList[0] ? (
                <Placeholder
                    className="g-col-4"
                    title="You haven`t added any card yet"
                >
                    <div>
                        Fill modal with parts and vehicle data to see your cards
                        here
                    </div>
                    <PlaceholderRobot type="no-banner" />
                </Placeholder>
            ) : null}

            {isVisibleModal ? (
                <EditModal
                    setModalVisibility={setModalVisibility}
                    card={cardToEdit}
                />
            ) : null}
        </section>
    );
}

export default observer(Cards);
