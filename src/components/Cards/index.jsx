import './cards.css';
import { useContext, useEffect } from 'react';
import Button from '@avtopro/button/dist/index';
import ItemCard from '@avtopro/item-card/dist/index';
// import ItemCardBlock from '@avtopro/item-card/src/ItemCardBlock';
import RobotPreloader from '@avtopro/preloader/dist/index';
import Placeholder from '@avtopro/placeholder/dist/index';
import PlaceholderRobot from '@avtopro/placeholder-robot/dist/index';
import { observer } from 'mobx-react-lite';
import { contextRoot } from '../../context/contextRoot';

function Cards() {
    const { cards, requestData, pending } = useContext(contextRoot);
    useEffect(() => {
        requestData();
    }, []);

    return (
        <section className="cards p-2 grid-modal">
            {pending ? (
                <div className="g-col-2 g-start-2">
                    <RobotPreloader title="loading" />
                </div>
            ) : (
                cards.cardsList.map((el) => (
                    <ItemCard
                        key={el.id}
                        title={
                            <div className="cards__item">
                                <h5 className="cards__title">
                                    Toyota {el.modelName}
                                </h5>
                                <span>{el.engine}</span>
                                <span>{el.mileage}</span>
                            </div>
                        }
                        controls={
                            <Button
                                onClick={() => {
                                    cards.deleteCard(el.id);
                                }}
                            >
                                delete
                            </Button>
                        }
                    >
                        {/* <ItemCardBlock> */}
                        <ul>
                            {el.parts.map((part) => (
                                <li key={part.code}>
                                    {`${part.name}-${part.code} (${part.partCount})`}
                                </li>
                            ))}
                        </ul>
                        {/* </ItemCardBlock> */}
                    </ItemCard>
                ))
            )}
            {!pending && !cards.cardsList[0] ? (
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
        </section>
    );
}

export default observer(Cards);
