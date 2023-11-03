import { Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import ja from "@/shared/ja";
import CloseButton from "../closeButton";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { EventClickArg } from "@fullcalendar/core/index.js";
interface props{
    isOpened:boolean;
    setIsOpened:Dispatch<SetStateAction<boolean>>;
    isCreate:boolean;
    setArg:Dispatch<SetStateAction<DateClickArg|EventClickArg|undefined>>;
}
const ModalWindow = (props:props) => {
    const handleClose = () => {
        props.setIsOpened(false);
        props.setArg(undefined);
    };
    return (
        <Modal
            open={props.isOpened}
            onClose={handleClose}
        >
            <div
                style={{
                    width:"50%",
                    position:"absolute",
                    top:"50%",
                    left:"50%",
                    backgroundColor:"white",
                    transform: 'translate(-50%, -50%)',
                    height:"50vh",
                }}
            >
                <CloseButton
                    handleClose={handleClose}
                />
                <h2>{ja.calendar.modal.create.title}</h2>
            </div>
        </Modal>
    );
}

export default ModalWindow;