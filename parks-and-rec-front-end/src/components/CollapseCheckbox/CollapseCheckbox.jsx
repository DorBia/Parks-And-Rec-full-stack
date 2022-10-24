import { Button, Collapse } from "react-bootstrap";

const CollapseCheckbox = ({handleClick, setOpenFalse, setOpen, open, data, condition, text}) => {
  return (
    <div className="text-center my-3">
              <Button
                variant="outline-dark"
                onClick={() =>handleClick(setOpenFalse, setOpen, open, condition)}
                aria-controls="example-fade-text"
                aria-expanded={open}
              >
                {text}
              </Button>
              <Collapse in={open}>
                <div className="row my-3" id="example-fade-text">
                  {data}
                </div>
              </Collapse>
            </div>
  )
}

export default CollapseCheckbox