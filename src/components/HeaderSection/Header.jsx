import { useState } from 'react';
import './header.css';
import TextInput from '@avtopro/text-input/dist/index';
import FormFrame from '@avtopro/form-frame/dist/index';
import FormControl from '@avtopro/form-control/dist/index';
import Button from '@avtopro/button/dist/index';
import Slider from '@avtopro/slider/dist/index';
import Select from '@avtopro/select/dist/index';

export default function Header() {
    const [isVisibleFilter, setVisibility] = useState(false);
    return (
        <div className="header">
            <div className="d-flex">
                <FormFrame>
                    <FormControl>
                        <TextInput
                            id="pay-input-2"
                            name="description"
                            placeholder="Сумма оплаты"
                        />
                    </FormControl>
                    <Button theme="blue">+</Button>
                </FormFrame>
                <Button
                    onClick={() => setVisibility((prev) => !prev)}
                    className="header__filter"
                >
                    Filter
                </Button>
            </div>
            {isVisibleFilter ? (
                <div className="header__selection d-flex align-center">
                    <Slider
                        className="header__slider"
                        ariaLabel={['Lower', 'Upper']}
                        defaultValue={[0, 100]}
                    />
                    <Select />
                </div>
            ) : null}
        </div>
    );
}
