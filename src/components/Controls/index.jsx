import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import './controls.css';
import TextInput from '@avtopro/text-input/dist/index';
import FormFrame from '@avtopro/form-frame/dist/index';
import FormControl from '@avtopro/form-control/dist/index';
import Button from '@avtopro/button/dist/index';
import Slider from '@avtopro/slider/dist/index';
import Select, { Option } from '@avtopro/select/dist/index';
import CreateModal from '../CreateModal';
import { contextRoot } from '../../context/contextRoot';

function Controls() {
    const { cards, models, getModels } = useContext(contextRoot);
    const [isVisibleFilter, setFilterVisibility] = useState(false);
    const [isVisibleModal, setModalVisibility] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [initialRender, setInitRender] = useState(true);

    useEffect(() => {
        getModels();
    }, []);

    useEffect(() => {
        let timeout;
        if (!searchString) {
            cards.requestCards(true);
        } else {
            timeout = setTimeout(() => {
                cards.search(searchString);
            }, 500);
        }
        return () => clearTimeout(timeout);
    }, [searchString]);

    useEffect(() => {
        let timeout;
        if (initialRender) {
            setInitRender(false);
        } else {
            timeout = setTimeout(() => {
                cards.filterByMileage(cards.searchedMinMix);
            }, 500);
        }
        return () => clearTimeout(timeout);
    }, [cards.searchedMinMix]);

    return (
        <div className="controls">
            <div className="d-flex">
                <FormFrame>
                    <FormControl>
                        <TextInput
                            onChange={({ target: { value } }) => {
                                setSearchString(value);
                            }}
                            id="pay-input-2"
                            name="description"
                            placeholder="search"
                        />
                    </FormControl>
                    <Button
                        onClick={() => setModalVisibility((prev) => !prev)}
                        theme="blue"
                    >
                        +
                    </Button>
                </FormFrame>
                <Button
                    onClick={() => setFilterVisibility((prev) => !prev)}
                    className="controls__filter"
                >
                    Filter
                </Button>
            </div>

            {isVisibleFilter ? (
                <div className="controls__selection">
                    <div className="controls__slider">
                        <p className="d-flex justify-between">
                            <span>
                                {initialRender
                                    ? cards.minMaxValue[0]
                                    : cards.searchedMinMix[0]}
                            </span>
                            <span>{cards.searchedMinMix[1]}</span>
                        </p>
                        <Slider
                            onChange={(val) => {
                                cards.setSearchedRange(val);
                            }}
                            min={cards.minMaxValue[0]}
                            max={cards.minMaxValue[1]}
                            ariaLabel={['Lower', 'Upper']}
                            defaultValue={[
                                cards.minMaxValue[0],
                                cards.minMaxValue[1]
                            ]}
                        />
                    </div>
                    <Select
                        onChange={(_, value) => setSearchString(value[0])}
                        placeholder="model"
                        visibleOptionsCount={6}
                    >
                        {models.list.map((elem) => (
                            <Option key={elem} value={elem}>
                                {elem}
                            </Option>
                        ))}
                    </Select>
                </div>
            ) : null}

            {isVisibleModal ? (
                <CreateModal setModalVisibility={setModalVisibility} />
            ) : null}
        </div>
    );
}

export default observer(Controls);
