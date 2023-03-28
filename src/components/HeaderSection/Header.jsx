import { useState } from 'react';
// import { useAxios } from 'use-axios-client';
import './header.css';
import TextInput from '@avtopro/text-input/dist/index';
import FormFrame from '@avtopro/form-frame/dist/index';
import FormControl from '@avtopro/form-control/dist/index';
import Button from '@avtopro/button/dist/index';
import Slider from '@avtopro/slider/dist/index';
import Select from '@avtopro/select/dist/index';
import Modal from '@avtopro/modal/dist/index';
import ModalContent from './ModalContent';

export default function Header() {
    const [isVisibleFilter, setFilterVisibility] = useState(false);
    const [isVisibleModal, setModalVisibility] = useState(false);
    // const { data, error, loading } = useAxios({
    //     url: 'https://service-api-stas.azurewebsites.net/Base/ModelNames'
    // });
    // console.log(data);
    // console.log(error);
    // console.log(loading);
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
                    <Button
                        onClick={() => setModalVisibility((prev) => !prev)}
                        theme="blue"
                    >
                        +
                    </Button>
                </FormFrame>
                <Button
                    onClick={() => setFilterVisibility((prev) => !prev)}
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

            {isVisibleModal ? (
                <Modal
                    onClose={() => {
                        setModalVisibility(!isVisibleModal);
                    }}
                >
                    <ModalContent />
                </Modal>
            ) : null}
        </div>
    );
}
