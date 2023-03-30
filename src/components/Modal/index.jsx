import Select, { Option } from '@avtopro/select/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';
import ProModal from '@avtopro/modal/dist/index';
import { useContext, useEffect } from 'react';
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
        getModels,
        setModel,
        setBodyId,
        setEngineName,
        setConfigId,
        setPartsGroup
    } = useContext(contextRoot);

    useEffect(() => {
        getModels();
    }, []);

    return (
        <ProModal onClose={() => setModalVisibility(false)}>
            <div className=" p-relative">
                <h2 className="mt-0">New List</h2>
                <hr className="underline" />
            </div>

            <div className="content-step p-relative">
                <Select // Model Select
                    onChange={(_, value) => setModel(value[0])}
                    visibleOptionsCount={6}
                    placeholder="choose model"
                    disabled={pending}
                >
                    {models.list.map((elem) => (
                        <Option key={elem} value={elem}>
                            {elem}
                        </Option>
                    ))}
                </Select>

                <Select // Body Select
                    onChange={(_, value) => setBodyId(value[0])}
                    placeholder="choose body"
                    visibleOptionsCount={6}
                    disabled={pending}
                >
                    {bodies.list.map((elem) => (
                        <Option key={elem.id} value={elem.id}>
                            {`${new Date(
                                elem.dateEnd
                            ).getFullYear()} - ${new Date(
                                elem.dateStart
                            ).getFullYear()}`}
                        </Option>
                    ))}
                </Select>

                <Select // Engine Select
                    onChange={(_, value) => setEngineName(value[0])}
                    placeholder="choose engine"
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
                    onChange={(_, value) => setConfigId(value[0])}
                    placeholder="choose complectation"
                    visibleOptionsCount={6}
                    disabled={pending}
                >
                    {configurations.list.map((elem) => (
                        <Option key={elem.id} value={elem.id}>
                            {elem.code}
                        </Option>
                    ))}
                </Select>

                <TextInput placeholder="Mileage" type="number" />
                <hr className="underline" />
            </div>

            <div className="content-step p-relative">
                {/* <Select searchable>{[].map((elem) => elem.name)}</Select> */}
                <Select // Parts Group Select
                    onChange={(_, value) => setPartsGroup(value[0])}
                    placeholder="choose parts group"
                    visibleOptionsCount={6}
                    disabled={pending}
                >
                    {groups.list.map((elem) => (
                        <Option key={elem.groupId} value={elem.groupId}>
                            {elem.partGroupName}
                        </Option>
                    ))}
                </Select>
                <Select searchable>{[].map((elem) => elem.name)}</Select>
                <TextInput placeholder="Number" />
            </div>
            <div className="content-step p-relative">
                <Button className="content-step p-relative">+</Button>
                <div className="content-step border d-flex justify-center align-center">
                    List of added parts
                </div>
                <hr className="underline" />
            </div>
            <div className="d-flex justify-end gap-3 pt-2">
                <Button theme="white">Cancel</Button>
                <Button theme="blue">Create</Button>
            </div>
        </ProModal>
    );
}
Modal.propTypes = {
    setModalVisibility: PropTypes.func.isRequired
};
export default observer(Modal);
