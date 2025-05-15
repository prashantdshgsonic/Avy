import ModalWindow from "../widgets/modalWindow/ModalWindow";


export const renderModalWindow = (element, openModal, handleCloseModal) => {
    const isModalOpen = openModal;
    return (
        <div>
          <ModalWindow title={""} isOpen={isModalOpen} onClose={handleCloseModal}>
            {element}
          </ModalWindow>
        </div>
      );
  };