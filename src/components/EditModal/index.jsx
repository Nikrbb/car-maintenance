import './edit-card.css';
import Button from '@avtopro/button/dist/index';
import NumberInput from '@avtopro/number-input/dist/index';
import ProModal from '@avtopro/modal/dist/index';
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Collapse from '@avtopro/collapse/dist/index';
import PropTypes from 'prop-types';
import { contextRoot } from '../../context/contextRoot';

function EditModal({ setModalVisibility, card }) {
    const { cards, edit } = useContext(contextRoot);

    useEffect(() => {
        edit.setCardData(card);
    }, []);

    return (
        <ProModal size="wider" onClose={() => setModalVisibility(false)}>
            <article className="edit">
                <div className="edit__header">
                    <div>
                        <h2 className="edit__title">Toyota</h2>
                        <h3 className="edit__car-model">
                            {edit.cardData.modelName} (
                            <span className="edit__car-engine">
                                {edit.cardData.engine}
                            </span>
                            <span className="edit__car-years">{`${new Date(
                                edit.cardData.dateStart
                            ).getFullYear()} - ${new Date(
                                edit.cardData.dateEnd
                            ).getFullYear()}`}</span>
                            )
                        </h3>
                    </div>

                    <div className="d-flex align-center gap-1">
                        <span>mileage</span>
                        <NumberInput
                            className="edit__mileage"
                            onChange={({ target: { value } }) =>
                                edit.changeMileage(value)
                            }
                            blockSize="sm"
                            value={edit.cardData.mileage}
                            defaultValue={edit.cardData.mileage}
                            step={1}
                            min={1}
                            max={1000000}
                        />
                        <span>km</span>
                    </div>
                </div>
                <ul className="edit__list">
                    {edit.cardData?.parts
                        ? edit.cardData.parts.map((part) => (
                              <li key={part.code} className="edit__list-item">
                                  <Collapse
                                      openWord="show"
                                      className="edit__name"
                                      maxLength="15"
                                  >
                                      {part.name}
                                  </Collapse>
                                  {/* <p className="edit__name">{part.name}</p> */}
                                  <p className="edit__code">{part.code}</p>
                                  <NumberInput
                                      onChange={({ target: { value } }) =>
                                          edit.changePartsAmount(
                                              value,
                                              part.code
                                          )
                                      }
                                      blockSize="sm"
                                      value={part.partCount}
                                      defaultValue={part.partCount}
                                      step={1}
                                      min={1}
                                      max={1000}
                                  />
                                  <Button
                                      disabled={edit.cardData.parts.length < 2}
                                      onClick={() => edit.deletePart(part.code)}
                                      className="edit__delete-btn"
                                      theme="youtube"
                                      blockSize="sm"
                                  />
                              </li>
                          ))
                        : null}
                </ul>
                <div className="d-flex justify-end gap-3 pt-2">
                    <Button
                        onClick={() => setModalVisibility(false)}
                        theme="white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            await cards.editCard(edit.cardData);
                            setModalVisibility(false);
                        }}
                        theme="blue"
                    >
                        Confirm
                    </Button>
                </div>
            </article>
        </ProModal>
    );
}
EditModal.propTypes = {
    setModalVisibility: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    card: PropTypes.object.isRequired
};
export default observer(EditModal);
