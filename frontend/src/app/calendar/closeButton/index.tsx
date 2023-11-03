import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
interface props{
    handleClose:()=>void
}
const CloseButton = (props:props) => {
    return (
        <div
            style={{
                textAlign:"end",
                margin:"5px",
            }}
        >
            <IconButton
                aria-label="close"
                onClick={props.handleClose}
            >
                <CloseIcon/>
            </IconButton>
        </div>
    );
}

export default CloseButton;