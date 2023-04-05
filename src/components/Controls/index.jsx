import { useState } from 'react';
import './controls.css';
import TextInput from '@avtopro/text-input/dist/index';
import FormFrame from '@avtopro/form-frame/dist/index';
import FormControl from '@avtopro/form-control/dist/index';
import Button from '@avtopro/button/dist/index';
import Slider from '@avtopro/slider/dist/index';
import Select from '@avtopro/select/dist/index';
import CreateModal from '../CreateModal';

export default function Header() {
    const [isVisibleFilter, setFilterVisibility] = useState(false);
    const [isVisibleModal, setModalVisibility] = useState(false);
    return (
        <div className="controls">
            <div className="d-flex">
                <FormFrame>
                    <FormControl>
                        <TextInput
                            id="pay-input-2"
                            name="description"
                            placeholder="Сумма оплаты"
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
                <div className="controls__selection d-flex align-center">
                    <Slider
                        className="controls__slider"
                        ariaLabel={['Lower', 'Upper']}
                        defaultValue={[0, 100]}
                    />
                    <Select />
                </div>
            ) : null}

            {isVisibleModal ? (
                <CreateModal setModalVisibility={setModalVisibility} />
            ) : null}
        </div>
    );
}
