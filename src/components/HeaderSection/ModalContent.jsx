import Select from '@avtopro/select/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';
import './header.css';

export default function ModalContent() {
    return (
        <>
            <div className=" p-relative">
                <h2 className="mt-0">New List</h2>
                <hr className="underline" />
            </div>
            <div className="content-step p-relative">
                <Select />
                <Select />
                <TextInput placeholder="Mileage" type="number" />
                <hr className="underline" />
            </div>
            <div className="content-step p-relative">
                <Select />
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
        </>
    );
}
