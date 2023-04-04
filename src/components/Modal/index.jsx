import './modal.css';
import Select, { Option } from '@avtopro/select/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';
import ProModal from '@avtopro/modal/dist/index';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { contextRoot } from '../../context/contextRoot';

function Modal({ setModalVisibility }) {
    const {
        pending,
        models,
        bodies,
        engines,
        configurations,
        groups,
        parts,
        cards,
        getModels,
        setModel,
        setBody,
        setEngineName,
        setConfigId,
        setPartsGroup
    } = useContext(contextRoot);
    const [selectedItem, selectItem] = useState(null);
    const [partsAmount, setPartsAmount] = useState(0);

    useEffect(() => {
        getModels();
    }, []);

    const createCard = async () => {
        await cards.addCard({
            modelName: models.choosenModel,
            dateStart: bodies.currentBody.dateStart,
            dateEnd: bodies.currentBody.dateEnd,
            engine: engines.choosenEngine,
            mileage: cards.mileage,
            parts: cards.choosenItems
        });
        setModalVisibility(false);
    };

    return (
        <ProModal onClose={() => setModalVisibility(false)}>
            <div className=" p-relative">
                <h2 className="mt-0">New List</h2>
                <hr className="underline" />
            </div>

            <form className="content-step p-relative grid-base">
                <Select // Model Select
                    className="g-col-6"
                    onChange={(_, value) => setModel(value[0])}
                    visibleOptionsCount={6}
                    placeholder="Мodel"
                >
                    {models.list.map((elem) => (
                        <Option key={elem} value={elem}>
                            {elem}
                        </Option>
                    ))}
                </Select>

                <Select // Body Select
                    className="g-col-6"
                    onChange={(_, value) => setBody(value[0])}
                    placeholder="Body"
                    visibleOptionsCount={6}
                >
                    {bodies.list.map((elem) => (
                        <Option key={elem.id} value={elem}>
                            {`${new Date(
                                elem.dateEnd
                            ).getFullYear()} - ${new Date(
                                elem.dateStart
                            ).getFullYear()}`}
                        </Option>
                    ))}
                </Select>

                <Select // Engine Select
                    className="g-col-6"
                    onChange={(_, value) => setEngineName(value[0])}
                    placeholder="Engine"
                    visibleOptionsCount={6}
                    disabled={pending}
                >
                    {engines.list.map((elem) => (
                        <Option key={elem.engineName} value={elem.engineName}>
                            {elem.engineName}
                        </Option>
                    ))}
                </Select>

                <Select // Config Select
                    className="g-col-6"
                    onChange={(_, value) => setConfigId(value[0])}
                    placeholder="Complectation"
                    visibleOptionsCount={6}
                    disabled={pending}
                >
                    {configurations.list.map((elem) => (
                        <Option key={elem.id} value={elem.id}>
                            {elem.code}
                        </Option>
                    ))}
                </Select>

                <TextInput
                    onChange={({ target: { value } }) =>
                        cards.setMileage(value)
                    }
                    className="g-col-6"
                    placeholder="Mileage"
                    type="number"
                />
                <hr className="underline" />
            </form>

            <form className="content-step p-relative grid-base">
                <Select // Parts Group Select
                    className="g-col-12"
                    onChange={(_, value) => setPartsGroup(value[0])}
                    placeholder="Parts group"
                    visibleOptionsCount={6}
                    disabled={pending}
                >
                    {groups.list.map((elem) => (
                        <Option key={elem.groupId} value={elem.groupId}>
                            {elem.partGroupName}
                        </Option>
                    ))}
                </Select>

                <Select // Part Select
                    onChange={(_, value) => selectItem(value[0])}
                    className="g-col-8"
                    searchable
                    visibleOptionsCount={4}
                >
                    {parts.list.map((elem) => (
                        <Option key={elem.id} value={elem}>
                            {elem.name}
                        </Option>
                    ))}
                </Select>

                <TextInput
                    onChange={({ target: { value } }) => setPartsAmount(value)}
                    type="number"
                    className="g-col-4"
                    placeholder="Amount"
                />

                <Button
                    onClick={() => cards.addItem(selectedItem, partsAmount)}
                    type="button"
                    theme="prime"
                    className="content-step p-relative g-col-2 g-start-11"
                >
                    +
                </Button>
            </form>

            <div className="content-step p-relative grid-base">
                <div className="items border g-col-12">
                    <ul className="items__list">
                        {cards.choosenItems.map((part) => (
                            <li className="items__elem">
                                <span>{`* ${part.name} - ${part.code} (${part.partCount})`}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="underline" />
            </div>
            <div className="d-flex justify-end gap-3 pt-2">
                <Button theme="white">Cancel</Button>
                <Button onClick={() => createCard()} theme="blue">
                    Create
                </Button>
            </div>
        </ProModal>
    );
}
Modal.propTypes = {
    setModalVisibility: PropTypes.func.isRequired
};
export default observer(Modal);
