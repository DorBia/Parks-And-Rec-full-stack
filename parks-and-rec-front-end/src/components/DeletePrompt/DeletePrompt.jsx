import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeletePrompt = ({handleClose, show, handleDelete, id, name}) => {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this {name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePrompt;