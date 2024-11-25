import * as S from "../styles/modal.styles.js";
import useCartStore from "../store/cartStore.js";
import useModalStore from "../store/modalStore.js";

const ModalButton = () => {
  const { clearItem } = useCartStore();
  const { closeModal } = useModalStore();

  return (
    <>
      <S.ConfirmButton
        onClick={() => {
          clearItem();
          closeModal();
        }}
      >
        네
      </S.ConfirmButton>
      <S.CancelButton
        onClick={() => {
          closeModal();
        }}
      >
        아니요
      </S.CancelButton>
    </>
  );
};

export default ModalButton;
